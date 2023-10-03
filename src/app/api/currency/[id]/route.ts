import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET (request:any ,{params}:any) {
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
export async function DELETE(request:any ,{params}:any) {
    try {
        const id = Number(params.id);

        const deleted = await prisma.currency.delete({where:{id_currency:id}});

        if(deleted){
            return NextResponse.json({deleted,message:"currency succesfully deleted"})
        }else{
            return NextResponse.json({message:"no currency found"},{status:404})
        }
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function PUT(request:any ,{params}:any) {
    try {
        const id = Number(params.id);
        const {name} = request.json();
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
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 }); 
    }
}