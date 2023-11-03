import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const finder = await prisma.destinyOrOrigin.findMany();

        if(!finder || finder.length == 0){
            return NextResponse.json({message: "No Destination or Origin found"},{status:404})
        }else{
            return NextResponse.json({data: finder},{status:200})
        }
    } catch (error) {
        const err = error as {message: string}
        return NextResponse.json({message: err.message},{status:400})
    }
}

export async function POST(req: NextRequest){
    try {
        const {name,id_DorO} = await req.json();

        if(!name){
            return NextResponse.json({message: "missing fields"},{status:400})
        }else{
            const created = await prisma.destinyOrOrigin.create({
                data:{
                    name
                }
            });

            if (!created){
                return NextResponse.json({message: "fail attempting to created resource"},{status:400})
            }else{
                return NextResponse.json({data: created},{status:200})
            }
        }
        
    } catch (error) {
        const err = error as {message: string}
        return NextResponse.json({message: err.message},{status:400})
    }
}