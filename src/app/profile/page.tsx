"use client";

import Link from "next/link";
import Navbar from "../dashboard/Navbar";
import Image from "next/image";
import { useState } from "react";

const Profile = () => {
  const [isPasswordShowed, setIsPasswordShowed] = useState(true);

  return (
    <div className="w-[100vw] h-[100vh] bg-bg">
      <Navbar />
      <div className="w-11/12 mx-auto ">
        <div className="ml-[10vw]">
          <div className="h-32 flex items-center gap-14 ">
            <div>
              <h1 className="font-bold text-xl leading-tight mx-auto w-full">
                User Profile
              </h1>
              <p>
                Manage your information, configure your experience and keep your
                account safe.
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="border-card-bg border-2 p-6 flex flex-col items-center gap-5 w-fit shadow-blackShadow rounded-2xl ">
              <Image
                src={
                  "data:image/png;base64,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"
                }
                width={150}
                height={150}
                alt=""
                className="rounded-full"
              />
              <div className="text-center">
                <h3 className="text-primary font-bold">FirstName LastName</h3>
                <p className="mt-2">emailemailemail@email.com</p>
              </div>
            </div>
            <div className="border-card-bg border-2 p-6  shadow-blackShadow rounded-2xl">
              <h2 className="font-bold text-lg">General Information</h2>

              <form
                action="submit"
                className="grid grid-rows-2 grid-cols-2 gap-x-12 gap-y-10 mt-6"
              >
                <div className="border-card-bg border-2 p-2 rounded-lg">
                  <label htmlFor="" className="block text-xs">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={"Mateo"}
                    className="focus:outline-none focus:border-b-2  text-lg"
                  />
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg">
                  <label htmlFor="" className="block text-xs">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={"Lopez"}
                    className="focus:outline-none focus:border-b-2 text-lg"
                  />
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg w-[25vw]">
                  <label htmlFor="" className="block text-xs">
                    Email
                  </label>
                  <input
                    type="text"
                    value={"emailemailemail@email.com"}
                    className="focus:outline-none focus:border-b-2 text-lg w-full"
                  />
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg ">
                  <label htmlFor="" className="block text-xs">
                    Password
                  </label>
                  <div className="flex ">
                    <input
                      type="text"
                      value={isPasswordShowed ? "123456789" : "********"}
                      className="focus:outline-none focus:border-b-2 text-lg max-w-min"
                    />
                    <Image
                      className="inline cursor-pointer"
                      src={
                        isPasswordShowed
                          ? "/black-eye.png"
                          : "/black-closed-eye.png"
                      }
                      alt=""
                      onClick={() => {
                        setIsPasswordShowed(!isPasswordShowed);
                      }}
                      width={23}
                      height={10}
                    />
                  </div>
                </div>
                <button>Edit Information</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
