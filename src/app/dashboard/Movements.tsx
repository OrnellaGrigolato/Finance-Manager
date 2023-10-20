'use client'
import { useEffect, useState } from "react";
import MovementCard from "./MovementCard";
import { Movement } from "../types/type";
import axios from "axios";

export const Movements = (props: { user_id: number }) => {
  const [moves, setMoves] = useState<Movement[]>([]);
  const [totalMovesByUser, setTotalMovesByUser] = useState(0);
  const [page, setPage] = useState(1); 
  const [maxPage, setMaxPage] = useState<Number>();

  async function apiFecth() {
    const id = props.user_id.toString();

  try {
    const response = await fetch(`http://localhost:3000/api/moves/?page=${page}&user_id=${id}`);
    if (response.ok) {
      const data = await response.json();
      setMoves(data.result);
      
      setTotalMovesByUser(data.total);

    } else {
      console.error('Error en la respuesta:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud Fetch:', error);
  }
  }

  useEffect(() => {
    apiFecth();
  }, [page]);

  return moves?.length > 0 ? (
    <div>
      {moves.map((e, k) => {
        return <MovementCard props={e} key={k} />;
      })}
      <ul className="flex">
        <li>
          {page > 1 && (
            <button onClick={() => setPage(page - 1)}>Previous</button>
          )}
        </li>
        <li>
          { (totalMovesByUser > (page * 5 + 1) ) ? (
            <button onClick={() => setPage(page + 1)}>Next</button>
          ):<></>}
        </li>
      </ul>
    </div>
  ) : (
    <div>You haven't registered any movement yet.</div>
  );
};
