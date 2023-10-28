import { Movement } from "../types/type";

export interface DollarResponse {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
}

function groupByDate(movimientos: Movement[]) {
  const grouped: { [key: string]: any } = {};

  movimientos.forEach((movement) => {
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

  moves.forEach((move) => {
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

  moves.forEach((move) => {
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
};
