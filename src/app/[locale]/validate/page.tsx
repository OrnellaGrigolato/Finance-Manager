import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const VerificationSuccess = () => {


    return (

        <div>
            <Navbar />
            <div className="flex w-10/12 mx-auto h-[90vh] items-center justify-center gap-32 max-sm:flex-col">
                <div>
                    <h1 className="font-bold text-5xl leading-tight mb-4">
                        Congratulations, your account has been verified! ✔️
                    </h1>
                    <p className="text-lg">
                        Thank you for verifying your email.
                    </p>
                    <button className="px-7 py-3 text-lg mt-14 items-center bg-black text-white rounded-[40px]">
                        <Link href="/">Back to home page</Link>
                    </button>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default VerificationSuccess;