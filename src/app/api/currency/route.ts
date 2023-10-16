import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const result = await prisma.currency.findMany();

        if(result && result.length > 0) {
            return NextResponse.json({result,message:"success"});
        }else{
            return NextResponse.json({message:"currency not found"},{status:404});
        }
    } catch (err) {
        const error = err as { message: string };
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request:Request) {
    try {
        const { id_currency, name} = await request.json();
        const created = await prisma.currency.create({
            data:{
                name: name,
            }
        })

        if (created) {
            return NextResponse.json({created,message:"success"});
        }else{
            return NextResponse.json({message:"error while attempting to create currency"},{status:400});
        }
    } catch (err) {
        const error = err as { message: string };
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}