import React from "react";
import { Input } from "../Components/Input";
import Question from "../Components/Question";

const PaymentInstruction = ({
  momoName,
  setMomoName,
  momoNumber,
  setMomoNumber,
  momoTransactionID,
  setMomoTransactionID,
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
        value={momoName}
      />

      <Input
        class_name="input "
        placeholder="Momo Number"
        action={(e) => setMomoNumber(e.target.value)}
        value={momoNumber}
      />

      <Input
        class_name="input "
        placeholder="Transaction ID"
        action={(e) => setMomoTransactionID(e.target.value)}
        value={momoTransactionID}
      />
    </div>
  );
};

export default PaymentInstruction;
