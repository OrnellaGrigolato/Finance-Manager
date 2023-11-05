// components/RegisterForm.js
"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from "js-cookie";
import baseUrl from '@/components/BaseUrl';



const schema = yup.object({
 password: yup.string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must contain at least one letter, one number, and one special character"),
  cpassword: yup.string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match")
});


type FormData = {
  password: string;
  cpassword: string;
};

const ChangePasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      cpassword: ''
    }
  });

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token=useParams()

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/users/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        setSuccess("done");
        setError("");
        Cookies.set("token", String(token.token));
        router.push('/dashboard')
      } else {
        setLoading(false);
       
       
          setError('Error unlocking user and changing password');
        }

      
    } catch (error) {
      console.error('Error al enviar la solicitud cambio password', error);
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

        <form onSubmit={handleSubmit(onSubmit)} className="max-xs:min-w-0 bg-white p-[32px] bg-opacity-70 rounded-[20px]">
         <div className='min-w-[257px]'>
          <h2 className="text-3xl mb-6 font-bold text-center">Choose a new password</h2>
          
          <div className="mb-4">
            <p className='text-gray-700 font-bold'>Password:</p>
            <label className="block text-gray-700 text-sm mb-2">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full" />
                )}
              />
              <p className="text-red-600 text-sm mt-2">{errors.password?.message}</p>
            </label>
          </div>
          <div className="mb-6">
            <p className='text-gray-700 font-bold '>Confirm password:</p>
            <label className="block text-gray-700 text-sm mb-2">
              <Controller
                name="cpassword"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full" />
                )}
              />
              <p className="text-red-600 text-sm mt-2">{errors.cpassword?.message}</p>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="mt-[17px] px-7 py-3 text-base bg-black text-white rounded-[40px] block w-full">
              {loading ? "Loading..." : "Change password"}
            </button>
          </div>
          {error.length > 0 ? (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          ) : success === 'done' ? (
            <p className="text-green-600 text-sm mt-3 text-center">Please wait, you are being redirected</p>
          ) : (
            <p></p>
          )}
          </div>
        </form>
      </div>
      
    </main>
  );
};

export default ChangePasswordForm;
