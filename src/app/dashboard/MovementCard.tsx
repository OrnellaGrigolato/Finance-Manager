import { Movement } from "../types/type";

const MovementCard = (props: { props: Movement }) => {
  const moveInfo = props.props;
  return (
    <div className="p-4 border border-black  shadow-blackShadow mb-4">
      <div className="flex justify-between">
        <div>
          <p className="font-bold">{moveInfo.title}</p>
          <p className="text-sm">{moveInfo.description}</p>
        </div>
        <div className="text-right">
          <p
            className={
              moveInfo.discount_amount
                ? "text-red-500 font-bold"
                : "text-green-600 font-bold"
            }
          >
            {moveInfo.discount_amount
              ? "- " + moveInfo.discount_amount
              : "+ " + moveInfo.income_amount}
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
  );
};

export default MovementCard;
