// components/RegisterForm.js
"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

type FormData = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

const RegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        //console.log(data.token)
        setSuccess("done");
        setError("");

        router.push("/dashboard");
      } else {
        setLoading(false);
        const errorData = await response.json();
        if (
          errorData.message ===
          "Invalid username, this username has already been used"
        ) {
          setSuccess("");
          setError("Username already in use");
        } else if (
          errorData.message ===
          "Invalid email, this email has already been used"
        ) {
          setSuccess("");
          setError("Email already in use");
        } else {
          setSuccess("");
          setError(
            "Registration failed for other reasons, please try again or try later"
          );
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de registro", error);
    }
  };

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-xs:min-w-0 bg-white p-[32px] bg-opacity-70 rounded-[20px]"
        >
          <div className="min-w-[257px]">
            <h1 className="text-3xl font-bold text-center w-auto">Sign Up!</h1>
            <p className="text-center mt-2 mb-6 text-sm w-auto">
              Please fill in the following form to sign up.
            </p>
            <h2 className="text-3xl mb-6 font-bold text-center"></h2>
            <div className="mb-4">
              <p className="text-gray-700 font-bold">Full name:</p>
              <label className="block text-gray-700 text-sm mb-2">
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.username?.message}
                </p>
              </label>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-bold">Email:</p>
              <label className="block text-gray-700 text-sm mb-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.email?.message}
                </p>
              </label>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-bold">Password:</p>
              <label className="block text-gray-700 text-sm mb-2">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.password?.message}
                </p>
              </label>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 font-bold ">Confirm password:</p>
              <label className="block text-gray-700 text-sm mb-2">
                <Controller
                  name="cpassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.cpassword?.message}
                </p>
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-[17px] px-7 py-3 text-base bg-black text-white rounded-[40px] block w-full"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
            {error.length > 0 ? (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            ) : success === "done" ? (
              <p className="text-green-600 text-sm mt-3 text-center">
                Please wait, you are being redirected
              </p>
            ) : (
              <p></p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
