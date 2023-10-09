"use client";

import next from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu_landing } from "./Menu_landing";
const Navbar = () => {

  const { data: session,status } = useSession()

  /* async function sendEmail (){
    if(!session){
      console.log("user not logged")
    }else{
      console.log(session)
    const name = session?.user?.name
    const email = session?.user?.email
    console.log(name, email)
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email })
      };
      const response = await fetch('http://localhost:3000/api/send', requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    }
    
  }

  useEffect(()=>{
    if(session){
      sendEmail();
    }
    
  })

  const handleRegister = async () => {
    await signIn()
  } */


  return (
    
    <nav className=" h-50 mt-8">
      <div className="w-10/12 flex mx-auto justify-between items-center">
        <div className="flex font-[Narrow] font-bold cursor-pointer">
          <Link href="/">
            <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
          </Link>
        </div>
        {session?.user ? (
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

            <img
              src={
                session.user.image
                  ? session.user.image
                  : "https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=740&t=st=1696339921~exp=1696340521~hmac=fe51c494eaae6033f6b83f689a78e03af140c873e6b1b914c6575bf7094f1e8f"
              }
              alt="user icon"
              width={30}
              height={30}
              className="rounded"
            />
            <button
              className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4"
              onClick={() => signOut()}
            >
              Log Out
            </button>
          </ul>
        ) : (
          <ul className="flex  gap-10 items-center  max-sm:hidden">
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
            <button onClick={() => signIn()}>Sign In</button>
          </li>
          <li className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4">
            {" "}
            <Link href="/sing-up">Get Started</Link>
          </li>
        </ul>
        )}
        <div className="hidden max-sm:block">
          {" "}
          <Menu_landing />
        </div>
      </div>
    </nav>
  );

};

export default Navbar;
