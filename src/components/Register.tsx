// components/RegisterForm.js
"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must contain at least one letter, one number, and one special character"),
  cpassword: yup.string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match")
});


type FormData = {
  username: string;
  email: string;
  password: string;
  cpassword:string;
};

const RegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      cpassword: ''}
  });

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const router = useRouter(); 


  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccess('done');
        setError('');
        router.push('/dashboard') 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed for other reasons, please try again or try later');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de registro', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-sky-50 to-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-6 text-cyan-900 font-bold text-center">Sign up!</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="shadow appearance-none border border-neutral-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            <p className="text-red-600 text-sm mt-2">{errors.username?.message}</p>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  className="shadow appearance-none border border-neutral-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            <p className="text-red-600 text-sm mt-2">{errors.email?.message}</p>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="shadow appearance-none border border-neutral-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            <p className="text-red-600 text-sm mt-2">{errors.password?.message}</p>
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm password:
            <Controller
              name="cpassword"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="shadow appearance-none border border-neutral-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            <p className="text-red-600 text-sm mt-2">{errors.cpassword?.message}</p>
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus-outline-none focus-shadow-outline"
          >
            Register
          </button>
        </div>
        {error.length > 0 ? (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        ) : success === 'done' ? (
          <p className="text-green-600 text-sm mt-3 text-center">Please wait, you are being redirected</p>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
