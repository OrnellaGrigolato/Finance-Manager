const Stadistic = (props: { img: string; title: string; text: string }) => {
  return (
    <div>
      <img src={props.img} alt="" />
      <h3 className="font-extrabold text-2xl my-2">{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
};

export default Stadistic;
