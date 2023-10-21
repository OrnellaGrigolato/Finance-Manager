"use client";

import Cookies from "js-cookie";
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
        const data = await response.json();

        // Redireccionar al usuario a la página deseada después del inicio de sesión.
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
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

  if (attemps === 4) {
    //Logica para mandar email al usuario y desbloquear su cuenta.
    window.alert(
      "Your account has been blocked, we will send you an email so you can recover it."
    );
    setAttemps(0);
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
          className="w-full h-full absolute top-0 left-0 -z-10 max-sm:object-cover max-sm:object-left-top"
        />
        <div className="w-3/12 bg-white px-20 py-14 bg-opacity-70 rounded-[20px] max-sm:w-11/12 max-sm:bg-opacity-80">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="mt-2 mb-6 text-sm">
            Please login to access your account
          </p>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@gmail.com"
            />
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            {attemps === 3 ? (
              <p className="text-red-500 font-bold -mb-5">
                You have already failed 3 times, for security reasons, if you
                fail again, we will block the account.
              </p>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="px-7 py-3 text-base mt-8 bg-black text-white rounded-[40px] block w-full"
            >
              {loading ? "Cargando..." : "Log In"}
            </button>
          </form>
          <p className="mt-3 text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
