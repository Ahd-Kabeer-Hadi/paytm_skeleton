import { FC } from "react";

interface BalanceProp {
  value: string;
}
const Balance: FC<BalanceProp> = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">
        Rs {(parseInt(value) / 100).toFixed(2)} /-
      </div>
    </div>
  );
};

export default Balance;
