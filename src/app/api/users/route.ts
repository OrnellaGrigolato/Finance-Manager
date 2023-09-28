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
    } catch (error) {
        return NextResponse.json({ error: error})
    }
}

/* export async function PUT (){
    try {
        const data 
    } catch (error) {
        
    }
} */