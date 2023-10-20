import { prisma } from "@/libs/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

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
      console.log(page, user_id);

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
        return NextResponse.json({ result, message: "moves found" });
      }
    } else {
      console.log("ENTRO ACA");
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
    } = await request.json();

    //* Obtenemos el usuario existente
    const existingUser = await prisma.users.findUnique({
      where: {
        id: user_id,
      },
    });

    if (existingUser) {
      console.log(existingUser)
      if (
        (!title || !description || !user_id || !currency_id) &&
        (!discount_amount || !income_amount)
      ) {
        return NextResponse.json({ message: "Mising Fields" }, { status: 400 });
      } else {
        //* Validamos que el dinero que va a descontar no sea mayor al que poseemos
        if (discount_amount && (discount_amount!= 0 || discount_amount != undefined) && (Number(existingUser.available_money) < Number(discount_amount))) {
          return NextResponse.json(
            {
              message:
                "You are trying to commit an invalid opartion: your available money is minor than your discount",
            },
            { status: 400 }
          );
        }
        //* Validamos que el dinero que va a descontar no sea mayor al valor maximo expecificado
        if (discount_amount && (discount_amount!= 0 || discount_amount != undefined) && (Number(existingUser.maxExpenditure) < Number(discount_amount))) {
          return NextResponse.json(
            {
              message:
                "You are trying to commit an invalid opartion: you cannot superpass your maximun Expendideture",
            },
            { status: 400 }
          );
        }

        //* Actualizamos los valores del usuario que realizo el movimiento
        console.log(`income_amount: ${income_amount}, available_money: ${existingUser.available_money}, discount: ${discount_amount}`)
        const updatedAvailableMoney =
          Number(income_amount) !== 0 && income_amount !== undefined
            ? Number(existingUser.available_money) + Number(income_amount)
            : Number(existingUser.available_money) - Number(discount_amount);

        const updatedLastMoveAmount =
        Number(income_amount) !== 0 && income_amount !== undefined
            ? Number(income_amount)
            : Number(discount_amount);
            
        const updatedLastMoveDate = movement_date


        if(Number.isNaN(updatedAvailableMoney)){
          return NextResponse.json({ message: "available Money is Nan or Undefined" }, { status: 400 });
        }

        //* Actualizamos los valores en la base de datos
        await prisma.users.update({
          where: {
            id: user_id,
          },
          data: {
            available_money: updatedAvailableMoney,
            lastmove_amount: updatedLastMoveAmount,
            lastmove_date: updatedLastMoveDate /* !== undefined ? updatedLastMoveDate: Date.now() */,
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

    /* if (
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

      return NextResponse.json(
        { result, message: "Moves succesfully created" },
        { status: 201 }
      );
    } */