"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu_landing } from "./Menu_landing";
const Navbar = () => {

  const { data: session } = useSession()
  /* console.log(session); */

  return (
    <nav className=" h-50 mt-8">
      <div className="w-10/12 flex mx-auto justify-between items-center max-sm:hidden">
        <div className="flex font-[Narrow] font-bold cursor-pointer">
          <Link href="/">
            <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
          </Link>
        </div>
        {
          session?.user ? (
            <ul className="flex  gap-10 items-center ">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/app">App</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <img src={session.user.image ? session.user.image : "https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=740&t=st=1696339921~exp=1696340521~hmac=fe51c494eaae6033f6b83f689a78e03af140c873e6b1b914c6575bf7094f1e8f"}
                alt="user icon"
                width={30}
                height={30}
                className="rounded"
              />
              <button
                className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4"
                onClick={() => signOut()}
              >
                LogOut
              </button>
            </ul>
          ) : (
            <ul className="flex  gap-10 items-center ">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/app">App</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li className="px-5 py-2 border rounded-[40px] w-26 border-black">
                {/* {" "}
            <Link href="/login">Sing In</Link> */}
                <button onClick={() => signIn()}>
                  SignIn
                </button>
              </li>
              <li className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4">
                {" "}
                <Link href="/sing-up">Get Started</Link>
              </li>
            </ul>
          )
        }

      </div>
      
        <div className="w-11/12 mx-auto justify-between hidden max-sm:flex">
          <Link className=" font-[Narrow] font-bold flex items-center cursor-pointer" href="/">
            <b className="text-[#C525FF] mr-2 ">$</b>Finance Manager Logo
          </Link>
          <div className="flex inline-block items-center">
            {
              session?.user ? (

                <img src={session.user.image ? session.user.image : "https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=740&t=st=1696339921~exp=1696340521~hmac=fe51c494eaae6033f6b83f689a78e03af140c873e6b1b914c6575bf7094f1e8f"}
                  alt="user icon"
                  width={30}
                  height={30}
                  className="rounded h-[30px] mr-4"
                />) : (<div>
                
                <button className="px-5 mr-7 py-2 border rounded-[40px] w-26 border-black" onClick={() => signIn()}>
                  SignIn
                </button>
              
              <button className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white mr-2 -ml-4">
                {" "}
                <Link href="/sing-up">Get Started</Link>
              </button></div>)}
            <Menu_landing /></div>
        </div>
      
    </nav>
  );
};

export default Navbar;
