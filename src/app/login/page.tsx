"use client"

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(Cookies.get("token"));
        router.push("/dashboard")

      } else {
        const errorData = await response.json();
        alert(errorData.message);
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de inicio de sesión', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="h-[100vh]">
      <div className="h-full w-full relative flex justify-center items-center">
        <img
          src="/login-bg.jpg"
          alt=""
          className="w-full h-full absolute top-0 left-0 -z-10"
        />
        <div className="w-3/12 bg-white px-20 py-14 bg-opacity-70 rounded-[20px]">
          <h1 className="text-3xl font-extrabold">Welcome Back!</h1>
          <p className="mt-2 mb-6">Please login to access your account</p>
          <form onSubmit={handleSubmit}>
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              className="block mb-4 p-2 rounded-[30px] bg-[#fafafa]"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@gmail.com"
            />
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              className="block mb-4 p-2 rounded-[30px] bg-[#f5f5f5]"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <p className="text-primary -mt-3">Forgot Password?</p>
            <button
              type="submit"
              className="px-7 py-3 text-base mt-8 bg-black text-white rounded-[40px] block"
            >
              Log In
            </button>
          </form>
          <p>
            Don't have an account?{' '}
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
