const Stadistic = (props: { img: string; title: string; text: string }) => {
  return (
    <div className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:text-center">
      <img src={props.img} alt="" />
      <h3 className="font-extrabold text-2xl my-2">{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
};

export default Stadistic;
