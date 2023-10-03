"use client";
import Navbar from "./Navbar";
import Button from "./Button";
import Link from "next/link";
import { useState } from "react";
import WalletCard from "./WalletCard";
import MovementCard from "./MovementCard";
const Dashboard = () => {
  const [isBalanceShowed, setIsBalanceShowed] = useState(true);
  return (
    <div className="bg-[#E8E8E8] ">
      <Navbar />

      <div className="bg-gradient-to-b from-primary to-[#391EDC] h-[38vh] w-full rounded-[25px] text-white flex justify-center items-center flex-col">
        <p className="mb-12 text-xl font-bold">Welcome Back, userName!</p>
        <p>Current Wallet Balance</p>
        <div className="flex items-center gap-5 mt-3">
          <b className="text-5xl">
            {isBalanceShowed ? "$ 30,293.2" : "$ ******"}
          </b>
          <button
            onClick={() => {
              setIsBalanceShowed(!isBalanceShowed);
            }}
          >
            <img
              className="w-6 inline"
              src={isBalanceShowed ? "./eye.png" : "./closed-eye.png"}
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex gap-6 -mt-6 mx-auto w-10/12">
        <Link href="/movement">
          <Button text="Deposit" img="./deposit.svg" style="" />
        </Link>
        <Link href="/movement">
          <Button text="Withdraw" img="./whitdraw.svg" style="" />
        </Link>
      </div>
      <div className="w-10/12 mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl ">Your Wallet</h4>
          <Link href="/wallet" className="text-primary">
            See all
          </Link>
        </div>
        <div className="flex gap-4 mt-5">
          <WalletCard
            balance="33444"
            currencyName="Pesos Argentinos"
            currencySymbol="ARS"
            country="Argentina"
          />
          <WalletCard
            balance="33444"
            currencyName="Pesos Argentinos"
            currencySymbol="ARS"
            country="Argentina"
          />
        </div>
      </div>
      <div className="w-10/12 mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl ">Last Movements</h4>
          <Link href="/transaction" className="text-primary">
            See all
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-5 pb-28">
          <MovementCard />
          <MovementCard />
          <MovementCard />
          <MovementCard />
          <MovementCard />
          <MovementCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
