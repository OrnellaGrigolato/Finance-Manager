const Header = () => {
  return (
    <main className=" mt-24">
      <div className="flex justify-center gap-10 w-10/12 mx-auto">
        <div className="w-8/12 leading-loose self-center">
          <h1 className="font-extrabold text-6xl mb-10 w-[110%] leading-[5rem]">
            Keep your finances in order from today
          </h1>{" "}
          <p className="w-11/12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
            ducimus natus atque fuga impedit officiis quo, optio dicta iusto
            vitae id temporibus ullam odio rerum alias. Eum itaque consequatur
            blanditiis? Culpa cumque, libero animi molestiae quos saepe,
            exercitationem possimus illo incidunt nemo dolores? Commodi quasi
            odio
          </p>
          <button className="px-7 py-3 text-lg mt-14 bg-black text-white rounded-[40px]">
            Start Now
          </button>
        </div>
        <div className="w-[50rem] mx-auto">
          <img src="./headerImage.svg" alt="" />
        </div>
      </div>
    </main>
  );
};

export default Header;
