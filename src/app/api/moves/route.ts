import { prisma } from "@/libs/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

/* export async function GET(req:Request,{queryParams}:queryParams) {
  try {
    // Parámetros de paginación
    const { page = 1, perPage = 10 } = queryParams.page; 
    const offset = (page - 1) * perPage;

    const result = await prisma.moves.findMany({
      orderBy: {
        movement_date: 'desc'
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
  } catch (err) {
    const error = err as {message: string}
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} */
export async function GET(req:NextApiRequest) {
  try {
    console.log(req.query); // Agregar esta línea para depurar 
    const { page ,perPage } = req.query;
    const offset = (Number(page) - 1) * Number(perPage);

    const result = await prisma.moves.findMany({
      orderBy: {
        movement_date: 'desc'
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
  } catch (err) {
    const error = err as {message: string}
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      id_moves,
      description,
      discount_amount,
      income_amount,
      movement_date,
      user_id,
      title,
      currency_id,
    } = await request.json();

    if (
      (!title || !description || !user_id || !currency_id) &&
      (!discount_amount || !income_amount)
    ) {
      return NextResponse.json({ message: "Mising Fields" }, { status: 400 });
    } else {

       //* Creamos el movimiento
      const result = await prisma.moves.create({
        data: {
          id_moves,
          title,
          description,
          currency_id,
          discount_amount,
          income_amount,
          movement_date,
          user_id,
        },
      });

      //* Obtenemos el usuario existente
      const existingUser = await prisma.users.findUnique({
        where: {
          id: user_id,
        },
      });

      if (existingUser) {
        //* Actualizamos los valores del usuario que realizo el movimiento
        const updatedAvailableMoney = Number(income_amount) !== 0? (Number(existingUser.available_money) + Number(income_amount)) : (Number(existingUser.available_money) - Number(discount_amount));
        const updatedLastMoveAmount = Number(income_amount) !== 0? Number(income_amount):  Number(discount_amount);
        const updatedLastMoveDate = movement_date;

        //* Actualizamos los valores en la base de datos
        await prisma.users.update({
          where: {
            id: user_id,
          },
          data: {
            available_money: updatedAvailableMoney,
            lastmove_amount: updatedLastMoveAmount,
            lastmove_date: updatedLastMoveDate
          },
        });
      }
      return NextResponse.json({result, message: "Moves succesfully created" }, { status: 201 });
    }
  } catch (err) {
    const error = err as {message: string}
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
