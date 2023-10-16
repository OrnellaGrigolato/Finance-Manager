import "./loaderStyles.css";
const loading = (props: { isDashboard: boolean }) => {
  return (
    <div
      className={
        props.isDashboard
          ? "loading w-[100vw] mt-[25%] mx-auto flex items-center"
          : "loading mx-auto mt-20"
      }
    ></div>
  );
};

export default loading;
