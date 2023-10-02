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
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request:any) {
    try {
        const { id_currency, name} = await request.json();
    } catch (error:any) {
        
    }
}