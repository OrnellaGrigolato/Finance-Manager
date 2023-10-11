import { prisma } from "@/libs/prisma";
import {  NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { cookies} from "next/headers"
 
export async function POST (request:Request){
    try {
        const {username,email,password} = await request.json();

        const hash = await bcrypt.hash(password, 10);
         //* codificamos la contraseña antes de cargarla en la db y luego al momento de crear el usuario le asignamos dicha contraseña ya hasheada
        

        if(!username  || !email || !password){
            return NextResponse.json({
                message:"missing fields"
            },{status: 400})
        }

        const result = await prisma.users.create({
            data:{
                username:username,
                password:hash,
                email:email
            }
        })
        const token = sign(result,`${process.env.AUTH_SECRE}`, { expiresIn: '1h' }); 
        //* Generamos el token y luego lo enviamos como respuesta
        cookies().set("token", token);
     
        /* console.log(token); */
        return NextResponse.json({result,token},{status:201});

        /* return NextResponse.json({
            result,
            status:201
        }) */
    } catch (err) {
        const error = err as {message: string}
        return NextResponse.json({ 
            error: error.message,
            status:400
        })
    }
}