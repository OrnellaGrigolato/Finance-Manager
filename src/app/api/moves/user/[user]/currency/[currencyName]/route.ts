import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { user: string; currencyid: string };
  }
) {
  try {
    const movimientos = await prisma.moves.findMany({
      where: {
        user_id: parseInt(params.user),
        currency: {
          id_currency: parseInt(params.currencyid),
        },
      },
    });

    return Response.json(movimientos);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Something wrong" }, { status: 404 });
  }
}
