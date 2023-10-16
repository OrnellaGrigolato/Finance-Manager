import React from "react";

// ConversionResult component takes in props: baseCurrency, targetCurrency, conversionRate, conversionResult, and amount
function ConversionResult({
  baseCurrency,
  targetCurrency,
  conversionRate,
}: {
  baseCurrency: string;
  targetCurrency: string;
  conversionRate: number;
}) {
  return (
    <div className="exchange-rate">
      <p>
        Conversion Rate ({baseCurrency}/{targetCurrency}):{" "}
        <b>{conversionRate.toFixed(4)}</b>
      </p>
    </div>
  );
}

export default ConversionResult;
