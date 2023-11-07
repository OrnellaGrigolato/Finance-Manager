"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { checkCurrencyQuantity } from "./useCheckCurrencyQuantity";
import Country_list from "./data/CountryList";
import Image from "next/image";
import { useApiData } from "../providers/Providers";
import { useRouter } from "next/navigation";
import { Movement } from "../types/type";

function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [baseCurrency, setBaseCurrency] = useState("ARS");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionResult, setConversionResult] = useState<number>(0);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [moves, setMoves] = useState<Movement[]>([]);
  const [userCurrencies, setUserCurrencies] = useState<number[]>();
  const [currNames, setCurrNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_APIKEY;
  const userId = useApiData();

  const router = useRouter();

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiKey]);

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        setConversionRate(data.conversion_rate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseCurrency, targetCurrency, apiKey]);

  useEffect(() => {
    getMoves();
  }, []);

  const getMoves = () => {
    fetch(`/api/moves/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setMoves(data.finder);
      })

      .catch((error) => {
        console.error("Error en la solicitud Fetch:", error);
      });
  };

  const getUserCurrencies = () => {
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
  };

  useEffect(() => {
    getUserCurrencies();
  }, [moves]);
  const handleIputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleCurrencySwap = () => {
    setErrorMessage("");
    if (currNames.includes(targetCurrency)) {
      const temp = baseCurrency;
      setBaseCurrency(targetCurrency);
      setTargetCurrency(temp);

      // Recalculate the conversion result after swapping currencies
      setConversionResult(conversionResult / conversionRate);
      setConversionRate(1 / conversionRate);
    } else {
      setErrorMessage(`You don't have any ${targetCurrency} to exchange`);
    }
  };

  const handleConvert = async () => {
    setErrorMessage("");
    let result = await checkCurrencyQuantity(moves, amount, baseCurrency);

    if (result) {
      try {
        setIsConverting(true);
        const response1 = await fetch(`/api/currency/name/${targetCurrency}`);
        const data1 = await response1.json();

        const response2 = await fetch("/api/moves", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Convert",
            description: "-",
            income_amount: (amount * conversionRate).toFixed(2),
            discount_amount: "0",
            user_id: userId,
            currency_id: data1.result.id_currency,
            DorO_id: 0,
          }),
        });

        const data2 = await response2.json();

        const response3 = await fetch(`/api/currency/name/${baseCurrency}`);
        const data3 = await response3.json();

        const response4 = await fetch("/api/moves", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Convert",
            description: "-",
            income_amount: "0",
            discount_amount: amount,
            user_id: userId,
            currency_id: data3.result.id_currency,
            DorO_id: 0,
          }),
        });
        setIsConverting(false);
        router.push("/dashboard");
      } catch (e) {
        console.error("Convertion had failed: " + e);
      }
    } else {
      setErrorMessage(
        `You do not have enough ${baseCurrency} to make the transaction. Reduce the amount and try again`
      );
    }
  };

  const getFlagByKey = (key: any) => {
    return Country_list[key];
  };

  return (
    <div>
      <div className="bg-card-bg rounded-3xl p-10 shadow-blackShadow h-[50vh] max-sm:h-fit">
        <div className="flex flex-col gap-2 ">
          <label className="text-sm">You Pay:</label>
          <input
            className="bg-card-bg border-b-2 w-40 border-primary font-bold"
            type="number"
            value={amount != 0 ? amount : ""}
            onChange={(e) => handleIputChange(e)}
            autoFocus
          />
        </div>
        <div className="flex justify-between items-center mt-12 max-sm:flex-col max-sm:gap-6">
          <div className="max-sm:flex max-sm:items-center max-sm:flex-col max-sm:gap-2">
            <label>From:</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="ml-2 bg-bg rounded-md p-1 mb-1"
            >
              {currNames?.slice(0, currNames.length / 2).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <Image
              src={`https://flagsapi.com/${getFlagByKey(
                baseCurrency
              )}/flat/64.png`}
              alt="countryFlag"
              width={70}
              height={50}
            />
          </div>
          <div>
            <Image
              src="/swap.png"
              width={40}
              height={40}
              alt="Exchange icon"
              onClick={handleCurrencySwap}
              className="cursor-pointer rotate-90 max-sm:rotate-0"
            />
          </div>
          <div className="max-sm:flex max-sm:items-center max-sm:flex-col max-sm:gap-2">
            <label>To:</label>
            <select
              value={targetCurrency}
              onChange={(e) => {
                setTargetCurrency(e.target.value);
                setErrorMessage("");
              }}
              className="ml-2 bg-bg rounded-md p-1 mb-1"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <Image
              src={`https://flagsapi.com/${getFlagByKey(
                targetCurrency
              )}/flat/64.png`}
              alt="countryFlag"
              width={70}
              height={50}
            />
          </div>
        </div>

        <div className="w-full text-center mt-12 max-sm:mt-4">
          <p className="mb-2">
            Conversion Rate: {baseCurrency}/{targetCurrency} ={" "}
            {conversionRate.toFixed(4)}
          </p>
          <p>
            Result: {amount} {baseCurrency} ={" "}
            {(amount * conversionRate).toFixed(2)} {targetCurrency}
          </p>
        </div>
      </div>
      <div className="font-extrabold text-red-500 mt-6 -mb-6 text-center w-full">
        {errorMessage}
      </div>
      <button
        onClick={() => handleConvert()}
        className="bg-gradient-to-b from-primary to-[#391EDC] w-full rounded-[20px] text-white font-bold p-5 mt-10 shadow-blackShadow max-sm:m0b-6"
      >
        {isConverting ? "Exchanging..." : "Exchange"}
      </button>
    </div>
  );
}

export default CurrencyConverter;
