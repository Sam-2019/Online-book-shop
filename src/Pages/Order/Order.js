import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import PopUp from "../Components/Popup";
import Question from "../Components/Question";
import Success from "../Components/Success";
import { MediaQuery } from "../helper";
import { useData } from "../Context";

import { buyerID, locationsGet, feeGet } from "../endpoints";

import "./order.css";
import PaymentProcess from "./PaymentProcess";

const Order = () => {
  const { amount, quantity, auth } = useData();

  let breakpoint = 540;
  let history = useHistory();
  let { id } = useParams();
  const { width } = MediaQuery();
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [state, setState] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState("Pick your location");
  const [fee, setFee] = React.useState(0);
  const [items, setItems] = React.useState([]);
  let show;
  var formData = new FormData();

  React.useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      formData.set("buyer_unique_id", buyerID);
      const response = await axios({
        method: "post",
        url: locationsGet,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const body = await response.data;

      if (!unmounted) {
        setItems(
          body.data.map(({ location, unique_id, disabled }) => ({
            uniqueID: unique_id,
            label: location,
            value: location,
            disable: disabled,
          }))
        );
        setLoading(false);
      }
    }

    fetchData();

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

  // const getFee = async () => {
  //   formData.set("buyer_unique_id", buyerID);
  //   formData.set("location_name", value);

  //   const response = await axios({
  //     method: "post",
  //     url: feeGet,
  //     data: formData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   response ? setFee(response.data.data) : setFee(0);
  // };

  // React.useEffect(() => {
  //   getFee();
  // }, [getFee]);

  React.useEffect(() => {
    let didCancel = false;

    const getFee = async () => {
      formData.set("buyer_unique_id", buyerID);
      formData.set("location_name", value);

      const response = await axios({
        method: "post",
        url: feeGet,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!didCancel) {
        response ? setFee(response.data.data) : setFee(0);
      }
    };

    getFee();

    return () => {
      didCancel = true;
    };
  }, [formData]);

  function orderItem() {
    if (auth) {
      history.push(`/order/${id}`);
      setSuccess(true);
    }
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
            {/* Total: {fee === undefined ? ` $${amount}` : ` $${amount + fee}`} */}
            Total:{" "}
            {fee === undefined ? (
              <>${Intl.NumberFormat().format(amount)}</>
            ) : (
              <>${Intl.NumberFormat().format(amount + fee)}</>
            )}
          </div>
          <div className="shipping">
            {value === "Pick your location" ? <></> : <>(Shipping ${fee})</>}
          </div>
        </div>

        <Button
          class_name="checkout"
          name={`Order  (${quantity})`}
          action={orderItem}
        />
      </Summary>

      {success ? (
        <PopUp>
          <Success />
          <div className="order-success">
            <div>
              {/* Hi <span className="customer-name">Kenneth Akanpaacharuk</span>, */}
            </div>{" "}
            Thank you for shopping with us! Your order{" "}
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
