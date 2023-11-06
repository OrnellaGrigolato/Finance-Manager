"use client";

import Link from "next/link";
import { ResponsiveMenu } from "./ResponsiveMenu";
import Image from "next/image";
import { useApiData } from "@/app/[locale]/providers/Providers";
import { useLocale, useTranslations } from 'next-intl';
import { useState } from "react";

const Navbar = () => {
 const userId = useApiData();
 const t = useTranslations('Navbar');


 const [Locale, setLocale] = useState(useLocale());

 return (
   <nav className=" h-50 mt-8">

<div className="tooltip flex absolute top-[3%] right-[3%] max-sm:hidden">
 <Link href={Locale === "en" ? "/es" : "/en"}>
  <Image
    src={Locale === "en" ? "/usa-flag.png" : "/arg-flag.png"}
    width={26}
    height={26}
    alt={Locale === "en" ? "EEUU Flag" : "Argentina Flag"}
    title={Locale === "en" ? "English" : "Spanish"}
  />
 </Link>
</div>



     <div className="w-10/12 flex mx-auto justify-between items-center">
       <div className="flex font-[Narrow] font-bold cursor-pointer">
         <Link href="/">
           <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
         </Link>
       </div>
       {userId ? (
         <ul className="flex gap-10 items-center max-sm:hidden">
           <li>
             <Link href="/">{t('home')}</Link>
           </li>
           <li>
             <Link href="/dashboard">{t('app')}</Link>
           </li>
           <li>
             <Link href="/about">{t('about')}</Link>
           </li>
           <li>
             <Link href="/contact">{t('contact')}</Link>
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
             <Link href="/logOut">{t('logOut')}</Link>
           </li>
         </ul>
       ) : (
         <ul className="flex gap-10 items-center max-sm:hidden">
           <li>
             <Link href="/">{t('home')}</Link>
           </li>
           <li>
             <Link href="/dashboard">{t('app')}</Link>
           </li>
           <li>
             <Link href="/about">{t('about')}</Link>
           </li>
           <li>
             <Link href="/contact">{t('contact')}</Link>
           </li>
           <li className="px-5 py-2 border rounded-[40px] w-26 border-black">
             {" "}
             <Link href="/login">{t('login')}</Link>
           </li>
           <li className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4">
             {" "}
             <Link href="/sign-up">{t('getStarted')}</Link>
           </li>
         </ul>
       )}
       <div className="hidden max-sm:flex max-sm:gap-6 items-center ">
         {" "}
          {userId ? (
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
          <ResponsiveMenu logged={userId ? true : false} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
