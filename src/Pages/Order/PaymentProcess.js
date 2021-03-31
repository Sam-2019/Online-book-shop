import React from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";

const PaymentProcess = ({ buttonAction }) => {
  return (
    <>
      <ol className="">
        <li>Dial *170# on your phone</li>
        <li>Select MoMoPay &amp; PayBill</li>
        <li>Select MoMoPay</li>
        <li>
          Enter <strong>283051 </strong> as the Merchant ID
        </li>
        <li>Enter Reference</li>
        <li>Enter Your Pin to confirm payment</li>
      </ol>

      <div className="other-info">
        Upon successful payment, please use the details of the payment to fill
        the fields below
      </div>

      {/* <Button class_name="primary" name="Okay" /> */}
      <div className="popup-action">
        <Button class_name="primary" name="Close" action={buttonAction} />
      </div>
    </>
  );
};

export default PaymentProcess;

PaymentProcess.propTypes = {
  buttonAction: PropTypes.func,
};
