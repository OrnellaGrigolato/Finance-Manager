import { prisma } from "@/libs/prisma";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_APIKEY;
export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get("page"));
    const user_id = Number(request.nextUrl.searchParams.get("user_id"));

    if ((page && !user_id) || (!page && user_id)) {
      return NextResponse.json({ message: `Mising Fields` }, { status: 400 });
    }

    if (page && user_id) {
      const perPage = 5;
      const offset = (Number(page) - 1) * Number(perPage);

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
      if (!result || result.length === 0) {
        return NextResponse.json(
          { message: "not moves founds" },
          { status: 404 }
        );
      } else {
        const totalMovesByUser = await prisma.moves.count({
          where: { user_id: user_id },
        });
        return NextResponse.json({
          result,
          total: totalMovesByUser,
          message: "moves found",
        });
      }
    } else {
      const result = await prisma.moves.findMany({
        orderBy: {
          movement_date: "desc",
        },
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
      DorO_id,
    } = await request.json();

    //* Obtenemos el usuario existente
    const existingUser = await prisma.users.findUnique({
      where: {
        id: user_id,
      },
    });

    const baseCurrency = await prisma.currency.findUnique({
      where: {
        id_currency: currency_id,
      },
    });

    if (existingUser) {
      if (
        (!title || !description || !user_id || !currency_id) &&
        (!discount_amount || !income_amount)
      ) {
        return NextResponse.json({ message: "Mising Fields" }, { status: 400 });
      } else {
        //* Validamos que el dinero que va a descontar no sea mayor al que poseemos
        const convertion = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency?.name}/ARS`
        );
        //console.log(convertion);

        if (
          discount_amount &&
          (discount_amount != 0 || discount_amount != undefined) &&
          Number(existingUser.available_money) < Number(discount_amount)
        ) {
          return NextResponse.json(
            {
              message:
                "You are trying to perform an invalid operation: your available money is less than what you are trying to withdraw.",
            },
            { status: 400 }
          );
        }
        //* Validamos que el dinero que va a descontar no sea mayor al valor maximo expecificado
        if (
          discount_amount &&
          (discount_amount != 0 || discount_amount != undefined) &&
          Number(existingUser.maxExpenditure) < Number(discount_amount)
        ) {
          return NextResponse.json(
            {
              message:
                "You are trying to perform an invalid operation: you cannot exceed your defined maximum spend. If you wish, you can change it in the configuration section.",
            },
            { status: 400 }
          );
        }

        //* Actualizamos los valores del usuario que realizo el movimiento

        const updatedAvailableMoney =
          Number(income_amount) !== 0 && income_amount !== undefined
            ? Number(existingUser.available_money) +
              Number(income_amount) * convertion.data.conversion_rate
            : Number(existingUser.available_money) -
              Number(discount_amount) * convertion.data.conversion_rate;

        const updatedLastMoveAmount =
          Number(income_amount) !== 0 && income_amount !== undefined
            ? Number(income_amount * convertion.data.conversion_rate)
            : Number(discount_amount * convertion.data.conversion_ratet);

        const updatedLastMoveDate = movement_date;

        if (Number.isNaN(updatedAvailableMoney)) {
          return NextResponse.json(
            { message: "available Money is Nan or Undefined" },
            { status: 400 }
          );
        }

        //* Actualizamos los valores en la base de datos
        await prisma.users.update({
          where: {
            id: user_id,
          },
          data: {
            available_money: updatedAvailableMoney,
            lastmove_amount: updatedLastMoveAmount,
            lastmove_date:
              updatedLastMoveDate /* !== undefined ? updatedLastMoveDate: Date.now() */,
          },
        });
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
            DorO_id,
          },
        });

        return NextResponse.json(
          { result, message: "Moves succesfully created" },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json({ message: "User Not Found" }, { status: 400 });
    }
  } catch (err) {
    const error = err as { message: string };
    return NextResponse.json({ error: `${error.message}` }, { status: 500 });
  }
}
