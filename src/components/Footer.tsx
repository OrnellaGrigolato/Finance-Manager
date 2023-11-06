"use client"

import { useTranslations } from 'next-intl';

const Footer = () => {
 const date = new Date();
 const t = useTranslations('Footer');

 return (
   <footer className="w-10/12 mx-auto mt-20">
     <div className="flex justify-between max-sm:flex-col max-sm:gap-12 max-sm:items-center max-sm:text-center">
       <div>
         <h4 className="font-bold mb-3">{t('company')}</h4>
         <ul className="flex flex-col gap-3">
           <li>{t('aboutUs')}</li>
           <li>{t('affiliateProgram')}</li>
           <li>{t('careers')}</li>
           <li>{t('contactUs')}</li>
         </ul>
       </div>
       <div>
         <h4 className="font-bold mb-3">{t('helpAndSupport')}</h4>
         <ul className="flex flex-col gap-3">
           <li>{t('helpCenter')}</li>
           <li>{t('premiumSupport')}</li>
           <li>{t('faq')}</li>
         </ul>
       </div>
       <div>
         <h4 className="font-bold mb-3">{t('learning')}</h4>
         <ul className="flex flex-col gap-3">
           <li>{t('tutorials')}</li>
           <li>{t('manuals')}</li>
           <li>{t('learnHub')}</li>
         </ul>
       </div>
       <div>
         <h4 className="font-bold mb-3">{t('resources')}</h4>
         <ul className="flex flex-col gap-3">
           <li>{t('thirdPartyTools')}</li>
           <li>{t('blog')}</li>
           <li>{t('community')}</li>
         </ul>
       </div>
       <div>
         <h4 className="font-bold mb-3">{t('legal')}</h4>
         <ul className="flex flex-col gap-3">
           <li>{t('privacyPolicy')}</li>
           <li>{t('termsAndConditions')}</li>
           <li>{t('fees')}</li>
         </ul>
       </div>
     </div>
     <div className="mt-20 text-center mb-12">
       <p className="font-[Narrow] font-bold cursor-pointer text-xl">
         <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
       </p>
       <p className="mt-4">{t('copyright')}</p>
     </div>
   </footer>
 );
};

export default Footer;
