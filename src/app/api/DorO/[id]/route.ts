import { Params } from "@/app/types/type";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET({params}:Params){
    try {
        console.log(params.id)
        const id = Number(params.id);

    if(!id || id == undefined || id == null){
            return NextResponse.json({message:"no id found"},{status:400})
    }
    const result = await prisma.destinyOrOrigin.findUnique({where:{
        id_DorO: id,
    }})
    if(result){
        return NextResponse.json({result,message:"success"});
    }else{
        return NextResponse.json({message:"no Destination or Origin found"},{status:404})
    }

    } catch (error) {
        const err = error as {message:string}
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
    
}

export async function DELETE({params}:Params) {
    try {
        const id = Number(params.id);

        const deleted = await prisma.destinyOrOrigin.delete({
            where:{
                id_DorO:id
            }});

        if(deleted){
            return NextResponse.json({deleted,message:"Destination or Origin succesfully deleted"})
        }else{
            return NextResponse.json({message:"no Destination or Origin found"},{status:404})
        }
    } catch (err) {
        const error = err as {message:string}
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function PUT(request:Request ,{params}:Params) {
    try {
        const id = Number(params.id);
        const {name} = await request.json();
        const updated = await prisma.destinyOrOrigin.update({
            where:{
                id_DorO:id
            },
            data:{
                name
            }});
        if (updated) {
            return NextResponse.json({updated,message:"Destination or Origin succesfully updated"}); 
        } else {
            return NextResponse.json({message:"no Destination or Origin found"},{status:404})
        }
    } catch (err) {
        const error = err as {message:string}
        return NextResponse.json({ message: error.message }, { status: 500 }); 
    }
}