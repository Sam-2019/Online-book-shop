import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import { EyeShow, EyeHide } from "../Components/Eye";
import Message from "../Components/Message";
import { MediaQuery } from "../helper";
import { useData } from "../Context";
import "./user.css";

const Signup = () => {
  let history = useHistory();
  const breakpoint = 540;
  const { width } = MediaQuery();
  const { registerUser } = useData();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");

  const [message, setMessage] = useState("");

  const [show, hide] = React.useState("password");
  var formData = new FormData();
  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const clearSignup = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword0("");
    setPassword1("");
  };

  const signUp = async (event) => {
    setMessage("");
    event.preventDefault();
    let empty = firstname && lastname && email && password0 && password1;

    if (empty !== "") {
      setLoading(true);
      formData.set("firstname", firstname);
      formData.set("lastname", lastname);
      formData.set("email", email);
      formData.set("password0", password0);
      formData.set("password1", password1);

      const data = await registerUser(formData);
      console.log(data);

      if (data.error === true) {
        setMessage(data.message);
        setLoading(false);
      } else if (data.error === false) {
        localStorage.setItem("loginToken", data.buyer.token);
        clearSignup();
        setLoading(false);
      } else return;
    } else if (empty === "") {
      setMessage("Please fill the form");
    } else return;
  };

  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Create account</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Button
              name="Login"
              class_name="header-secondary"
              action={() => {
                history.push("/login");
              }}
            />
          </div>

          {/* <div className="">
            <Button name="Next" class_name="header-primary" />
          </div> */}
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper signup-box outline">
          <Input
            class_name="input "
            placeholder="First name "
            onChange={(e) => setFirstName(e.target.value)}
            content={firstname}
          />

          <Input
            class_name="input "
            placeholder="Last name "
            onChange={(e) => setLastName(e.target.value)}
            content={lastname}
          />

          <Input
            class_name="input "
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            content={email}
          />

          <Input
            class_name="input"
            placeholder="Password"
            onChange={(e) => setPassword0(e.target.value)}
            content={password0}
            autoComplete="new-password"
            type={type}
          />

          <div className="eyeIcon">
            {show === "password" ? (
              <EyeHide
                action={() => {
                  hide("text");
                }}
              />
            ) : (
              <EyeShow
                action={() => {
                  hide("password");
                }}
              />
            )}
          </div>

          <Input
            class_name="input "
            placeholder="Confirm Password"
            onChange={(e) => setPassword1(e.target.value)}
            content={password1}
            autoComplete="new-password"
            type={type}
          />

          {/* <Input
            type="date"
            class_name="input "
            placeholder="Date of birth"
            onChange
          /> */}

          {message ? <Message class_name="message " message={message} /> : null}

          <Button
            name="Signup"
            class_name=" primary"
            action={signUp}
            loading={loading}
          />

          {width > breakpoint ? (
            <Button
              name="Login"
              class_name="secondary "
              action={() => {
                history.push("/login");
              }}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default Signup;
