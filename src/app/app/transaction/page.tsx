"use client";
import React, { useState } from "react";
import Navbar from "../dashboard/Navbar";
import Link from "next/link";

const Transaction = () => {
  const [payValue, setPayValue] = useState<String>("0");
  console.log(payValue);
  return (
    <div className="w-[100vw] h-[100vh] bg-bg">
      <div className="w-10/12 mx-auto ">
        <div className="h-32 flex items-center gap-5">
          <Link
            href="/app/dashboard"
            className="rotate-180 p-5 rounded-[25%] bg-black text-white w-10 h-10 flex justify-center items-center shadow-blackShadow"
          >
            ➜
          </Link>
          <p className="font-bold text-xl leading-tight mx-auto w-full">
            Exchange your currencies
          </p>
        </div>
        <main className="w-full bg-card-bg rounded-[20px] shadow-blackShadow p-5 ">
          <div className="flex justify-between ">
            <div>
              <p>You pay</p>
              <input
                type="text"
                className="bg-card-bg border-b-2 w-40 focus:outline-none"
                onChange={(e) => {
                  setPayValue(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center  font-bold gap-1">
              <p className="rounded-[50%] w-8 h-8 bg-white flex justify-center items-center">
                $
              </p>
              <p>USD</p>
            </div>
          </div>
          <div className="flex gap-2 my-6 items-center ">
            <hr className="w-1/2 h-[3px] text-black  bg-black" />
            <img src="../swap.png" alt="" />
            <hr className="w-1/2 h-[3px] text-black bg-black" />
          </div>
          <div className="flex justify-between ">
            <div>
              <p>You recive</p>
              <input
                type="text"
                className="bg-card-bg border-b-2 w-40 focus:outline-none"
                onChange={(e) => {
                  setPayValue(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center  font-bold gap-1">
              <p className="rounded-[50%] w-8 h-8 bg-white flex justify-center items-center">
                $
              </p>
              <p>ARS</p>
            </div>
          </div>
        </main>
        <button className="bg-gradient-to-b from-primary to-[#391EDC] w-full rounded-[20px] text-white font-bold p-5 mt-10 shadow-blackShadow">
          Exchange
        </button>
      </div>
    </div>
  );
};

export default Transaction;
