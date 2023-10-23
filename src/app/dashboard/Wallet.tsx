import { number } from "yup";
import { Movement } from "../types/type";
import WalletCard from "./WalletCard";
import "./loaderStyles.css";
import { useEffect, useState } from "react";

interface MyObject {
  [k: string]: number;
}

const Wallet = (props: { userId: number }) => {
  const [curr, setCurr] = useState<number[]>([]);
  const [moves, setMoves] = useState<Movement[]>([]);
  const [balancePerType, setBalancePerType] = useState<MyObject>({});
  const [loading, setLoading] = useState(true);
  const getMoves = () => {
    fetch(`/api/moves/user/${props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setMoves(data.finder);
      })

      .catch((error) => {
        console.error("Error en la solicitud Fetch:", error);
      });
  };

  const getUserCurrencies = () => {
    let currenciesIds: number[] = [];

    moves.map((e) => {
      if (!currenciesIds.includes(e.currency_id)) {
        currenciesIds.push(e.currency_id);
      }
    });
    setCurr(currenciesIds);
  };

  const getBalancePerCurrency = () => {
    curr.forEach(async (currId: number) => {
      const OneCurrencyTypeMoves = moves.filter((move) => {
        if (move.currency_id === currId) return move;
      });
      const values: number[] = [];
      OneCurrencyTypeMoves.map((e) => {
        e.income_amount
          ? values.push(parseInt(e.income_amount))
          : values.push(-Math.abs(parseInt(e.discount_amount)));
      });
      let currName: string;
      try {
        const response = await fetch(`/api/currency/${currId}`);

        if (response.ok) {
          const data = await response.json();
          currName = data.result.name;
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al crear el movimiento:", error);
      }

      const balance: number = values.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      if (balance > 0) {
        setBalancePerType((prevData) => ({
          ...prevData,
          [currName]: balance,
        }));
      }
    });
  };

  useEffect(() => {
    getUserCurrencies();
  }, [moves]);

  useEffect(() => {
    getBalancePerCurrency();
  }, [curr]);

  useEffect(() => {
    getMoves();
  }, []);

  return (
    <div className="flex gap-4 mt-5">
      {moves.length != 0 ? (
        loading ? (
          <div className="loading my-5 mx-auto"></div>
        ) : (
          Object.entries(balancePerType).map((elem, k) => (
            <WalletCard
              balance={elem[1].toString()}
              currencyName=""
              currencySymbol={elem[0]}
              country=""
            />
          ))
        )
      ) : (
        <div>You have not deposited money to the platform yet</div>
      )}
    </div>
  );
};

export default Wallet;
