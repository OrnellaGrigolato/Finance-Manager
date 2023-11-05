"use client";
import Navbar from "./Navbar";
import Button from "./Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useApiData } from "@/app/providers/Providers";
import "./loaderStyles.css";
import { ApiResponse } from "../types/type";
import { Movements } from "./Movements";

import Wallet from "./Wallet";

const Dashboard = () => {
  const apiData = useApiData();
  const [loading, setLoading] = useState(true);
  const [isBalanceShowed, setIsBalanceShowed] = useState(true);
  const [userInfo, setUserInfo] = useState<ApiResponse>();
  useEffect(() => {
    fetch(`api/users/${apiData}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.finder);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [apiData]);

  return userInfo ? (
    <div className="bg-bg lg:w-[90vw] lg:ml-[10vw] lg:pt-10">
      <Navbar />
      <p className="mb-5 text-xl font-bold hidden w-11/12 mx-auto lg:block ">
        Welcome Back, {userInfo?.username?.split(" ")[0]}!
      </p>
      <div className="bg-gradient-to-b from-primary to-[#391EDC] h-[38vh] w-full rounded-[25px] text-white flex justify-center shadow-blackShadow items-center flex-col lg:w-11/12 lg:mx-auto lg:h-[25vh]">
        <div className="lg:flex lg:justify-between lg:items-center lg:w-4/5">
          <div className="text-center">
            <p className="mb-12 text-xl font-bold lg:hidden">
              {" "}
              Welcome Back, {userInfo?.username?.split(" ")[0]}!
            </p>
            <p>Current Wallet Balance</p>
            <div className="flex items-center justify-center gap-5 mt-3 lg:mb-5 ">
              {!loading ? (
                <b className="text-5xl">
                  {isBalanceShowed
                    ? `$ ${Math.round(parseInt(userInfo?.available_money))}`
                    : `$ ${"*".repeat(
                        userInfo?.available_money
                          ? Math.round(
                              parseInt(userInfo?.available_money)
                            ).toString().length
                          : 0
                      )}`}
                </b>
              ) : (
                <div className="loader">KK</div>
              )}
              <button
                onClick={() => {
                  setIsBalanceShowed(!isBalanceShowed);
                }}
              >
                {
                  <Image
                    className="inline"
                    src={isBalanceShowed ? "/eye.png" : "/closed-eye.png"}
                    alt=""
                    width={30}
                    height={23}
                  />
                }
              </button>
            </div>
          </div>
          <Image
            src="/plant.svg"
            alt=""
            className="hidden h-60 -mt-10 drop-shadow-lg lg:inline"
            width={250}
            height={200}
          />
        </div>
      </div>
      <div className="flex gap-6 -mt-6 mx-auto w-fit lg:w-10/12 lg:mx-auto ">
        <Link href="/moves-form?action=deposit">
          <Button
            text="Deposit"
            img="../deposit.svg"
            availableMoney={parseInt(userInfo.available_money)}
          />
        </Link>
        <Link
          href={
            userInfo.available_money === "0"
              ? ""
              : "/moves-form?action=whitdraw"
          }
        >
          <Button
            text="Withdraw"
            img="../whitdraw.svg"
            availableMoney={parseInt(userInfo.available_money)}
          />
        </Link>
      </div>
      <div className="w-10/12 mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl ">Your Wallet</h4>
          <Link href="/wallet" className="text-primary">
            See Details
          </Link>
        </div>

        <Wallet userId={userInfo.id} />
      </div>
      <div className="w-10/12 mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl ">Last Movements</h4>
        </div>

        <div className="flex flex-col gap-4 mt-5 pb-28">
          <Movements user_id={userInfo.id} />
        </div>
      </div>
    </div>
  ) : (
    <div className="loader"></div>
  );
};

export default Dashboard;
