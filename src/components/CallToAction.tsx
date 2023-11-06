import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
const CallToAction = () => {


  const t = useTranslations('CallToAction');

  return (
    <section className="py-20">
      <img src="./wave.svg" alt="" className="-mt-24 max-sm:-mt-20" />
      <div className="w-10/12 mx-auto text-center">
        <h2 className="font-extrabold text-4xl leading-[3rem] max-sm:mt-10">
          {t('start from today')}
        </h2>
        <p className="my-5 text-lg">
        {t('Unlock your financial')}
        </p>
        <button className="px-7 py-3 text-lg mt-5 bg-primary text-white rounded-[40px]">
          <Link href="/sing-up">{t('startnow')}</Link>
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
