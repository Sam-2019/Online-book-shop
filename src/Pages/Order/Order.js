import React, { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import PopUp from "../Components/Popup";
import Success from "../Components/Success";
import { MediaQuery } from "../helper";
import {
  ADD_PAYMENT,
  GET_LOCATIONS,
  GET_ORDER_AMOUNT,
} from "../graphQL functions";

import PaymentInstruction from "./PaymentInstruction";

import "./order.css";
import PaymentProcess from "./PaymentProcess";

const Order = () => {
  let breakpoint = 540;
  let history = useHistory();

  const { width } = MediaQuery();
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [state, setState] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [value, setValue] = React.useState("Pick your location");
  const [items, setItems] = React.useState([]);

  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [momoName, setMomoName] = React.useState("");
  const [momoNumber, setMomoNumber] = React.useState("");
  const [momoTransactionID, setMomoTransactionID] = React.useState("");

  const orderNumber = localStorage.getItem("orderNumber");

  const { loading: loadAmount, data: dataAmount } = useQuery(GET_ORDER_AMOUNT, {
    variables: { orderNumber },
  });
  console.log(dataAmount);

  const { loading } = useQuery(GET_LOCATIONS, {
    onCompleted: (data) => {
      setItems(
        data.location.map(({ id, location, fee, disable }) => ({
          id,
          location,
          fee,
          disable,
        }))
      );
    },
  });

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
  ] = useMutation(ADD_PAYMENT, {
    onCompleted: (data) => {
      setPaymentMethod("");
      setValue("Pick your location");
      setAddress("");
      setPhoneNumber("");
      setMomoName("");
      setMomoNumber("");
      setMomoTransactionID("");
      setSuccess(true);
    },
  });

  function orderItem() {
    if (value === "Pick your location") {
      return setAlert(true);
    }

    if (!orderNumber && !paymentMethod && !selectedOption) {
      return;
    }

    addPayment({
      variables: {
        method: String(selectedOption),
        location: value,
        orderNumber: String(orderNumber),
        address,
        phoneNumber,
        momoName,
        momoNumber,
        momoTransactionID,
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

            <select
              id="select"
              className="input"
              autoFocus
              required
              disabled={loading}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              {items.map(({ location, fee, id, disable }) => (
                <option key={id} value={id}>
                  {location}
                </option>
              ))}
            </select>

            {alert && <div id="alert">Please select your location</div>}

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
              value={phoneNumber}
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
                  <PaymentInstruction
                    momoName={momoName}
                    setMomoName={setMomoName}
                    momoNumber={momoNumber}
                    setMomoNumber={setMomoNumber}
                    momoTransactionID={momoTransactionID}
                    setMomoTransactionID={setMomoTransactionID}
                    setState={setState}
                  />
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
                    momoName={momoName}
                    setMomoName={setMomoName}
                    momoNumber={momoNumber}
                    setMomoNumber={setMomoNumber}
                    momoTransactionID={momoTransactionID}
                    setMomoTransactionID={setMomoTransactionID}
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
            {loadAmount ? (
              "Loading"
            ) : (
              <span>
                Total: $
                {`${Intl.NumberFormat().format(
                  dataAmount.getOrderAmount.orderValue
                )}`}
              </span>
            )}
          </div>
          <div className="shipping">(Shipping ${})</div>
        </div>

        <Button class_name="checkout" name="Order" action={orderItem} />
      </Summary>

      {state && (
        <PopUp close={() => setState(false)}>
          <PaymentProcess buttonAction={() => setState(false)} />
        </PopUp>
      )}

      {success && (
        <PopUp>
          <Success />
          <div className="order-success">
            <div></div> Thank you for shopping with us! Your order{" "}
            <span className="orderID">{orderNumber}</span> has been placed,
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
