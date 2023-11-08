import baseUrl from "@/components/BaseUrl";
import { Movement } from "../types/type";

export const checkCurrencyQuantity = async (
  moves: Movement[],
  quantity: number,
  currencyType: string
): Promise<boolean> => {
  let currenciesIds: number[] = [];

  moves?.map((e) => {
    if (!currenciesIds.includes(e.currency_id)) {
      currenciesIds.push(e.currency_id);
    }
  });

  const results = await Promise.all(
    currenciesIds.map(async (currId: number) => {
      const OneCurrencyTypeMoves = moves.filter((move) => {
        if (move.currency_id === currId) return move;
      });
      const values: number[] = [];
      OneCurrencyTypeMoves.map((e) => {
        e.income_amount != "0"
          ? values.push(parseInt(e.income_amount))
          : values.push(-parseInt(e.discount_amount));
      });

      try {
        const response = await fetch(`${baseUrl}/api/currency/${currId}`);

        if (response.ok) {
          const data = await response.json();
          const currName = data.result.name;
          const balance: number = values.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );

          return currencyType === currName && balance >= quantity;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    })
  );
  return results.some(Boolean);
};
