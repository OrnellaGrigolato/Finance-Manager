"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { ResponsiveMenu } from "./ResponsiveMenu";
import Image from "next/image";
const Navbar = () => {
  const userToken = Cookies.get("token");

  return (
    <nav className=" h-50 mt-8">
      <div className="w-10/12 flex mx-auto justify-between items-center">
        <div className="flex font-[Narrow] font-bold cursor-pointer">
          <Link href="/">
            <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
          </Link>
        </div>
        {userToken && userToken !== undefined ? (
          <ul className="flex  gap-10 items-center max-sm:hidden">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">App</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>

            <Image
              src={"/user-profile.png"}
              alt="user icon"
              width={50}
              height={50}
              className="rounded"
            />
            <li className="px-5 py-2 border rounded-[40px] w-26 border-black">
              {" "}
              <Link href="/logOut">LogOut</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex  gap-10 items-center  max-sm:hidden">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">App</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li className="px-5 py-2 border rounded-[40px] w-26 border-black">
              {" "}
              <Link href="/login">Login</Link>
            </li>
            <li className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4">
              {" "}
              <Link href="/sign-up">Get Started</Link>
            </li>
          </ul>
        )}
        <div className="hidden max-sm:flex max-sm:gap-6 items-center ">
          {" "}
          {userToken ? (
            <Image
              src={"/user-profile.png"}
              alt="user icon"
              width={50}
              height={50}
              className="rounded"
            />
          ) : (
            ""
          )}
          <ResponsiveMenu logged={userToken ? true : false} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
