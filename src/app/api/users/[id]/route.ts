import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Params } from "@/app/types/type";

export async function GET(request: Request, { params }: Params) {
  //console.log(params.dni);
  const parameter = Number(params.id);
  try {
    const finder = await prisma.users.findUnique({
      where: {
        id: parameter,
      },
    });
    if (finder) {
      return NextResponse.json({ finder, message: "success" });
    } else {
      return Response.json({ message: "no user found" }, { status: 404 });
    }
  } catch (err) {
    const error = err as {message:string}
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const parameter = Number(params.id);
  try {
    const finder = await prisma.users.delete({
      where: {
        id: parameter,
      },
    });
    if (finder) {
      return NextResponse.json({
        message: `user:${parameter} succesfully deleted`,
        finder,
      });
    } else {
      return Response.json({ message: "no user found" }, { status: 404 });
    }
  } catch (err) {
    const error = err as {message:string}
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const parameter = Number(params.id);  try {
    const { username, password, email, maxExpenditure } = await request.json();
    console.log(maxExpenditure)
    if(maxExpenditure && maxExpenditure !== undefined) {
      const updated = await prisma.users.update({
        where: {
          id: parameter,
        },
        data: {
          maxExpenditure: maxExpenditure
        },
      });
      if (updated) {
        return NextResponse.json({ updated, message: "updating" });
      } else {
        return Response.json(
          { message: "failed attempting to update" },
          { status: 400 }
        );
      }
    }    if (!username && !password && !email) {
      return Response.json({ message: "missing fields" }, { status: 400 });
    }
    else {
      const hash = await bcrypt.hash(password, 10);      const updated = await prisma.users.update({
        where: {
          id: parameter,
        },
        data: {
          username: username,
          password: hash,
          email: email,
        },
      });
      if (updated) {
        return NextResponse.json({ updated, message: "updating" });
      } else {
        return Response.json(
          { message: "failed attempting to update" },
          { status: 400 }
        );
      }
    }
  } catch (err) {
    const error = err as {message:string}
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}