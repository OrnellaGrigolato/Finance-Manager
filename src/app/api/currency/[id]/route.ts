import { Params } from "@/app/types/type";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET (request:Request ,{params}:Params) {
    try {
        const id = Number(params.id);

        const result = await prisma.currency.findUnique({where: {id_currency: id}})
        if(result){
            return NextResponse.json({result,message:"success"});
        }else{
            return NextResponse.json({message:"no currency found"},{status:404})
        }
    } catch (error:any ){
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function DELETE(request:Request ,{params}:Params) {
    try {
        const id = Number(params.id);

        const deleted = await prisma.currency.delete({where:{id_currency:id}});

        if(deleted){
            return NextResponse.json({deleted,message:"currency succesfully deleted"})
        }else{
            return NextResponse.json({message:"no currency found"},{status:404})
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
        const updated = await prisma.currency.update({
            where:{id_currency:id},
            data:{
                name
            }});
        if (updated) {
            return NextResponse.json({updated,message:"currency succesfully updated"}); 
        } else {
            return NextResponse.json({message:"no currency found"},{status:404})
        }
    } catch (err) {
        const error = err as {message:string}
        return NextResponse.json({ message: error.message }, { status: 500 }); 
    }
}