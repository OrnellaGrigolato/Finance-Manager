const WalletCard = (props: {
  currencyName: string;
  currencySymbol: string;
  country?: string;
  balance: string;
}) => {
  return (
    <div className="p-5 rounded-[15px] bg-gray-300 shadow-blackShadow w-1/2">
      <img src="" alt="" />
      <div>
        <b>{props.currencySymbol}</b>
        <p className="text-xs">{props.currencyName}</p>
      </div>
      <p className="mt-4 font-bold">$ {props.balance}</p>
    </div>
  );
};

export default WalletCard;
