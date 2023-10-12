"use client";
import Navbar from "./Navbar";
import Button from "./Button";
import Link from "next/link";
import { useState } from "react";
import WalletCard from "./WalletCard";
import { useSession } from "next-auth/react";
import MovementCard from "./MovementCard";
const Dashboard = () => {
  const { data: session, status } = useSession();

  console.log(session);
  const [isBalanceShowed, setIsBalanceShowed] = useState(true);
  return (
    <div className="bg-bg lg:w-[90vw] lg:ml-[10vw] lg:pt-10">
      <Navbar />
      <p className="mb-5 text-xl font-bold hidden w-11/12 mx-auto lg:block ">
        Welcome Back, {session?.user?.name?.split(" ")[0]}!
      </p>
      <div className="bg-gradient-to-b from-primary to-[#391EDC] h-[38vh] w-full rounded-[25px] text-white flex justify-center shadow-blackShadow items-center flex-col lg:w-11/12 lg:mx-auto lg:h-[25vh]">
        <div className="lg:flex lg:justify-between lg:items-center lg:w-4/5">
          <div className="text-center">
            <p className="mb-12 text-xl font-bold lg:hidden">
              {" "}
              Welcome Back, {session?.user?.name?.split(" ")[0]}!
            </p>
            <p>Current Wallet Balance</p>
            <div className="flex items-center gap-5 mt-3 lg:mb-5">
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
          <img
            src="/plant.svg"
            alt=""
            className="hidden h-60 -mt-10 drop-shadow-lg lg:inline"
          />
        </div>
      </div>
      <div className="flex gap-6 -mt-6 mx-auto w-10/12 lg:w-[76.2%] lg:mx-auto">
        <Link href="/movement">
          <Button text="Deposit" img="../deposit.svg" style="" />
        </Link>
        <Link href="/movement">
          <Button text="Withdraw" img="../whitdraw.svg" style="" />
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