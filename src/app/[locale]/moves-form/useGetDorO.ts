import baseUrl from "@/components/BaseUrl";
import { Movement } from "../types/type";

export const getUserDorOs = (moves: Movement[]) => {
  const DoroSIds: number[] = [];
  const DorOsNames: string[] = [];
  moves.map((e) => {
    if (!DoroSIds.includes(e.DorO_id)) {
      DoroSIds.push(e.DorO_id);
    }
  });

  DoroSIds.map(async (e) => {
    try {
      const response = await fetch(`${baseUrl}/api/DorO/${e}`);

      if (response.ok) {
        const data = await response.json();
        DorOsNames.push(data.result.name);
      }
    } catch (error) {
      console.error("Error al crear el movimiento:", error);
    }
  });

  return DorOsNames;
};
