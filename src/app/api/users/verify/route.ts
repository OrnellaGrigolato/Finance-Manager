import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";
import { sendEmail_profile } from '@/components/emailSender';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const url = req.url || '';
    const token = url.split('=')[1];
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

    if (req.method === 'GET') {
        if (!token) {
            return NextResponse.json(
                { message: "missing fields" },
                { status: 400 })
        }

        let userId;

        try {
            const decoded = verify(token as string, process.env.AUTH_SECRET as string) as { id: string };
            userId = decoded.id;
            console.log(userId)
        } catch (error) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
        }

        let retries = 0;
        const maxRetries = 5;

        for (let i = 0; i < maxRetries; i++) {
            try {
                await prisma.users.update({
                    where: { id: Number(userId) },
                    data: { emailVerified: true },
                });

                return NextResponse.redirect(`${baseUrl}/validate`)
            } catch (error) {
                console.log(error)
                retries++;
                if (retries === maxRetries) {
                    return NextResponse.json({ error: 'Error verifying email' }, { status: 500 });
                }
            }
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 403 });
    }
}

export async function POST(req: Request) {
    if (req.method === 'POST') {

        try {

            const { username, email, token } = await req.json();
            await sendEmail_profile(username, email, token);
            return NextResponse.json({ message: "Success" }, { status: 200 })

        } catch (error) {

            console.error(error);
            return NextResponse.json({ error: 'Error sending email' }, { status: 500 });

        }

    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 403 });
    }
}