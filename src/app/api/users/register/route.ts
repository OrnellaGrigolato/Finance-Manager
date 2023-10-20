import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { cookies } from "next/headers";
import { sendEmail } from "@/components/emailSender";


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

            await sendEmail(username, email, token);

            return NextResponse.json({ result, token }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

} catch (err) {
    const error = err as { message: string }
    return NextResponse.json({
        error: error.message,
        status: 500
    })
}
}