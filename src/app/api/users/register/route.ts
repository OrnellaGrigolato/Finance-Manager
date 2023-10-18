import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Resend } from 'resend';
import { cookies } from "next/headers";

import nodemailer from "nodemailer";

const email_finance = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email_finance,
        pass,
    },
});

const generateEmailContent = (username: string, password: string) => {
    const message = `
        Hi ${username},
        You just signed up to Finance Manager:
        Your user name is: ${username},
        Your password is: ${password} in case you forget!

        We’re excited to have you on board and we’d love to say thank you on behalf of our team for choosing us to help you register your finances.
    `;

    return {
        from: email_finance,
        to: email_finance,
        subject: `Welcome to Finance Manager, ${username}`,
        text: message,
    };
};


export async function POST(request: Request) {
    try {

        const { username, email, password } = await request.json();

        const hash = await bcrypt.hash(password, 10);
        //* codificamos la contraseña antes de cargarla en la db y luego al momento de crear el usuario le asignamos dicha contraseña ya hasheada


        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "missing fields" },
                { status: 400 })
        }

        const sameUserName = await prisma.users.findUnique({ where: { username: username } })

        const sameEmail = await prisma.users.findUnique({ where: { email: email } });

        if (sameUserName) {
            return NextResponse.json({ message: "Inavalid username, this username has already been used" }, { status: 400 })
        }
        if (sameEmail) {
            return NextResponse.json({ message: "Inavalid email, this email has already been used" }, { status: 400 })
        }

        const result = await prisma.users.create({
            data: {
                username: username,
                password: hash,
                email: email
            }
        })
        const token = sign(result, `${process.env.AUTH_SECRET}`, { expiresIn: '1h' });
        //* Generamos el token y luego lo enviamos como respuesta
        cookies().set("token", token);
        /* console.log(token); */


        try {
            console.log(email_finance, pass)
            await transporter.sendMail(generateEmailContent(username, password));

        return NextResponse.json({ result, token }, { status: 201 });
         } catch (error) {
            console.error(error);
            return NextResponse.json({ message:"Error envio correo", error }, { status: 400 });
        }

} catch (err) {
    const error = err as { message: string }
    return NextResponse.json({
        error: error.message,
        status: 500
    })
}
}