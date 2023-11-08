
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const name = params.name;

    const result = await prisma.currency.findUnique({
      where: { name: name },
      select: {
        id_currency: true,
      },
    });
    if (result) {
      return NextResponse.json({ result, message: "success" });
    } else {
      return NextResponse.json(
        { message: "no currency found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
