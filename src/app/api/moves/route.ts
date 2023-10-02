import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.moves.findMany();

    if (!result) {
      return NextResponse.json(
        { message: "not moves founds" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({ result, message: "moves found" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: any) {
  try {
    const {
      id_moves,
      description,
      discount_amount,
      income_amount,
      movement_date,
      user_dni,
      title,
      currency_id,
    } = await request.json();

    if (
      (!title || !description || !user_dni || !currency_id) &&
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
          user_dni,
        },
      });

      //* Obtenemos el usuario existente
      const existingUser = await prisma.users.findUnique({
        where: {
          dni: user_dni,
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
            dni: user_dni,
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
