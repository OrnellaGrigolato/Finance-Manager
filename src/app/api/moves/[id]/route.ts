import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  try {
    const  id  = await params.id ;

    const paramater = Number(id);
    /* console.log(paramater); */
    
    const finder = await prisma.moves.findUnique({
        where: { id_moves: paramater}
    });
    if (finder) {
        return NextResponse.json({ finder, message: "success" });
      } else {
        return Response.json({ message: "no move found" }, { status: 404 });
      }
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: any, { params }: any) {
    try {
        const id = Number(params.id);

        const deleted = await prisma.moves.delete({
            where: {id_moves: id}
        });

        if(deleted) {
            return NextResponse.json({deleted,message:"move successfully deleted"})
        }else{
            return NextResponse.json({message:"no move found"},{status:404})
        }

    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT (request: any, { params }: any) {
    try {
        const id =  Number(params.id);
        const { currency_id, title, description, } = await request.json();

        if(!currency_id && !title && !description){
            return Response.json({ message: "missing fields" }, { status: 400 });
        }else{
            const updated = await prisma.moves.update({
                where:{id_moves:id},
                data:{
                    currency_id,
                    title,
                    description
            }});
            if(updated){
                return NextResponse.json({updated,message: "move updated successfully"})
            }else{
                return NextResponse.json({message:"failed to update move"},{status:404})
            }
        }      
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
