"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [attemps, setAttemps] = useState(0);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        //console.log("Response is okay, redirecting to dashboard");
        router.push("/dashboard");
      } else {
        //console.log("Response is not okay, status code:", response.status);
        const errorData = await response.json();
        if (errorData.message === "User is blocked") {
          alert("The account is blocked, please reset your password");
        } else {
          alert(errorData.message);
        }
        console.error(errorData.message);
        setLoading(false);
        setAttemps((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de inicio de sesión", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlock = async (email: string) => {
    //e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch("/api/users/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      // if (response.ok) {
      //   // Handle success
      //   console.log("Email blocked successfully");
      // } else {
      //   // Handle errors
      //   console.error("Email block failed");
      // }
    } catch (error) {
      console.error("An error occurred while sending the email block", error);
    }
  };

  const handlePasswordReset = async (email: string) => {
    //e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      // if (response.ok) {
      //   // Handle success
      //   console.log("Email password reset send successfully");
      // } else {
      //   // Handle errors
      //   console.error("Email password reset send failed");
      // }
    } catch (error) {
      console.error(
        "An error occurred while sending the Email password reset",
        error
      );
    }
  };

  if (attemps === 4) {
    //Logica para mandar email al usuario y desbloquear su cuenta.
    window.alert(
      "Your account has been blocked, we will send you an email so you can recover it."
    );
    setAttemps(0);

    handleBlock(formData.email);

    handlePasswordReset(formData.email);

    //sendEmail_reset_password(formData.email)

    router.push("/");
  }
  return (
    <main className="h-[100vh]">
      <div className="h-full w-full relative flex justify-center items-center ">
        <Image
          fill={true}
          src="/login-bg.jpg"
          priority={true}
          alt=""
          className="brightness-[0.8] w-full h-full absolute top-0 left-0 -z-10 max-sm:object-cover max-sm:object-left-top"
        />
        <div className="bg-white p-[32px] bg-opacity-70 rounded-[20px]">
          <div className="w-[337px] max-sm:w-auto min-w-[257px] max-xs:min-w-0">
            <h1 className="text-3xl font-bold text-center w-auto">
              Welcome Back!
            </h1>
            <p className="text-center mt-2 mb-6 text-sm w-auto">
              Please login to access your account.
            </p>
            <form className=" mx-auto" onSubmit={handleSubmit}>
              <label
                className="pb-[8px] text-gray-700 font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
              />
              <label
                className="pb-[8px] text-gray-700 font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              {attemps === 3 ? (
                <p className="text-center text-red-500 font-bold -mb-5 w-auto">
                  You have failed 3 times already, for security reasons if you
                  fail again, we will block your account.
                </p>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="px-7 py-3 text-base mt-[58px] bg-black text-white rounded-[40px] block w-full "
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </form>
            <p className="text-center mt-3 text-sm w-auto">
              <Link href="/reset-password" className="text-primary">
                Forgot your password?
              </Link>
            </p>
            <p className="text-center mt-3 text-sm w-auto">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
