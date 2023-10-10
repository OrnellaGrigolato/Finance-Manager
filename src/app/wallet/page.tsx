"use client";

import Navbar from "../dashboard/Navbar";
import dynamic from "next/dynamic";
const Line = dynamic(
  () => import("@ant-design/charts").then(({ Line }) => Line),
  { ssr: false }
);
const Wallet = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 2,
      shape: "diamond",
    },
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
          <Line {...config} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
