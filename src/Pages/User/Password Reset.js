import React, { useState } from "react";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";

import "./user.css";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clear = () => {
    setEmail("");
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    setMessage("");

    let empty = email;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);

      try {
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clear();
      }
    }
  };

  return (
    <div className="user-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Back
              width={30}
              height={30}
              action={() => {
                window.history.back();
              }}
            />
          </div>
          <div className="object-2">Reset your password</div>
        </div>

        <div className="category ">
          <div className="object-2"></div>
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper outline login-box ">
          <Input
            class_name="input "
            placeholder="Email"
            value={email}
            action={(e) => setEmail(e.target.value)}
            type="email"
          />

          {message ? <Message message={message} class_name="message" /> : null}

          <Button
            name="Send email"
            class_name="primary"
            action={sendEmail}
            loading={loading}
          />

          {/* <Button name="Return to sign in" class_name="secondary" /> */}
          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>
      </div>
    </div>
  );
};
export default PasswordReset;
