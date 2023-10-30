import Adventage from "./Adventage";
import Image from "next/image";
const ProsToUseSection = () => {
  return (
    <>
      <section className="bg-[#F9FAFB] ">
        <div className="w-10/12 mx-auto flex gap-44 pt-44 max-sm:flex-col max-sm:pt-28 max-sm:gap-5">
          <div className="w-10/12">
            <h2 className="font-extrabold text-4xl leading-[3rem]">
              Tools to help you measure your growth
            </h2>
            <p className="text-gray-500 mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
              velit tempora distinctio odit repellat, ipsa, aspernatur nostrum
              cupiditate laudantium sunt ad ullam temporibus cumque expedita
              quos quaerat fuga asperiores! Laudantium.
            </p>
            <hr className="my-10"></hr>
            <Adventage text="Lorem ipsum dolor sit " />
            <Adventage text="Lorem ipsum dolor sit a" />
            <Adventage text="Lorem ipsum dolor sit amet consec" />
            <p className="mt-12 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quisquam, dolore suscipit repellat molestias quidem nesciunt
              commodi!
            </p>
          </div>
          <div className="grid grid-rows-2 grid-cols-5 items-center gap-8 max-sm:hidden ">
            <Image
              className=" shadow-blackShadow row-span-2 col-span-2 "
              src="/transaction.png"
              alt=""
              width={600}
              height={1100}
            />
            <Image
              className="shadow-blackShadow col-span-3 "
              src="/balance.png"
              alt=""
              width={400}
              height={400}
            />
            <Image
              className="shadow-blackShadow col-span-3 "
              src="/maxExpenditure.png"
              alt=""
              width={400}
              height={600}
            />
          </div>
        </div>
      </section>
      <section className="bg-[#F9FAFB] pb-28 max-sm:pt-8">
        <div className="w-10/12 mx-auto flex gap-36 pt-44 max-sm:flex-col max-sm:gap-10 max-sm:pt-6">
          <div className="grid grid-rows-2 grid-cols-2 gap-x-8 gap-y-6 w-[75%] max-sm:grid-cols-1 max-sm:grid-rows-0 max-sm:gap-6 max-sm:justify-items-center max-sm:w-full ">
            <Image
              className="bg-[#F3F4F4] h-full shadow-blackShadow row-span-2"
              src="/dashboard.png"
              alt=""
              width={350}
              height={5}
            />
            <Image
              className="shadow-blackShadow"
              src="/graphic.jfif"
              alt=""
              width={400}
              height={400}
            />
            <Image
              className="shadow-blackShadow  max-sm:hidden"
              src="/graphic2.png"
              alt=""
              width={400}
              height={600}
            />
          </div>

          <div>
            <h2 className="font-extrabold text-4xl w-[110%] leading-[5rem] max-sm:leading-snug max-sm:mb-10">
              Tools to help you measure your growth
            </h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
              velit tempora distinctio odit repellat, ipsa, aspernatur nostrum
              cupiditate laudantium sunt ad ullam temporibus cumque expedita
              quos quaerat fuga asperiores! Laudantium.
            </p>
            <hr className="my-10"></hr>
            <Adventage text="Lorem ipsum dolor sit amet" />
            <Adventage text="Lorem ipsum dolor s" />
            <Adventage text="Lorem ipsum dolor sit amet, consectetu" />
            <Adventage text="Lorem ipsum dolor sit" />
            <Adventage text="Lorem ipsum dolor sit amet, conse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProsToUseSection;
