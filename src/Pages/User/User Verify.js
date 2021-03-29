import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Back from "../Components/Back";
import Message from "../Components/Message";
import Success from "../Components/Success";
import { useAsync2 } from "../helper";
import { userReadEmailVerify } from "../endpoints";
import "./user.css";

const UserVerify = () => {
  let token = new URLSearchParams(useLocation().search).get("token");
  let email = new URLSearchParams(useLocation().search).get("email");

  var formData = new FormData();
  formData.set("url_data", token);
  formData.set("url_data", email);

  const resource = useAsync2(userReadEmailVerify, formData);

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
          <div className="object-2"> User Verify</div>
        </div>
      </div>

      <div className="main">
        {resource.error === true ? (
          <Message class_name="message " message={message} />
        ) : null}

        {resource.error === false ? <Success /> : null}
      </div>
    </div>
  );
};
export default UserVerify;
