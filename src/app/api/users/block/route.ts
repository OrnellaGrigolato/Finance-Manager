import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    if (req.method === 'POST') {

        try {

            const { email } = await req.json();

            await prisma.users.updateMany({
                where: {
                    email: email,
                },
                data: {
                    isBlocked: true,
                },
            });
           
            return NextResponse.json({ message: "Success blocking email account" }, { status: 200 })

        } catch (error) {

            console.error(error);
            return NextResponse.json({ error: 'Error blocking user by email' }, { status: 500 });

        }

    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 403 });
    }
}