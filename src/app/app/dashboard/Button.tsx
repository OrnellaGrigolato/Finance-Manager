function Button(props: { text: string; img: string; style: string }) {
  return (
    <div
      className={
        "w-36 bg-black text-white flex gap-4 rounded-[40px] p-3 justify-center shadow-blackShadow" +
        props.style
      }
    >
      <img src={props.img} alt="" />
      <p>{props.text}</p>
    </div>
  );
}

export default Button;
