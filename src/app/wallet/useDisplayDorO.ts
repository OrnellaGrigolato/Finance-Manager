import { Movement } from "../types/type";

export const getDorOsInformation = async (moves: Movement[]) => {
  return new Promise<{ [key: string]: number }>((resolve) => {
    if (moves.length !== 0) {
      const balancePorLugar: { [key: string]: number } = {};
      const uniqueDorOIds = new Set(moves.map((move) => move.DorO_id));
      // Crear un array de promesas para las llamadas a la API
      const apiCalls = Array.from(uniqueDorOIds).map(fetchDorOName);

      Promise.all(apiCalls).then((dorONames) => {
        moves
          .filter((e) => e.title != "Convert")
          .forEach((move) => {
            const { DorO_id, income_amount, discount_amount } = move;
            const monto =
              income_amount !== "0"
                ? income_amount
                : (-Math.abs(parseInt(discount_amount))).toString();
            const nombreDorO = dorONames.find(
              (doro) => doro.id_DorO === DorO_id
            )?.name;

            if (nombreDorO) {
              if (balancePorLugar[nombreDorO]) {
                balancePorLugar[nombreDorO] += parseInt(monto);
              } else {
                balancePorLugar[nombreDorO] = parseInt(monto);
              }
            }
          });

        resolve(balancePorLugar);
      });
    } else {
      resolve({});
    }
  });
};

const fetchDorOName = async (doroId: number) => {
  if (doroId === 0) return { id_DorO: 0, name: "Cash" };
  const response = await fetch(`api/DorO/${doroId}`);
  const data = await response.json();
  return data.result;
};
