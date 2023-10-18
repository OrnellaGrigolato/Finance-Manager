"use client";

import Navbar from "../dashboard/Navbar";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import PieChart from "./pieChart";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
const Wallet = () => {
  const data = {
    labels: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O"],
    datasets: [
      {
        data: [100, 360, 278, 600, 760, 800, 548, 887, 790, 1000],
        backgroundColor: "transparent",
        borderColor: "#8A22F0",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };

  return (
    <div className=" bg-bg">
      <Navbar />
      <div className="w-11/12 mx-auto ">
        <div className="ml-[10vw]">
          <div className="h-32 flex items-center gap-14 ">
            <div>
              <h1 className="font-bold text-xl leading-tight mx-auto w-full">
                Your Wallet
              </h1>
              <p>
                Manage your information, configure your experience and keep your
                account safe.
              </p>
            </div>
          </div>
          <div className="grid gap-5 grid-cols-3">
            <div className="border-card-bg border-2 p-6 flex flex-col items-center gap-5 shadow-blackShadow rounded-2xl  justify-center">
              You have made <b>200</b> moves
            </div>
            <div className="border-card-bg border-2 p-6 shadow-blackShadow rounded-2xl col-span-2 flex justify-center">
              <Line data={data} />
            </div>
            {/* <PieChart></PieChart> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
