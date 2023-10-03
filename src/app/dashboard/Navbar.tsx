import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed bottom-[-4px] h-16 bg-[#f2f2f2] w-full rounded-[10px] ">
      <div className="flex w-10/12 mx-auto justify-between h-full items-center">
        <Link href="/dashboard">
          <img className="w-[2.2rem]" src="./home-icon.png" alt="" />
        </Link>
        <Link href="/wallet">
          <img className="w-[2.2rem]" src="./stocks-icon.png" alt="" />
        </Link>
        <Link href="/transaction">
          <img className="w-[2.2rem]" src="./money-transfer-icon.png" alt="" />
        </Link>
        <Link href="/profile">
          <img className="w-[2.2rem]" src="./user-icon.png" alt="" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
