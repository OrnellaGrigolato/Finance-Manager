import { prisma } from "@/libs/prisma";
import {  NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Resend } from 'resend';

export async function POST (request:Request){
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const {username,email,password} = await request.json();
        
        const hash = await bcrypt.hash(password, 10);
         //* codificamos la contraseña antes de cargarla en la db y luego al momento de crear el usuario le asignamos dicha contraseña ya hasheada
        

        if(!username  || !email || !password){
            return NextResponse.json({
                message:"missing fields"
            })
        }

        const result = await prisma.users.create({
            data:{
                username:username,
                password:hash,
                email:email
            }
        })
        const token = sign(result, 'SECRETO', { expiresIn: '1h' }); 
        //* Generamos el token y luego lo enviamos como respuesta
     
        /* console.log(token); */
        try {
            const data = await resend.emails.send({
              from: 'Acme <onboarding@resend.dev>',
              to: [`${email}`],
              subject: 'Hello world',
              html: `<h3>Hello ${username ? username : email}!</h3>`,
            });
        
            return NextResponse.json({data,result,token},{status:201});
          } catch (error) {
            return NextResponse.json({ error });
          }
        return NextResponse.json({result,token},{status:201});

        /* return NextResponse.json({
            result,
            status:201
        }) */
    } catch (err) {
        const error = err as {message: string}
        return NextResponse.json({ 
            error: error.message,
            status:500
        })
    }
}