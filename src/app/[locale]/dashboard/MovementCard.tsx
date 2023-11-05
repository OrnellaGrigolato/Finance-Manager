import { useEffect, useState } from "react";
import { Movement } from "../types/type";
import "./loaderStyles.css";
import baseUrl from "@/components/BaseUrl";

const MovementCard = (props: { props: Movement }) => {
  const moveInfo = props.props;
  const [currency, setCurrency] = useState<{
    id_curerency: number;
    name: string;
  }>();
  useEffect(() => {
    fetch(`${baseUrl}/api/currency/${moveInfo.currency_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrency(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [moveInfo.currency_id]);

  return currency ? (
    <div className="p-4 border border-black  shadow-blackShadow mb-4">
      <div className="flex justify-between">
        <div>
          <p className="font-bold">{moveInfo.title}</p>
          <p className="text-sm">{moveInfo.description}</p>
        </div>
        <div className="text-right">
          <p
            className={
              moveInfo.discount_amount != "0"
                ? "text-red-500 font-bold"
                : "text-green-600 font-bold"
            }
          >
            {moveInfo.discount_amount != "0"
              ? "- " + moveInfo.discount_amount
              : "+ " + moveInfo.income_amount}
            {" " + currency?.name}
          </p>
          <p className="text-xs">
            {moveInfo.movement_date
              .slice(0, -14)
              .split("-")
              .reverse()
              .join("-")}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="movementsLoader my-5 mx-auto"></div>
  );
};

export default MovementCard;
