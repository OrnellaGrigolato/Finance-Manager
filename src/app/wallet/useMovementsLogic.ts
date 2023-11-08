import { Movement } from "../types/type";
const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_APIKEY;
export interface DollarResponse {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
}

const getUserCurrencies = (moves: Movement[]) => {
  let currenciesIds: number[] = [];

  moves.map((e) => {
    if (!currenciesIds.includes(e.currency_id)) {
      currenciesIds.push(e.currency_id);
    }
  });

  return currenciesIds;
};

const obtenerNombreMoneda = async (currencyId: number) => {
  try {
    const response = await fetch(`api/currency/${currencyId}`);
    const data = await response.json();
    return data.result.name;
  } catch (error) {
    console.error("Error al obtener el nombre de la moneda:", error);
    return null; // En caso de error, devuelve null o un valor por defecto
  }
};

export const getConvertedValues = async (move: Movement) => {
  try {
    if (move.currency_id != 1) {
      const currencyName = await obtenerNombreMoneda(move.currency_id);
      if (currencyName) {
        const conversionResponse = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currencyName}/ARS/${
            move.income_amount != "0"
              ? move.income_amount
              : move.discount_amount
          }`
        );
        const conversionData = await conversionResponse.json();
        const convertedIncome = conversionData.conversion_result;

        return move.income_amount != "0"
          ? {
              ...move,
              income_amount: convertedIncome,
            }
          : {
              ...move,
              discount_amount: convertedIncome,
            };
      }
    }

    return move; // En caso de no poder obtener el nombre de la moneda, devolvemos el movimiento sin cambios
  } catch (error) {
    console.error("Error al convertir movimiento:", error);
    return move; // En caso de error, devolvemos el movimiento sin cambios
  }
};

const convertirMovimientos = async (moves: Movement[]) => {
  const convertedMoves = await Promise.all(
    moves.map(async (move) => {
      return await getConvertedValues(move);
    })
  );

  // Aquí puedes utilizar los movimientos convertidos
  // en lugar de los movimientos originales
  // ...

  return convertedMoves;
};

function groupByDate(movimientos: Movement[]) {
  const grouped: { [key: string]: any } = {};

  movimientos
    .filter((e) => e.title != "Convert")
    .forEach((movement) => {
      const date = movement.movement_date.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(movement);
    });

  return grouped;
}
function calculateDifferenceInDays(date: string) {
  const movementDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = currentDate - movementDate;
  const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else {
    return `${differenceInDays} days ago`;
  }
}

function convertDate(ISODate: string) {
  const date = new Date(ISODate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formatedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formatedDate;
}

function groupByDateIncomeAndExpenditure(moves: Movement[]) {
  const grouped: { [key: string]: any } = {};

  moves
    .filter((e) => e.title != "Convert")
    .forEach((move) => {
      const fecha = move.movement_date.split("T")[0];
      if (!grouped[fecha]) {
        grouped[fecha] = { ingresos: 0, gastos: 0 };
      }

      grouped[fecha].ingresos += parseFloat(move.income_amount);
      grouped[fecha].gastos += parseFloat(move.discount_amount);
    });

  return grouped;
}

function calcularSaldosPorFecha(moves: Movement[]) {
  let saldoAcumulado = 0;
  const saldosPorFecha: { [key: string]: any } = {};

  moves
    .filter((e) => e.title != "Convert")
    .forEach((move) => {
      const fecha = move.movement_date.split("T")[0];
      const ingreso = parseFloat(move.income_amount);
      const gasto = parseFloat(move.discount_amount);

      saldoAcumulado += ingreso - gasto;
      saldosPorFecha[fecha] = saldoAcumulado;
    });

  return saldosPorFecha;
}

export default convertDate;

export {
  calculateDifferenceInDays,
  groupByDate,
  groupByDateIncomeAndExpenditure,
  calcularSaldosPorFecha,
  getUserCurrencies,
  convertirMovimientos,
};
