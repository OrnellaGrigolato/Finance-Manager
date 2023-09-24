import Adventage from "./Adventage";
const ProsToUseSection = () => {
  return (
    <>
      <section className="bg-[#F9FAFB]">
        <div className="w-10/12 mx-auto flex gap-44 pt-44">
          <div>
            <h2 className="font-extrabold text-4xl w-[110%] leading-[5rem]">
              Tools to help you measure your growth
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
              velit tempora distinctio odit repellat, ipsa, aspernatur nostrum
              cupiditate laudantium sunt ad ullam temporibus cumque expedita
              quos quaerat fuga asperiores! Laudantium.
            </p>
            <hr className="my-10"></hr>
            <Adventage text="Lorem ipsum dolor sit " />
            <Adventage text="Lorem ipsum dolor sit a" />
            <Adventage text="Lorem ipsum dolor sit amet consec" />
            <p className="mt-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quisquam, dolore suscipit repellat molestias quidem nesciunt
              commodi!
            </p>
          </div>
          <div className="grid grid-rows-2 grid-cols-3 gap-8">
            <img
              className="bg-[#F3F4F4] h-full shadow-blackShadow"
              src="./no-image.svg"
              alt=""
            />
            <img
              className="col-span-2 shadow-blackShadow"
              src="./no-image-h.png"
              alt=""
            />
            <img
              className="col-span-2 shadow-blackShadow"
              src="./no-image-h.png"
              alt=""
            />
            <img
              className="bg-[#F3F4F4] h-full shadow-blackShadow"
              src="./no-image.svg"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="bg-[#F9FAFB]">
        <div className="w-10/12 mx-auto flex gap-36 pt-44">
          <div className="grid grid-rows-3 grid-cols-2 gap-8 w-[75%]">
            <img
              className="bg-[#F3F4F4] h-full shadow-blackShadow row-span-2"
              src="./no-image.svg"
              alt=""
            />
            <img className="shadow-blackShadow" src="./no-image.svg" alt="" />
            <img className="shadow-blackShadow" src="./no-image.svg" alt="" />
          </div>

          <div>
            <h2 className="font-extrabold text-4xl w-[110%] leading-[5rem]">
              Tools to help you measure your growth
            </h2>
            <p>
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
