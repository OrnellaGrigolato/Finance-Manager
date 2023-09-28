import Link from "next/link";
const CallToAction = () => {
  return (
    <section className="py-20">
      <img src="./wave (2).svg" alt="" className="-mt-24" />
      <div className="w-10/12 mx-auto text-center">
        <h2 className="font-extrabold text-4xl leading-[3rem] ">
          Start From Today
        </h2>
        <p className="my-5 text-lg">
          Unlock your financial potential with us! Take the first step towards a
          brighter financial future. Get started now!
        </p>
        <button className="px-7 py-3 text-lg mt-5 bg-primary text-white rounded-[40px]">
          <Link href="/sing-up">Start Now</Link>
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
