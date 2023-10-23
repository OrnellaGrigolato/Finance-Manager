import { sign, verify } from 'jsonwebtoken';
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { sendEmail_reset_password } from '@/app/api/emailSender';


export async function PUT(req: Request, res: Response) {

    const { cpassword } = await req.json();
    const authHeader = req.headers.get('authorization');

    const token = authHeader && authHeader.split(' ')[1];


    if (req.method === 'PUT') {

        try {

            const hash = await bcrypt.hash(cpassword, 10);

            if (!token || !cpassword) {
                return NextResponse.json(
                    { message: "missing fields" },
                    { status: 400 })
            }

            let userId;

            try {
                const decoded = verify(token as string, process.env.AUTH_SECRET as string) as { id: string };
                userId = Number(decoded.id);
            } catch (error) {
                return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
            }

            await prisma.users.updateMany({
                where: {
                    id: userId,
                },
                data: {
                    isBlocked: false,
                    password: hash
                },
            });

            return NextResponse.json({ message: "Success unlocking user and changing password" }, { status: 200 })

        } catch (error) {

            console.error(error);
            return NextResponse.json({ error: 'Error unlocking user and changing password' }, { status: 500 });

        }

    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 403 });
    }
}


export async function POST(request: Request, response: Response) {
    try {
        const { email } = await request.json();

        const userFind = await prisma.users.findUnique({ where: { email: email } })

        if (!userFind) {
            return NextResponse.json({
                error: "User not found",
                status: 404
            });
        }

        const token = sign({ id: userFind.id }, `${process.env.AUTH_SECRET}`, { expiresIn: "1h" });

        sendEmail_reset_password(userFind?.username, email, token)

        return NextResponse.json({ message: "Success sending email to change password" }, { status: 200 })

    } catch (err) {
        const error = err as { message: string }
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}