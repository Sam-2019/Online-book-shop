import React from "react";
import { Input } from "../Components/Input";
import Question from "../Components/Question";

const PaymentInstruction = ({
  momo_name,
  setMomoName,
  momo_number,
  setMomoNumber,
  transaction_id,
  setTransactionID,
  setState,
}) => {
  return (
    <div className="payment-instruction">
      <div className="pay-know-how ">
        <div className="page_title ">How To Pay With Momo</div>
        <Question
          width={30}
          height={30}
          action={() => {
            setState(true);
          }}
        />
      </div>
      <Input
        class_name="input "
        placeholder="Name"
        action={(e) => setMomoName(e.target.value)}
        value={momo_name}
      />

      <Input
        class_name="input "
        placeholder="Momo Number"
        action={(e) => setMomoNumber(e.target.value)}
        value={momo_number}
      />

      <Input
        class_name="input "
        placeholder="Transaction ID"
        action={(e) => setTransactionID(e.target.value)}
        value={transaction_id}
      />
    </div>
  );
};

export default PaymentInstruction;
