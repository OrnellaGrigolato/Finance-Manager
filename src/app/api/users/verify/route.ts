import { NextRequest } from "next/server";
import { sign, verify } from "jsonwebtoken";
import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";
import { sendEmail_profile } from "@/app/api/emailSender";

export async function GET(req: Request) {
  const url = req.url || "";
  const token = url.split("=")[1];
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
 
  if (!token) {
    return NextResponse.json({ message: "missing fields" }, { status: 400 });
  }
 
  let userId;
 
  try {
    const decoded = verify(
      token as string,
      process.env.AUTH_SECRET as string
    ) as { id: string };
    userId = decoded.id;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
 
  let retries = 0;
  const maxRetries = 5;
 
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.users.update({
        where: { id: Number(userId) },
        data: { emailVerified: true },
      });
 
      return NextResponse.redirect(`${baseUrl}/validate`);
    } catch (error) {
      console.log(error);
      retries++;
      if (retries === maxRetries) {
        return NextResponse.json(
          { error: "Error verifying email" },
          { status: 500 }
        );
      }
    }
  }
 
  // Si llegamos hasta aquí, significa que no se encontró un token válido
  // y no se pudo verificar el correo electrónico. Por lo tanto, retornamos un error.
  return NextResponse.json({ error: "No valid token found" }, { status: 400 });
 }
 

 export async function POST(req: Request) {
  try {
    const { username, email } = await req.json();
 
    const userFind = await prisma.users.findUnique({ where: { email: email } });
 
    if (!userFind) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
 
    const token = sign({ id: userFind.id }, `${process.env.AUTH_SECRET}`, {
      expiresIn: "1h",
    });
    await sendEmail_profile(username, email, token);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error sending email" },
      { status: 500 }
    );
  }
 }
 