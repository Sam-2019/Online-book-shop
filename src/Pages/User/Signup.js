import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import { EyeShow, EyeHide } from "../Components/Eye";
import Message from "../Components/Message";
import { MediaQuery, fetch } from "../helper";
import { userRegister } from "../endpoints";
import { useData } from "../Context";
import "./user.css";

const Signup = () => {
  let history = useHistory();
  const { isLoggedIn } = useData();
  const breakpoint = 540;
  const { width } = MediaQuery();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");

  const [message, setMessage] = useState("");

  const [show, hide] = React.useState("password");
  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const mutation = useMutation((formData) => {
    return fetch(userRegister, formData);
  });

  const clearSignup = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword0("");
    setPassword1("");
  };

  const signUp = async (event) => {
    event.preventDefault();
    var formData = new FormData();

    setMessage("");
    let empty = firstname && lastname && email && password0 && password1;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);

      formData.set("firstname", firstname);
      formData.set("lastname", lastname);
      formData.set("email", email);
      formData.set("password0", password0);
      formData.set("password1", password1);

      try {
        const data = await mutation.mutateAsync(formData);
        setMessage(data.message);
        localStorage.setItem("loginToken", data.token);
        await isLoggedIn();
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clearSignup();
      }
    }
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

        </div>
      </div>

      <div className="main">
        <form className="form-wrapper signup-box outline">
          <Input
            class_name="input "
            placeholder="First name "
            action={(e) => setFirstName(e.target.value)}
            value={firstname}
            autocomplete="First Name"
          />

          <Input
            class_name="input "
            placeholder="Last name "
            action={(e) => setLastName(e.target.value)}
            value={lastname}
            autocomplete="Last Name"
          />

          <Input
            class_name="input "
            placeholder="Email"
            action={(e) => setEmail(e.target.value)}
            value={email}
            autocomplete="Email"
          />

          <Input
            class_name="input"
            placeholder="Password"
            action={(e) => setPassword0(e.target.value)}
            value={password0}
            autocomplete="Password"
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
            action={(e) => setPassword1(e.target.value)}
            value={password1}
            autocomplete="Confirm Password"
            type={type}
          />

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
