import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function POST(request: Request, response: Response){
    try {
        const {email, password} = await request.json();

        const userFind = await prisma.users.findUnique({where: {email: email}})

        const comparator = await(bcrypt.compare(password, userFind.password))  
 
        if (!userFind || !comparator) {
            return NextResponse.json({
              message: 'Invalid Credentials'
            }, {
              status: 401,
            });
          }


        //* confirmamos si el usuario que estamos buscando, en su propiedad password.decoficada coincide con la enviada
             
          const token = sign({user_dni: userFind.dni}, "SECRETO", { expiresIn: "1h"});
        //* lo retornamos
          return NextResponse.json(
            {token},
            {
                status: 200,
            }

          )
    } catch (error) {
        return NextResponse.json({ 
            error: error,
            status:500
        })
    }
}