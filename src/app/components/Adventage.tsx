const Adventage = (props: { text: string }) => {
  return (
    <div className="mb-4">
      <img src="./check-circle.png" alt="" className="inline mr-3" />{" "}
      <p className="inline">{props.text}</p>
    </div>
  );
};

export default Adventage;
