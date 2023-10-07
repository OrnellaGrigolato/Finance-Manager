import React from "react";

// AmountInput component takes in `amount` and `setAmount` as props
function AmountInput({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </div>
  );
}

export default AmountInput;
