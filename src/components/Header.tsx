import { useTranslations } from "next-intl";
import Link from "next/link";

const Header = () => {

  const t = useTranslations('Header');

  return (
    <main className=" mt-24">
      <div className="flex justify-center gap-10 w-10/12 mx-auto max-sm:flex-col">
        <div className="w-[50rem] mx-auto hidden max-sm:w-full max-sm:block">
          <img src="./headerImage.svg" alt="" />
        </div>
        <div className="w-8/12 leading-loose self-center max-sm:w-full">
          <h1 className="font-extrabold text-6xl mb-10 w-[110%] leading-[5rem] ">
          {t('keepFinances')}
          </h1>{" "}
          <p className="w-11/12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
            ducimus natus atque fuga impedit officiis quo, optio dicta iusto
            vitae id temporibus ullam odio rerum alias. Eum itaque consequatur
            blanditiis? Culpa cumque, libero animi molestiae quos saepe,
            exercitationem possimus illo incidunt nemo dolores? Commodi quasi
            odio
          </p>
          <button className="px-7 py-3 text-lg mt-14 bg-black shadow-blackShadow text-white rounded-[40px] max-sm:w-full">
            <Link href="/sign-up">{t('startnow')}</Link>
          </button>
        </div>
        <div className="w-[50rem] mx-auto max-sm:w-full max-sm:hidden">
          <img src="./headerImage.svg" alt="" />
        </div>
      </div>
    </main>
  );
};

export default Header;
