'use client'
import { useEffect, useState } from "react";
import MovementCard from "./MovementCard";
import { Movement } from "../types/type";
import axios from "axios";

export const Movements = (props: { user_id: number }) => {
  const [moves, setMoves] = useState<Movement[]>([]);
  const [totalMovesByUser, setTotalMovesByUser] = useState<Movement[]>([]);
  const [page, setPage] = useState(1);
  const [canContinue, setCanContinue] = useState(true); 
  const [maxPage, setMaxPage] = useState(1);

  async function apiFecth() {
    const id = props.user_id.toString();

    const response = await axios.get(`http://localhost:3000/api/moves/?page=${page}&user_id=${id}`);

    console.log(response.data.result);
    setMoves(response.data.result)

    const secondFetch = await axios.get(`http://localhost:3000/api/moves/user/${id}`);

    setTotalMovesByUser(secondFetch.data.finder);

    if((totalMovesByUser.length / 5) % 1 === 0){
      const res = totalMovesByUser.length / 5
      setMaxPage(res);
    }else if((totalMovesByUser.length / 5) % 1 !== 0){
      const res = Math.floor(totalMovesByUser.length / 5)
      setMaxPage(res);
    }
    
    if (totalMovesByUser.length <= page * 5) {
      setCanContinue(false); // Si no hay más movimientos, ocultamos el botón "Next"
    } else {
      setCanContinue(true); // Si hay más movimientos, mostramos el botón "Next"
    }
  }

  useEffect(() => {
    apiFecth();
  }, [page]);

  return moves?.length > 0 ? (
    <div>
      {canContinue}
      {moves?.map((e, k) => {
        return <MovementCard props={e} key={k} />;
      })}
      <ul className="flex">
        <li>
          {page > 1 && (
            <button onClick={() => setPage(page - 1)}>Previous</button>
          )}
        </li>
        <li>
          { page !== maxPage ? (
            <button onClick={() => setPage(page + 1)}>Next</button>
          ):<></>}
        </li>
      </ul>
    </div>
  ) : (
    <div>You haven't registered any movement yet.</div>
  );
};

/*export const Movements = (props: { user_id: number }) => {
  const [moves, setMoves] = useState<Movement[]>([]);
  const [totalMovesByUser, setTotalMovesByUser] = useState<Movement[]>([]);
  const [page, setPage] = useState(1);
  const [canContinue, setCanContinue] = useState<Boolean>();

  async function apiFecth(){
    const id = (props.user_id.toString())
    const response = await axios.get(`http://localhost:3000/api/moves/?page=${page}&user_id=${id}`)
    console.log(response.data);
    const data = response.data.result;
    setMoves(data);
    const secondFetch = await axios.get(`http://localhost:3000/api/moves/user/${id}`)
    setTotalMovesByUser(secondFetch.data.finder)
    if (((totalMovesByUser.length) / page + 1 ) != 5){
      setCanContinue(false);
    }else{
      setCanContinue(true);
    }
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
   /* apiFecth()
  }, [page]);

  return moves?.length > 0 ? (
    <div>
      {moves?.map((e, k) => {
        return <MovementCard props={e} key={k} />;
      })}
      {
        page > 1 ? (
        <ul className="flex">
          <li><button onClick={() => setPage(page - 1)}>Previous</button></li>
          <li><button onClick={() => setPage(page + 1)}>Next</button></li>
        </ul>
      )
      :
        (
          (
            !canContinue ||  moves.length < 5 ? 
            
              <ul className="flex">
                <li><button onClick={() => setPage(page - 1)}>Previous</button></li>
              </ul>
            :
            <ul className="flex">
              <li><button onClick={() => setPage(page + 1)}>Next</button></li>
            </ul>
          )
        )

      }
      
    </div>
  ) : (
    <div>You haven't registered any movement yet.</div>
  );
};*/
