import { useApiData } from "@/app/providers/Providers";
import { prisma } from "@/libs/prisma";
import getUserDataFromToken from "@/utils/authUtils";
import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    {
        params,
    }: {
        params: { paginacion: string };
    }
) {
    try {
        const token :any = cookies().get('token')
        console.log(token);
        const decoded = jwtDecode(token)
        console.log(decoded);
        const user_id = 32
        /* const { user_id } = await request.json() */
        const page = Number(params.paginacion);
        const perPage = 5;
        const offset = (Number(page) - 1) * Number(perPage);
        console.log(page,user_id)
        
        if (!user_id) {
            return NextResponse.json({ message: `Mising Fields` }, { status: 400 });
        } else {
            /* const page = Number(params.paginacion);
            const perPage = 10;
            const offset = (Number(page) - 1) * Number(perPage); */

            const result = await prisma.moves.findMany({
                where: {
                    user_id: user_id,
                },
                orderBy: {
                    movement_date: "desc",
                },
                skip: offset,
                take: perPage,
            });

            if (!result) {
                return NextResponse.json(
                    { message: "not moves founds" },
                    { status: 404 }
                );
            } else {
                return NextResponse.json({ result, message: "moves found" });
            }
        }
    } catch (err) {
        const error = err as { message: string };
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
