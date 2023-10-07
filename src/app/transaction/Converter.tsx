import React, { useState, useEffect, ChangeEvent } from "react";
import Country_list from "./data/CountryList";
import Image from "next/image";

function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [baseCurrency, setBaseCurrency] = useState("ARS");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionResult, setConversionResult] = useState<number>(0);
  const [currencies, setCurrencies] = useState<string[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_APIKEY;

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  }, [baseCurrency, targetCurrency]);

  const handleIputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleCurrencySwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);

    // Recalculate the conversion result after swapping currencies
    setConversionResult(conversionResult / conversionRate);
    setConversionRate(1 / conversionRate);
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
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <img
              src={`https://flagsapi.com/${getFlagByKey(
                baseCurrency
              )}/flat/64.png`}
              alt="countryFlag"
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
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="ml-2 bg-bg rounded-md p-1 mb-1"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <img
              src={`https://flagsapi.com/${getFlagByKey(
                targetCurrency
              )}/flat/64.png`}
              alt="countryFlag"
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
      <button
        onClick={() => alert("Imaginate que tus monedas se cambiaron")}
        className="bg-gradient-to-b from-primary to-[#391EDC] w-full rounded-[20px] text-white font-bold p-5 mt-10 shadow-blackShadow max-sm:m0b-6"
      >
        Exchange
      </button>
    </div>
  );
}

export default CurrencyConverter;
