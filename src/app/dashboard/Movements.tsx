import { useEffect, useState } from "react";
import MovementCard from "./MovementCard";
import { Movement } from "../types/type";
export const Movements = async (props: { user_id: number }) => {
  const [moves, setMoves] = useState<Movement[]>([]);

  useEffect(() => {
    fetch(`/api/moves/user/${props.user_id.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setMoves(data.finder);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return moves.length != 0 ? (
    <div>
      {moves.map((e) => {
        return <MovementCard props={e} />;
      })}
    </div>
  ) : (
    <div>You haven't registered any movement yet.</div>
  );
};
