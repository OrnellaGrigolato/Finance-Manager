import { prisma } from "@/libs/prisma";
import {  NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function GET (){
    try {
        const result = await prisma.users.findMany({
            select:{
                dni:true,
                username:true,
                password:false,
                lastmove_amount:true,
                lastmove_date:true,
                login_date:true,
                email:true,
                available_money:true
            }
        });

        return NextResponse.json({result})
    } catch (error:any) {
        return NextResponse.json({ error: error.message},{status:500})
    }
}

/* export async function POST (request:any){
    try {
        const {dni,username,email,password,lastmove_amount,lastmove_date,login_date,available_money} = await request.json();

        const hash = await bcrypt.hash(password, 10);
         //* codificamos la contraseña antes de cargarla en la db y luego al momento de crear el usuario le asignamos dicha contraseña ya hasheada
        

        if(!username || !dni || !email || !password){
            return NextResponse.json({
                message:"missing fields"
            })
        }

        const result = await prisma.users.create({
            data:{
                dni:dni,
                username:username,
                password:hash,
                email:email,
                lastmove_amount:lastmove_amount || 0,
                lastmove_date:lastmove_date || null,
                login_date:login_date || Date.now(),
                available_money: available_money || 0
            }
        })
        const token = sign(result, 'SECRETO', { expiresIn: '1h' }); 
        //* Generamos el token y luego lo enviamos como respuesta
     
        //* console.log(token);
        return NextResponse.json(token);

        /* return NextResponse.json({
            result,
            status:201
        }) */
    /*} catch (error) {
        return NextResponse.json({ 
            error: error,
            status:500
        })
    }
} */