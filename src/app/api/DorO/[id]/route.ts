import { Params } from "@/app/types/type";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: Params) {
  try {
    const id = Number(params.id);

    if (!id || id == undefined || id == null) {
      return NextResponse.json({ message: "no id found" }, { status: 400 });
    }
    const result = await prisma.destinyOrOrigin.findUnique({
      where: {
        id_DorO: id,
      },
    });
    if (result) {
      return NextResponse.json({ result, message: "success" });
    } else {
      return NextResponse.json(
        { message: "no Destination or Origin found" },
        { status: 404 }
      );
    }
  } catch (error) {
    const err = error as { message: string };
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
