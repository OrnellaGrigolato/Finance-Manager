import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user_id = Number(request.nextUrl.searchParams.get("user_id"));

    if (user_id) {
      const user = await prisma.users.findUnique({
        where: {
          id: user_id,
        },
        include: {
          moves: {
            include: {
              currency: true,
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json(
            { message: "not information found" },
            { status: 404 }
          );
      }
      
      //console.log(user)
      /**
      ** seteamos un contador o acumulador donde se iran guardando nuestros valores,
      ** y seteamos move que sera el movimiento actual sobre el que nos paremos.
      ** luego creamos una variables de tipo string que va a contener el nombre de nuestra moneda
      ** luego creamos una propiedad dentro del objeto cuyo nombre sera igual a la variable definida antes 
      ** Por ultimo vamos corroborando que el contador se inicialice en 0 en caso de que no haya ningun valor
      ** y en caso de que lo haya, aumenta el contador en uno
      */
      const movementsByCurrency = user.moves.reduce((result, move) => {
        const currencyName = move.currency.name;
        result[currencyName] = (result[currencyName] || 0) + 1;
        return result;
      }, {});
      //console.log(movementsByCurrency)
     return NextResponse.json(movementsByCurrency)
    } else {
      const result = await prisma.users.findMany({
        select: {
          id: true,
          username: true,
          password: false,
          lastmove_amount: true,
          lastmove_date: true,
          login_date: true,
          emailVerified: true,
          maxExpenditure: true,
          email: true,
          available_money: true,
        },
      });

      return NextResponse.json({ result });
    }
  } catch (err) {
    const error = err as { message: string };
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* export async function POST (request:any){
    try {
        const {dni,username,email,password,lastmove_amount,lastmove_date,login_date,available_money} = await request.json();

        const hash = await bcrypt.hash(password, 10);
         //* codificamos la contraseña antes de cargarla en la db y luego al momento de crear el usuario le asignamos dicha contraseña ya hasheada
        

        if(!username || !dni || !email || !password){
            return NextResponse.json({
                message:"missing fields"
            })
        }

        const result = await prisma.users.create({
            data:{
                dni:dni,
                username:username,
                password:hash,
                email:email,
                lastmove_amount:lastmove_amount || 0,
                lastmove_date:lastmove_date || null,
                login_date:login_date || Date.now(),
                available_money: available_money || 0
            }
        })
        const token = sign(result, 'SECRETO', { expiresIn: '1h' }); 
        //* Generamos el token y luego lo enviamos como respuesta
     
        //* console.log(token);
        return NextResponse.json(token);

        /* return NextResponse.json({
            result,
            status:201
        }) */
/*} catch (error) {
        return NextResponse.json({ 
            error: error,
            status:500
        })
    }
} */
