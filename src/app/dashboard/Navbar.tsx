import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed bottom-[-4px] h-16 bg-[#ffffff] w-full rounded-[10px] lg:bottom-0 lg:left-0 lg:h-[100vh] lg:w-[10vw] shadow-blackShadow">
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
          <p className="hidden font-bold text-[#444444] lg:block">Dashboard</p>
          <img className="w-[2.2rem]" src="./home-icon.png" alt="" />
        </Link>
        <Link href="/wallet" className="lg:flex lg:gap-2 lg:justify-center">
          <p className="hidden font-bold text-[#444444] lg:block">Wallet</p>
          <img className="w-[2.2rem]" src="./stocks-icon.png" alt="" />
        </Link>
        <Link
          href="/transaction"
          className="lg:flex lg:gap-2 lg:justify-center"
        >
          <p className="hidden font-bold text-[#444444] lg:block">Exchange</p>
          <img className="w-[2.2rem]" src="./money-transfer-icon.png" alt="" />
        </Link>
        <Link href="/profile" className="lg:flex lg:gap-2 lg:justify-center">
          <p className="hidden font-bold text-[#444444] lg:block">Profile</p>
          <img className="w-[2.2rem]" src="./user-icon.png" alt="" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
