// components/RegisterForm.js
"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

type FormData = {
  email: string;
};

const ChangePasswordPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data1: FormData) => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      });

      const data = await response.json();
      

      if (data.message === "Success sending email to change password") {
        setSuccess("done");
        setError("");
        setLoading(false);
      } else {
        setLoading(false);

       

        if (data.status === 404) {
          setError("Incorrect email, User not found");
        } else {
          setError("Error 500, server is down, try again or try later");
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud cambio password", error);
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
          className="brightness-[0.8] w-full h-full absolute top-0 left-0 -z-10 max-sm:background-size max-sm:object-left-top"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-xs:min-w-0 bg-white p-[32px] bg-opacity-70 rounded-[20px]"
        >
          <div className="min-w-[257px]">
            <h2 className="text-3xl mb-6 font-bold text-center">
              Provide us your email
            </h2>

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

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-[17px] px-7 py-3 text-base bg-black text-white rounded-[40px] block w-full"
              >
                {loading ? "Loading..." : "Change password"}
              </button>
            </div>
            {error.length > 0 ? (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            ) : success === "done" ? (
              <p className="text-green-600 text-sm mt-3 text-center">
                Success! Check your email, dont forget to check under spam
                section
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

export default ChangePasswordPage;
