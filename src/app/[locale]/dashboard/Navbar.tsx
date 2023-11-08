"use client"

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Navbar = () => {

  const t = useTranslations('Dashboard');

  return (
    <nav className="fixed bottom-[-4px] h-16 bg-[#ffffff] z-10 w-full rounded-[10px] lg:bottom-0 lg:left-0 lg:h-[100vh] lg:w-[13vw] shadow-blackShadow">
      <div className="flex w-10/12 mx-auto justify-between h-full items-center lg:flex-col lg:justify-normal lg:gap-14 lg:mt-10 lg:items-center">
        <div className=" font-[Narrow] font-bold cursor-pointer hidden text-center  lg:flex ">
          <Link href="/">
            <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
            </Link>
        </div>
        <Link
          href="/dashboard"
          className="lg:flex lg:gap-2 lg:justify-center lg:mt-10"
        >
          <p className="hidden font-bold text-[#444444] lg:block">{t('dashboard')}</p>
          <Image width={35} height={30} src="/home-icon.png" alt="" />
        </Link>
        <Link href="/wallet" className="lg:flex lg:gap-2 lg:justify-center">
          <p className="hidden font-bold text-[#444444] lg:block">{t('wallet')}</p>
          <Image width={35} height={30} src="/stocks-icon.png" alt="" />
        </Link>
        <Link
          href="/transaction"
          className="lg:flex lg:gap-2 lg:justify-center"
        >
          <p className="hidden font-bold text-[#444444] lg:block">{t('exchange')}</p>
          <Image width={35} height={30} src="/money-transfer-icon.png" alt="" />
        </Link>
        <Link href="/profile" className="lg:flex lg:gap-2 lg:justify-center">
          <p className="hidden font-bold text-[#444444] lg:block">{t('profile')}</p>
          <Image width={35} height={30} src="/user-icon.png" alt="" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
