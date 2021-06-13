import React, { Fragment } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import PopUp from "../Components/Popup";
import Question from "../Components/Question";
import Success from "../Components/Success";
import { MediaQuery } from "../helper";
import { ADD_PAYMENT } from "../graphQL functions";
import { useData } from "../Context";
import PaymentInstruction from "./PaymentInstruction";

import "./order.css";
import PaymentProcess from "./PaymentProcess";

const Order = () => {
  let breakpoint = 540;
  let history = useHistory();

  const { width } = MediaQuery();
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [state, setState] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [value, setValue] = React.useState("Pick your location");
  const fee = 10;

  const [location, setLocation] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState("");

  const [momo_name, setMomoName] = React.useState("");
  const [momo_number, setMomoNumber] = React.useState("");
  const [transaction_id, setTransactionID] = React.useState("");

  let show;

  const showSuccess = () => {
    setSuccess(true);

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  let selectedOption = null;
  let viewType;

  switch (paymentMethod) {
    case "Cash":
      selectedOption = "cash";
      viewType = "oneForm";
      break;
    case "Momo":
      selectedOption = "momo";
      viewType = "twoForms";
      break;
    default:
      selectedOption = "cash";
      viewType = "oneForm";
  }

  switch (value) {
    case "Pick your location":
      show = "";
      break;
    default:
      show = "(Shipping inclusive)";
  }

  const [
    addPayment,
    { loading: paymentrLoading, error: paymentError, data: paymentData },
  ] = useMutation(ADD_PAYMENT);

  function orderItem() {
    // setSuccess(true);

    console.log(location, address, phone_number);

    const orderValue = localStorage.getItem("orderValue");

    addPayment({
      variables: {
        method: String(selectedOption),
        status: String("pending"),

        location,
        address,
        phone_number,

        momo_name,
        momo_number,
        momo_transaction_id: transaction_id,
        order_value: String(orderValue),
      },
    });
  }

  return (
    <div className="order-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Order</div>
        </div>
      </div>

      {state && (
        <PopUp close={() => setState(false)}>
          <PaymentProcess buttonAction={() => setState(false)} />
        </PopUp>
      )}

      <div className="main">
        <form
          className={`
         ${viewType === "oneForm" ? "oneForm " : "twoForms "}`}
        >
          <div
            className={`
         ${
           viewType === "oneForm" ? "order-shipping " : "order-shipping1  "
         }  outline margin-top 
        `}
          >
            <div className="page_title"> Shipping Information</div>

            <select name="locations" id="select" className="input">
              <option value="tema">Tema</option>
              <option value="accra">Accra</option>
              <option value="kumasi">Kumasi</option>
              <option value="bolga">Bolga</option>
            </select>

            <Input
              class_name="input "
              placeholder="Location"
              action={(e) => setLocation(e.target.value)}
              value={location}
            />

            <Input
              class_name="input "
              placeholder="Digital Address"
              action={(e) => setAddress(e.target.value)}
              value={address}
            />

            <Input
              class_name="input "
              placeholder="Phone Number"
              action={(e) => setPhoneNumber(e.target.value)}
              value={phone_number}
            />

            <div className="page_title">Payment</div>
            <div className="payment-method ">
              <div
                className={selectedOption === "cash" ? "cash" : "select"}
                onClick={() => {
                  setPaymentMethod("Cash");
                }}
              >
                Cash
              </div>
              <div
                className={selectedOption === "momo" ? "momo" : "select"}
                onClick={() => {
                  setPaymentMethod("Momo");
                }}
              >
                Momo
              </div>
            </div>

            {width > breakpoint ? null : (
              <div>
                {selectedOption === "momo" && (
                  <div className="payment-instruction ">
                    <div className="pay-know-how  ">
                      <div className="page_title2  ">How To Pay With Momo</div>
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
                )}
              </div>
            )}
          </div>

          {width > breakpoint && (
            <Fragment>
              {selectedOption === "momo" && (
                <div
                  className={`
                   ${
                     viewType === "oneForm"
                       ? "order-payment "
                       : "order-payment1  "
                   } outline  margin-top 
                  `}
                >
                  <PaymentInstruction
                    momo_name={momo_name}
                    setMomoName={setMomoName}
                    momo_number={momo_number}
                    setMomoNumber={setMomoNumber}
                    transaction_id={transaction_id}
                    setTransactionID={setTransactionID}
                    setState={setState}
                  />
                </div>
              )}
            </Fragment>
          )}
        </form>
      </div>

      <Summary>
        <div className="amountXshipping">
          <div className={show ? "amount2" : "amount1"}>
            Total: ${Intl.NumberFormat().format(100)}
          </div>
          <div className="shipping">(Shipping ${fee})</div>
        </div>

        <Button
          class_name="checkout"
          name={`Order  (100)`}
          action={orderItem}
        />
      </Summary>

      {success && (
        <PopUp>
          <Success />
          <div className="order-success">
            <div></div> Thank you for shopping with us! Your order{" "}
            <span className="orderID">11111111111</span> has been placed,
            pending confirmation. We will call you within 24 hours (calling
            hours: Mon-Fri 8:30am-5:30pm) to confirm your order . Once the order
            is confirmed, you will not be able to change your order details (e.g
            recipient, delivery address).
          </div>

          <Button
            name="Go Home"
            class_name="primary"
            action={() => {
              history.push("/");
            }}
          />
        </PopUp>
      )}
    </div>
  );
};
export default Order;
