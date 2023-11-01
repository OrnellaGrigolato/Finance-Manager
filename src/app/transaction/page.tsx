import React from "react";
import Link from "next/link";
import CurrencyConverter from "./Converter";

const Transaction = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-bg">
      <div className="w-10/12 mx-auto ">
        <div className="h-32 flex items-center gap-5">
          <Link
            href="/dashboard"
            className="rotate-180 p-5 rounded-[25%] bg-black text-white w-10 h-10 flex justify-center items-center shadow-blackShadow"
          >
            ➜
          </Link>
          <p className="font-bold text-xl leading-tight mx-auto w-full">
            Exchange your currencies
          </p>
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default Transaction;
