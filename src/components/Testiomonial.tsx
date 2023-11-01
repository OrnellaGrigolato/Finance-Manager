const Testiomonial = () => {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="w-10/12 mx-auto  flex items-center flex-col">
        <img src="./quotes.png" alt="" className="w-12" />
        <p className="w-6/12 font-semibold text-lg text-center mt-6 max-sm:w-full">
          &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur eligendi cupiditate quibusdam. Perferendis, expedita quo.
          Sapiente, quos dolore? Culpa nobis in error sed itaque ullam quisquam!
          Doloremque, veniam rem? Dolores?&quot;
        </p>
        <div className="mt-5">
          <img src="./testimonial-face.png" alt="" className="inline" />{" "}
          <p className="inline">
            <b>Micheal Gough </b>/ CEO of Google
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testiomonial;
