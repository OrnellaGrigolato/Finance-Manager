import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
const ErrorPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-10/12 mx-auto h-[90vh] items-center justify-center gap-32">
        <div>
          <h1 className="font-bold text-5xl leading-tight mb-4">
            We are Sorry, this page was not found
          </h1>
          <p className="text-lg">
            Don't worry, it's not your fault, we are working on this page.
          </p>
          <button className="px-7 py-3 text-lg mt-14 bg-black text-white rounded-[40px]">
            <Link href="/">Back to home page</Link>
          </button>
        </div>
        <img className="w-[35rem]" src="./error-page-img.png" alt="" />
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
