"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import MovementCard from "./MovementCard";
import { Movement } from "../types/type";

export const Movements = (props: { user_id: number }) => {
  const [moves, setMoves] = useState<Movement[]>([]);
  const [totalMovesByUser, setTotalMovesByUser] = useState(0);
  const [page, setPage] = useState(1);
  const [wasApiCalled, setWasApiCalled] = useState(false);

  const apiFecth = useCallback(async () => {
    const id = props.user_id.toString();

    try {
      const response = await fetch(`/api/moves/?page=${page}&user_id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setMoves(data.result);
        setTotalMovesByUser(data.total);
      } else {
        console.error("Error en la respuesta:", response.statusText);
        setWasApiCalled(true);
      }
    } catch (error) {
      console.error("Error en la solicitud Fetch:", error);
    }
  }, [page, props.user_id]);

  useEffect(() => {
    setMoves([]);
    apiFecth();
  }, [page, apiFecth]);

  return moves?.length > 0 ? (
    <div>
      {moves.map((e, k) => {
        return <MovementCard props={e} key={k} />;
      })}
      <ul className="flex justify-end gap-5 mt-8">
        <li>
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="font-bold  text-primary"
            >
              <Image
                src={"/left_arrow.png"}
                className="shadow-blackShadow"
                width={35}
                height={30}
                alt=""
              ></Image>
            </button>
          )}
        </li>
        <li>
          {totalMovesByUser > page * 5 + 1 ? (
            <button
              onClick={() => setPage(page + 1)}
              className="font-bold  text-primary"
            >
              <Image
                src={"/rigth_arrow.png"}
                className="shadow-blackShadow"
                width={35}
                height={30}
                alt=""
              ></Image>
            </button>
          ) : (
            <></>
          )}
        </li>
      </ul>
    </div>
  ) : wasApiCalled && moves?.length === 0 ? (
    <div>You haven&apos;t registered any movement yet</div>
  ) : (
    <div className="loading my-10 mx-auto"></div>
  );
};
