import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import { EyeShow, EyeHide } from "../Components/Eye";
import Message from "../Components/Message";
import { MediaQuery } from "../helper";
import "./user.css";

import { SIGNUP } from "../graphQL functions";

const Signup = () => {
  let history = useHistory();

  const breakpoint = 540;
  const { width } = MediaQuery();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const [signup, { loading: Loading, error: Error, data: Data }] =
    useMutation(SIGNUP, {
      onCompleted: data => {
        console.log(data)
        // store the token
     //   localStorage.setItem('token', data.signUp);
        // update the local cache
      //  client.writeData({ data: { isLoggedIn: true } });
        // redirect the user to the homepage
      //  props.history.push('/');
      }
    });

  const clearSignup = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const signUp = async (event) => {
    event.preventDefault();

    setMessage("");
    let empty = firstname && lastname && email && password;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);

      try {
        signup({
          variables: {
            password: String(password),
            first_name: String(firstname),
            last_name: String(lastname),
            email: String(email),
          },
        });
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
            action={(e) => setPassword(e.target.value)}
            value={password}
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
