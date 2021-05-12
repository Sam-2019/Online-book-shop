import React from "react";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import PopUp from "../Components/Popup";
import Question from "../Components/Question";
import Success from "../Components/Success";
import { MediaQuery } from "../helper";

import "./order.css";
import PaymentProcess from "./PaymentProcess";

const Order = () => {
  let breakpoint = 540;
  let history = useHistory();

  const { width } = MediaQuery();
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [state, setState] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState("Pick your location");
  const [fee, setFee] = React.useState(10);
  const [items, setItems] = React.useState([]);
  let show;

  React.useEffect(() => {
    let unmounted = false;

    return () => {
      unmounted = true;
    };
  }, []);

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

  React.useEffect(() => {
    let didCancel = false;

    return () => {
      didCancel = true;
    };
  }, []);

  function orderItem() {
    setSuccess(true);
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

      {state ? (
        <PopUp close={() => setState(false)}>
          <PaymentProcess buttonAction={() => setState(false)} />
        </PopUp>
      ) : null}

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
              {items.map(({ value, disable }) => (
                <option key={value} value={value} disabled={disable}>
                  {value}
                </option>
              ))}
            </select>
            <Input class_name="input " placeholder="Location" onChange />
            <Input class_name="input " placeholder="Digital Address" onChange />
            <Input class_name="input " placeholder="Phone Number" onChange />

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
                {selectedOption === "momo" ? (
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
                    <Input class_name="input " placeholder="Name" onChange />
                    <Input
                      class_name="input "
                      placeholder="Momo Number"
                      onChange
                    />
                    <Input
                      class_name="input "
                      placeholder="Transaction ID"
                      onChange
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {width > breakpoint ? (
            <>
              {selectedOption === "momo" ? (
                <div
                  className={`
                   ${
                     viewType === "oneForm"
                       ? "order-payment "
                       : "order-payment1  "
                   } outline  margin-top 
                  `}
                >
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
                    <Input class_name="input " placeholder="Name" onChange />
                    <Input
                      class_name="input "
                      placeholder="Momo Number"
                      onChange
                    />
                    <Input
                      class_name="input "
                      placeholder="Transaction ID"
                      onChange
                    />
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
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

      {success ? (
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
      ) : null}
    </div>
  );
};
export default Order;
