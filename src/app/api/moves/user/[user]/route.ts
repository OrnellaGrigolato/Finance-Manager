
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {
  params :{ user :string}
}) {
  try {
    const  user_id  =  Number(params.user) ;
    const finder = await prisma.moves.findMany({
        where: { user_id:  user_id}
    });
    if (finder) {
        return NextResponse.json({ finder, message: "success" });
      } else {
        return Response.json({ message: "no move found" }, { status: 404 });
      }
    } catch (err) {
        const error = err as {message:string}
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
}