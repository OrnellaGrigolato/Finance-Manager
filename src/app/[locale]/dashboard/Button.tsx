import Image from "next/image";

function Button(props: {
  text: "Deposit" | "Withdraw";
  img: string;
  availableMoney: number;
}) {
  return (
    <div
      className={
        props.text === "Withdraw" && props.availableMoney === 0
          ? "cursor-not-allowed opacity-60 w-36 bg-black text-white  flex gap-4 rounded-[40px] p-3 justify-center shadow-blackShadow"
          : "w-36 bg-black text-white flex gap-4 rounded-[40px] p-3 justify-center shadow-blackShadow"
      }
    >
      <Image src={props.img} alt="" width={22} height={22} />
      <p>{props.text}</p>
    </div>
  );
}

export default Button;
