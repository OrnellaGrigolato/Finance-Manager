import Image from "next/image";
const Adventage = (props: { text: string }) => {
  return (
    <div className="mb-4">
      <Image
        src="/check-circle.png"
        alt=""
        className="inline mr-3"
        width={20}
        height={20}
      />
      <p className="inline">{props.text}</p>
    </div>
  );
};

export default Adventage;
