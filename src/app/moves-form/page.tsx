"use client";
import "./style.css";
import { useApiData } from "@/app/providers/Providers";
import { ApiResponse, Movement } from "@/app/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, useCallback } from "react";
import { getUserDorOs } from "./useGetDorO";
import Image from "next/image";
import Link from "next/link";
import { getNewDorOId, handleNewDorO } from "./useHandleNewDoro";
const MovesForm = () => {
  const router = useRouter();
  const action = useSearchParams().get("action");
  const [curr, setCurr] = useState<{ id_currency: number; name: string }[]>([]);
  const [allCurrencies, setAllCurrencies] = useState<string[]>();
  const [DorO, setDorO] = useState<string[]>([]);
  const [isFormActive, setIsFormActive] = useState(false);
  const [newDorOInput, setNewDorOInput] = useState<string>();
  const apiData = useApiData();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<ApiResponse>({
    id: apiData!,
    username: "",
    email: "",
    password: "",
    login_date: "",
    maxExpenditure: 100000,
    emailVerified: false,
    available_money: "",
    lastmove_amount: "",
    lastmove_date: "",
    isBlocked: false,
  });
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    income_amount: number;
    discount_amount: number;
    user_id: number; // Aca va el id del usuario logeado
    currency_id: string | number;
    DorO: string;
  }>({
    title: "",
    description: "",
    income_amount: 0,
    discount_amount: 0,
    user_id: apiData!, // Aca va el id del usuario logeado
    currency_id: "", // Aca va el id del currency seleccionado,
    DorO: "",
  });
  const [userCurrencies, setUserCurrencies] = useState<number[]>([]);
  const [moves, setMoves] = useState<Movement[]>([]);
  const [currNames, setCurrNames] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_APIKEY;

  const getMoves = () => {
    fetch(`/api/moves/user/${apiData}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setMoves(data.finder);
      })

      .catch((error) => {
        console.error("Error en la solicitud Fetch:", error);
      });
  };

  useEffect(() => {
    fetch(`api/users/${apiData}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data.finder))
      .catch((e) => console.error(e));
  }, [apiData]);

  useEffect(() => {
    getMoves();
  }, [apiData]);

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
    }
  }, [action, apiKey]);

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
  }, [moves]);

  const getDoroOs = useCallback(() => {
    const result = getUserDorOs(moves);

    setDorO(result);
  }, [moves]);

  useEffect(() => {
    getUserCurrencies();
    getDoroOs();
  }, [moves]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    if (errorMessage) {
      window.alert(
        `Solve this error before ${action}: write numbers to no more than two decimal places.`
      );
      setSending(false);
    } else if (!formData.currency_id) {
      setSending(false);
      window.alert(
        `Solve this error before ${action}: please select a currency`
      );
    } else {
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
          const DorOId = await getNewDorOId(
            newDorOInput ? newDorOInput : formData.DorO
          );
          console.log(DorOId);
          const updatedFormData = {
            ...formData,
            currency_id: data1.result.id_currency,
            DorO_id: DorOId,
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
          const response1 = await fetch(
            `/api/currency/name/${formData.currency_id}`
          );
          const data1 = await response1.json();
          console.log(newDorOInput, formData.DorO);
          const DorOId = await getNewDorOId(
            newDorOInput ? newDorOInput : formData.DorO
          );
          console.log(DorOId);
          const updatedFormData = {
            ...formData,
            currency_id: data1.result.id_currency,
            DorO_id: DorOId,
          };

          const response = await fetch("/api/moves", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
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
    }
  };

  const handleChange = (e: any /* ChangeEvent<HTMLInputElement> */) => {
    const { name, value } = e.target;
    if (!Number.isNaN(parseInt(value))) {
      if (
        value.match(/\.\d{3,}/) !== null ||
        value.match(/\,\d{3,}/) !== null
      ) {
        setErrorMessage("Write numbers to no more than two decimal places.");
      } else {
        setErrorMessage("");
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return action ? (
    <div className="w-9/12 mx-auto mt-16">
      <div className="flex items-center gap-20 mb-5 max-sm:gap-8">
        <Link
          href="/dashboard"
          className="rotate-180 p-5 rounded-[25%] bg-black text-white w-10 h-10 flex justify-center items-center shadow-blackShadow"
        >
          ➜
        </Link>
        <h1 className="font-bold my-10 text-2xl max-sm:my-0">
          {userInfo.username.split(" ")[0]}, you are going to {action}!
        </h1>
      </div>
      <div className="flex gap-20  justify-start max-sm:flex-col max-sm:gap-4">
        <Image
          src="/depositIlustration.png"
          alt=""
          width={350}
          height={150}
          className="-ml-4 max-sm:ml-0 "
        />
        <form
          onSubmit={handleSubmit}
          className="w-1/2 max-sm:w-full max-sm:pb-10"
        >
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
              required
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
              required
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
                required
                step="0.01"
                pattern="\d+(\,\d{1,2})?"
              />
              <div className="text-red-400 text-sm mt-1">{errorMessage}</div>
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
                required
                step="0.01"
                pattern="\d+(\,\d{1,2})?"
              />
              <div className="text-red-400 text-sm mt-1">{errorMessage}</div>
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
          <div className="flex justify-between mt-6 max-sm:flex-col">
            <label
              htmlFor="currency_id"
              className=" font-bold items-center flex gap-2"
            >
              {action === "deposit"
                ? "Where did you receive the money?"
                : "From where do you withdraw the money?"}

              <div className="tooltip">
                <Image
                  src={"/info-icon.png"}
                  width={18}
                  height={18}
                  alt="Info Icon"
                />
                <div className="left">
                  <p className="text-sm">
                    Specify here where{" "}
                    {action === "deposit"
                      ? "you deposit your money"
                      : "your money comes from"}{" "}
                    so we can show you an accurate analysis of where your money
                    is located in your &quot;wallet&quot; section. This option
                    is optional, if you don&apos;t complete it we will
                    understand that the movement is done in cash.
                  </p>
                  <i></i>
                </div>
              </div>
            </label>{" "}
            {!isFormActive ? (
              <button
                className="text-primary font-bold text-xs items-center max-sm:text-right max-sm:mt-2"
                onClick={() => {
                  setIsFormActive(!isFormActive);
                }}
              >
                Add new
              </button>
            ) : (
              <div className="flex gap-3 items-center max-sm:justify-end">
                <input
                  type="text"
                  className="w-24 ml-4 border border-black max-sm:ml-0 max-sm:mt-2"
                  onChange={(e) => {
                    setNewDorOInput(e.target.value);
                  }}
                />
                <Image
                  src={"/tick-icon.png"}
                  width={18}
                  height={18}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => {
                    setIsFormActive(!isFormActive);
                    handleNewDorO(newDorOInput ? newDorOInput : "");
                  }}
                />
              </div>
            )}
          </div>
          <select
            name="DorO"
            id="DorO"
            className="w-full mt-2"
            onChange={handleChange}
          >
            <option selected={true} disabled={true}>
              Select {action === "deposit" ? "origin" : "destination"}
            </option>
            <option>It is in cash</option>
            {newDorOInput ? (
              <option value={newDorOInput}>{newDorOInput}</option>
            ) : null}
            {DorO.length === 0
              ? "Loading..."
              : DorO.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}{" "}
          </select>
          <p className="text-red-500 text-center">{error}</p>
          <button
            type="submit"
            className="bg-gradient-to-b from-primary to-[#391EDC] w-full rounded-[20px] text-white font-bold p-5 mt-10 shadow-blackShadow max-sm:m0b-6"
          >
            {sending
              ? "Loading..."
              : action[0].toUpperCase() + action.slice(1, action.length)}
          </button>
        </form>
      </div>
    </div>
  ) : (
    router.push("/dashboard")
  );
};

export default MovesForm;
