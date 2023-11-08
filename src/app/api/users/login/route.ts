import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request, response: Response) {
  try {
    const { email, password } = await request.json();

    const userFind = await prisma.users.findUnique({ where: { email: email } });

    if (!userFind) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404, // Not Found
        }
      );
    }

    if (userFind!.isBlocked) {
      return NextResponse.json(
        {
          message: "User is blocked",
        },
        {
          status: 403, // Forbidden
        }
      );
    }

    const comparator = await bcrypt.compare(password, userFind!.password);

    if (!userFind || !comparator) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        {
          status: 401,
        }
      );
    }

    //* confirmamos si el usuario que estamos buscando, en su propiedad password.decoficada coincide con la enviada

    const token = sign({ id: userFind.id }, `${process.env.AUTH_SECRET}`, {
      expiresIn: "1h",
    });
    cookies().set("token", token);
    //* lo retornamos
    return NextResponse.json(
      {
        message: "Login successful",
        token: token,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    const error = err as { message: string };
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
