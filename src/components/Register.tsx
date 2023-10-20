// components/RegisterForm.js
"use client"
import { useRouter } from 'next/navigation';

import React, { useState, ChangeEvent, FormEvent } from 'react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const[error,setError] = useState("");
  const[succes,setSucces] = useState("");
  const router = useRouter(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        //console.log(data.token)
        setSucces("done");
        setError("");
         
         router.push('/dashboard') 
        } else {
            const errorData = await response.json();
            console.log(errorData.message, typeof errorData.message );
            if (errorData.message === 'Invalid username, this username already has been used') {
              setSucces("");
              setError("Username already in use");
            } else if (errorData.message === 'Invalid email, this email already has been used') {
              setSucces("");
              setError("Email already in use");
            } else {
              setSucces("");
              setError('Registration failed for other reasons, please try again or try later');
            }
            
    }} catch (error) {
      console.error('Error al enviar la solicitud de registro', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
     <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-6">Registro</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
        {error.length > 3 
        ? <p className="text-red-600 text-sm mt-2 text-center">{error}</p> 
        : ( succes === "done" ? <p className="text-green-600 text-sm mt-3 text-center">"please wait your are being redirecting"</p>
        : <p className="text-dark-600 text-sm mt-3 text-center">please complete de form</p>
        )

        }
      </form>
    </div> 
    
    
  );
};

export default RegisterForm;
