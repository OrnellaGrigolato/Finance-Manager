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

        try {
            await prisma.users.update({
                where: { id: Number(userId) },
                data: { emailVerified: true },
            });

            return NextResponse.redirect(`${baseUrl}/validate`)


        } catch (error) {
            return NextResponse.json({ error: 'Error verifying email' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 403 });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        
        try {

            const { username, email, token } = req.body;
          console.log(req)
            console.log(req.body)
            console.log("El reqbody es: ", username, email, token) 

           // await sendEmail_profile(username, email, token);

            return NextResponse.json({ message: "Success" }, { status: 200 })
        } catch (error) {
           console.error(error);
            return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
        }


    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 403 });
    }
}