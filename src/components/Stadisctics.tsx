"use client"

import Link from "next/link";
import Stadistic from "./Stadistic";
import { useTranslations } from 'next-intl';

const Stadisctics = () => {
 const  t  = useTranslations('Stadistics');

 return (
   <section className="flex gap-36 w-10/12 mx-auto my-32 max-sm:flex-col max-sm:my-28 max-sm:gap-12">
     <div className="w-1/2 max-sm:w-full">
       <h6 className="text-primary">{t('Trusted Worldwide')}</h6>
       <h2 className="font-extrabold text-4xl leading-[3rem] ">
         {t('Trusted by over 2 thousand users and 20 teams')}
       </h2>
       <p className="text-gray-500 mt-5">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos autem,
         perspiciatis sunt exercitationem ullam alias inventore saepe
         molestias, architecto modi accusantium assumenda doloremque at
         perferendis mollitia eum! Quasi, assumenda quas.
       </p>
       <hr className="my-6"></hr>
       <Link href="./" className="text-primary">
         {t('Read more')} ➜
       </Link>
     </div>
     <div className="grid grid-rows-2 grid-cols-2 gap-8 max-sm:grid-cols-1 max-sm:grid-rows-4 max-sm:justify-items-center">
       <Stadistic
         img="security-icon.png"
         title={t('Security as a priority')}
         text={t('Your money will be completely safe on our platform')}
       ></Stadistic>
       <Stadistic
         img="./transaction-icon.png"
         title={t('Thousands')}
         text={t('of transactions per day')}
       ></Stadistic>
       <Stadistic
         img="users-icon.svg"
         title={t('2000+ Users')}
         text={t('trusted by over 2000+ users around the world')}
       ></Stadistic>
       <Stadistic
         img="./world-icon.svg"
         title={t('7+ countries')}
         text={t('have used our web app to manage his finances')}
       ></Stadistic>
     </div>
   </section>
 );
};

export default Stadisctics;
