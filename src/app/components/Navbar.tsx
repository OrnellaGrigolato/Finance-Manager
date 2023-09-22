const Navbar = () => {
  return (
    <nav className=" h-50 mt-8">
      <div className="w-10/12 flex mx-auto justify-between items-center">
        <div className="flex font-[Narrow] font-bold cursor-pointer">
          <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
        </div>

        <ul className="flex  gap-14 items-center ">
          <li>Home</li>
          <li>App</li>
          <li>About</li>
          <li>Contact</li>
          <li className="px-5 py-2 border rounded-[40px] w-26 border-black">
            Sing In
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
