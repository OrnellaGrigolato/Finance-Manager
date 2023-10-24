"use client";

import { useApiData } from "@/app/providers/Providers";
import { ApiResponse, Movement } from "@/app/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, useCallback } from "react";

const MovesForm = () => {
  const router = useRouter();
  const action = useSearchParams().get("action");
  const [curr, setCurr] = useState<{ id_currency: number; name: string }[]>();
  const [allCurrencies, setAllCurrencies] = useState<string[]>();
  const apiData = useApiData();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<ApiResponse>(apiData);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    income_amount: number;
    discount_amount: number;
    user_id: number; // Aca va el id del usuario logeado
    currency_id: string | number;
  }>({
    title: "",
    description: "",
    income_amount: 0,
    discount_amount: 0,
    user_id: userInfo.finder.id, // Aca va el id del usuario logeado
    currency_id: "", // Aca va el id del currency seleccionado
  });
  const [userCurrencies, setUserCurrencies] = useState<number[]>([]);
  const [moves, setMoves] = useState<Movement[]>([]);
  const [currNames, setCurrNames] = useState<string[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_APIKEY;
  useEffect(() => {
    setUserInfo(apiData);
  }, [apiData]);

  const getMoves = useCallback(() => {
    fetch(`/api/moves/user/${userInfo.finder.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMoves(data.finder);
      })

      .catch((error) => {
        console.error("Error en la solicitud Fetch:", error);
      });
  }, [userInfo.finder.id]);

  useEffect(() => {
    if (action === "deposit") {
      fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
        .then((response) => response.json())
        .then((data) => {
          setAllCurrencies(Object.keys(data.conversion_rates));
        })
        .catch((error) => {
          console.log(error);
        });
      fetch("/api/currency")
        .then((response) => response.json())
        .then((data) => {
          setCurr(data.result);
        })
        .catch((error) => console.error(error));
    } else {
      fetch("/api/currency")
        .then((response) => response.json())
        .then((data) => {
          setCurr(data.result);
        })
        .catch((error) => console.error(error));
      getMoves();
    }
  }, [action, apiKey, getMoves]);

  const getUserCurrencies = useCallback(() => {
    let currenciesIds: number[] = [];

    moves.map((e) => {
      if (!currenciesIds.includes(e.currency_id)) {
        currenciesIds.push(e.currency_id);
      }
    });
    setUserCurrencies(currenciesIds);

    currenciesIds.map(async (e) => {
      try {
        const response = await fetch(`/api/currency/${e}`);

        if (response.ok) {
          const data = await response.json();
          setCurrNames((prev) => [...prev, data.result.name]);
        }
      } catch (error) {
        console.error("Error al crear el movimiento:", error);
      }
    });
  }, []);
  useEffect(() => {
    getUserCurrencies();
  }, [moves, getUserCurrencies]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (action === "deposit" && curr) {
      let count = 0;
      for (let i = 0; i <= curr?.length - 1; i++) {
        //If the currency is not in our database, add it
        curr[i].name === formData.currency_id ? count++ : "";
      }

      if (count === 0) {
        await fetch("api/currency", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.currency_id }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((e) => {
            console.log(e);
          });
      }

      try {
        const response1 = await fetch(
          `/api/currency/name/${formData.currency_id}`
        );
        const data1 = await response1.json();

        const updatedFormData = {
          ...formData,
          currency_id: data1.result.id_currency,
        };

        const response2 = await fetch("/api/moves", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        const data2 = await response2.json();

        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("/api/moves", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            currency_id: Number(formData.currency_id),
          }),
        });

        if (response.ok) {
          router.push("/dashboard");
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        console.error("Error al crear el movimiento:", error);
      }
    }
  };

  const handleChange = (e: any /* ChangeEvent<HTMLInputElement> */) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return action ? (
    <div className="w-7/12 mx-auto mt-20">
      <h1 className="font-bold my-10 text-2xl text-center w-full ">
        {userInfo.finder.username.split(" ")[0]}, you are going to {action}!
      </h1>
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
        {action === "deposit" ? (
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
        ) : (
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
        )}
        <div className="mb-4">
          <label htmlFor="currency_id" className="block font-bold">
            Currency
          </label>
          <select
            id="currency_id"
            name="currency_id"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option selected={true} disabled={true}>
              Select currency
            </option>
            {action === "deposit"
              ? allCurrencies?.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))
              : currNames?.slice(0, currNames.length / 2).map((e, k) => (
                  <option key={k} value={e}>
                    {e}
                  </option>
                ))}
          </select>
        </div>
        <p className="text-red-500 text-center">{error}</p>
        <button
          type="submit"
          className="bg-gradient-to-b from-primary to-[#391EDC] w-full rounded-[20px] text-white font-bold p-5 mt-10 shadow-blackShadow max-sm:m0b-6"
        >
          {action[0].toUpperCase() + action.slice(1, action.length)}
        </button>
      </form>
    </div>
  ) : (
    router.push("/dashboard")
  );
};

export default MovesForm;
