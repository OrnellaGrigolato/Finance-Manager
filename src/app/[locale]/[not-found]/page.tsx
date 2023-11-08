"use client"
import React from "react";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
const ErrorPage = () => {

  const t = useTranslations('errorPage');

  return (
    <div>
      <Navbar />
      <div className="flex w-10/12 mx-auto h-[90vh] items-center justify-center gap-32 max-sm:flex-col">
        <div>
          <h1 className="font-bold text-5xl leading-tight mb-4">
            {t('notFound')}
          </h1>
          <p className="text-lg">
            {t('notYourFault')}
          </p>
          <button className="px-7 py-3 text-lg mt-14 bg-black text-white rounded-[40px]">
            <Link href="/">{t('backToHomePage')}</Link>
          </button>
        </div>
        <Image width={650} height={650} src="/error-page-img.png" alt="" />
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
