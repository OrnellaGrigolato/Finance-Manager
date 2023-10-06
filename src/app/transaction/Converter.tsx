import React, { useState, useEffect } from "react";
import Country_list from "./data/CountryList";
import Image from "next/image";

function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [baseCurrency, setBaseCurrency] = useState("ARS");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionResult, setConversionResult] = useState<number>(0);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fetchingData, setFetchingData] = useState(false);

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

  const handleGetExchange = () => {
    setFetchingData(true);
    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}/${amount}`
    )
      .then((response) =>
        response.json().then((data) => {
          setConversionRate(data.conversion_rate);
          setConversionResult(amount * data.conversion_rate);
          setFetchingData(false);
        })
      )
      .catch((error) => {
        console.log(error);
        setFetchingData(false);
      });
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
      <div className="bg-card-bg rounded-3xl p-10 shadow-blackShadow h-[50vh]">
        <div className="flex flex-col gap-2 ">
          <label className="text-sm">You Pay:</label>
          <input
            className="bg-card-bg border-b-2 w-40 border-primary font-bold"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between items-center mt-12">
          <div>
            <label>From:</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
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
              src="./exchange-icon.svg"
              width={30}
              height={30}
              alt="Exchange icon"
              onClick={handleCurrencySwap}
              className="cursor-pointer"
            />
          </div>
          <div>
            <label>To:</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
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

        {fetchingData ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full text-center mt-12">
            <p>
              Conversion Rate: {baseCurrency}/{targetCurrency} ={" "}
              {conversionRate.toFixed(4)}
            </p>
            <p>
              Result: {amount} {baseCurrency} ={" "}
              {(amount * conversionResult).toFixed(2)} {targetCurrency}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleGetExchange}
        disabled={fetchingData}
        className="bg-gradient-to-b from-primary to-[#391EDC] w-full rounded-[20px] text-white font-bold p-5 mt-10 shadow-blackShadow"
      >
        Get Exchange
      </button>
    </div>
  );
}

export default CurrencyConverter;
