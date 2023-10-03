import Link from "next/link";
const Navbar = () => {
  return (
    <nav className=" h-50 mt-8 max-sm:hidden">
      <div className="w-10/12 flex mx-auto justify-between items-center">
        <div className="flex font-[Narrow] font-bold cursor-pointer">
          <Link href="/">
            <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
          </Link>
        </div>

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
          <li className="px-5 py-2 border rounded-[40px] w-26 border-black">
            {" "}
            <Link href="/login">Sing In</Link>
          </li>
          <li className="px-5 py-2 border border-black rounded-[40px] w-26 bg-black text-white -ml-4">
            {" "}
            <Link href="/sing-up">Get Started</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
