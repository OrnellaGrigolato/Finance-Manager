'use client'
import { useEffect, useState } from "react";
import MovementCard from "./MovementCard";
import { Movement } from "../types/type";
import axios from "axios";

export const Movements = (props: { user_id: number }) => {
  const [moves, setMoves] = useState<Movement[]>([]);
  const [page, setPage] = useState(1);

  async function apiFecth(){
    const id = (props.user_id.toString())
    /* fetch(`/api/moves/?page=${page}&user_id=${props.user_id.toString()}`)
    fetch(`/api/moves/?page=${page}&user_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMoves(data.finder);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(moves); */
    const response = await axios.get()
  }

  useEffect(() => {
    /* fetch(`/api/moves/?page=${page}&user_id=${props.user_id.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setMoves(data.finder);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(moves); */
    apiFecth()
  }, [page]);

  return moves?.length > 0 ? (
    <div>
      {moves?.map((e, k) => {
        return <MovementCard props={e} key={k} />;
      })}
      <ul className="flex">
        <li><button onClick={() => setPage(page - 1)}>previous</button></li>
        <li><button onClick={() => setPage(page + 1)}>next</button></li>
      </ul>
    </div>
  ) : (
    <div>You haven't registered any movement yet.</div>
  );
};
