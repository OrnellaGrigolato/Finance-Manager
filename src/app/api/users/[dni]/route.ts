import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request: any, { params }: any) {
  //console.log(params.dni);
  const parameter = Number(params.dni);
  try {
    const finder = await prisma.users.findUnique({
      where: {
        dni: parameter,
      },
    });
    if (finder) {
      return NextResponse.json({ finder, message: "success" });
    } else {
      return Response.json({ message: "no user found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: any, { params }: any) {
  const parameter = Number(params.dni);
  try {
    const finder = await prisma.users.delete({
      where: {
        dni: parameter,
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
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: any, { params }: any) {
  const parameter = Number(params.dni);
  try {
    const { username, password, email } = await request.json();
    if (!username && !password && !email) {
      return Response.json({ message: "missing fields" }, { status: 400 });
    } else {
      const hash = await bcrypt.hash(password, 10);

      const updated = await prisma.users.update({
        where: {
          dni: parameter,
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
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
