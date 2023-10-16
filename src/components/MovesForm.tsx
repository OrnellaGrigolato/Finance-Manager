"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

const MovesForm = () => {
  const router = useRouter();
  const [curr, setCurr] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    income_amount: 0,
    discount_amount: 0 /* 
    movement_date: '', */,
    user_id: 4, // Aca va el id del usuario logeado
    currency_id: 1, // Aca va el id del currency seleccionado
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
       await fetch("http://localhost:3000/api/currency")
          .then((response) => response.json())
          .then((data) => {
            console.log(data.result);
            setCurr(data.result);
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
  },[]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/moves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        console.error("Error al crear el movimiento.");
      }
    } catch (error) {
      console.error("Error al crear el movimiento:", error);
    }
  };

  const handleChange = (e: any /* ChangeEvent<HTMLInputElement> */) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="income_amount" className="block font-bold">
          Income Amount
        </label>
        <input
          type="number"
          id="income_amount"
          name="income_amount"
          value={formData.income_amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="discount_amount" className="block font-bold">
          Discount Amount
        </label>
        <input
          type="number"
          id="discount_amount"
          name="discount_amount"
          value={formData.discount_amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* <div className="mb-4">
        <label htmlFor="movement_date" className="block font-bold">Movement Date</label>
        <input
          type="date"
          id="movement_date"
          name="movement_date"
          value={formData.movement_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div> */}
      <div className="mb-4">
        <label htmlFor="currency_id" className="block font-bold">
          Currency
        </label>
        <select
          id="currency_id"
          name="currency_id"
          value={formData.currency_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="1">ARG</option>
          <option value="2">USD</option>
          {/* AGREGAMOS LAS OPCIONES SEGUN LAS CREEMOS */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="currency_id" className="block font-bold">Currency</label>
        <select
          id="currency_id"
          name="currency_id"
          value={formData.currency_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {
            curr?.map((e) => <option value={e.id}>{e.name}</option>)
          }
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Move
      </button>
    </form>
  );
};

export default MovesForm;
