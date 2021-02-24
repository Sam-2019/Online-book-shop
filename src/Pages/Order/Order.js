import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Home from "../Components/Home";
import Message from "../Components/Message";
import Summary from "../Summary/Summary";
import PopUp from "../Components/Popup";
import Question from "../Components/Question";
import Success from "../Components/Success Container";

import { buyerID, locationsGet, feeGet } from "../endpoints";

import "./order.css";

const list = [
  {
    id: "0",
    unique_id: "0",
    location: "Pick your location",
    fee: "0.00",
    disabled: true,
  },
  {
    id: "1",
    unique_id: "5f97102cd9ba86.00000001",
    location: "Community 1",
    fee: "7.00",
    disabled: false,
  },
  {
    id: "2",
    unique_id: "5f97102cd9ba86.00000002",
    location: "Community 2",
    fee: "7.00",
    disabled: false,
  },
];

const Order = () => {
  let amount = 10000;
  let quantity = 100;
  let history = useHistory();
  let { id } = useParams();
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

  switch (paymentMethod) {
    case "Cash":
      selectedOption = "cash";
      break;
    case "Momo":
      selectedOption = "momo";
      break;
    default:
      selectedOption = "momo";
  }

  switch (value) {
    case "Pick your location":
      show = "";

      break;
    default:
      show = "(Shipping inclusive)";
  }

  const getFee = async () => {
    formData.set("buyer_unique_id", buyerID);
    formData.set("location_name", value);

    const response = await axios({
      method: "post",
      url: feeGet,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    response ? setFee(response.data.data) : setFee(0);
  };

  React.useEffect(() => {
    getFee();
  }, [getFee]);

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
            Upon successful payment, please use the details of the payment to
            fill the fields below
          </div>

          {/* <Button class_name="primary" name="Okay" /> */}
          <div className="popup-action">
            <Button
              class_name="primary"
              name="Close"
              action={() => setState(false)}
            />
          </div>
        </PopUp>
      ) : null}

      <div className="main">
        <form className=" form-item ">
          <div className="order-shipping">
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
            <div className="payment-method">
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
          </div>

          <div className="order-payment">
            {selectedOption === "momo" ? (
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
                <Input class_name="input " placeholder="Momo Number" onChange />
                <Input
                  class_name="input "
                  placeholder="Transaction ID"
                  onChange
                />
              </div>
            ) : null}
          </div>
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
          action={() => {
            history.push(`/order/${id}`);
            setSuccess(true);
          }}
        />
      </Summary>

      {success ? (
        <Success close={() => setSuccess(false)}>
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
        </Success>
      ) : null}
    </div>
  );
};
export default Order;
