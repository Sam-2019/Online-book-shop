import React from "react";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Pen from "../Components/Pen";
import PopUp from "../Components/Popup";
import "./profile.css";
import ChangePassword from "./Profile/Change Password";
import ChangeEmail from "./Profile/Change Email";
import ChangeName from "./Profile/Change Name";

const Proflie = () => {
  let history = useHistory();
  const [password, updatePassword] = React.useState(false);
  const [email, updateEmail] = React.useState(false);
  const [name, updateName] = React.useState(false);

  const WebShare = (event) => {
    event.preventDefault();
    const url = "Okukus.com";

    const canonicalElement = document.querySelector("link[rel=canonical]");

    if (navigator.share) {
      if (canonicalElement !== null) {
        url = canonicalElement.href;
      }

      navigator
        .share({
          title: url,
          text:
            "Your one-stop shop for a wide selection of books, magazines & just about anything else. ",
          url: url,
        })
        .then(() => {
          console.log("Thnks for sharing");
        });
    } else {
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
          <div className="object-2"> Profile</div>
        </div>
      </div>

      <div className="main ">
        <div className="user-detail ">
          <div className="category ">
            <div className="object-5">
              <div className="user-image  "></div>
            </div>

            <div className="nameXeditXverify  ">
              <div className="nameXedit ">
                <div className="user-name">Samuel Martey Akandor</div>
                <Pen
                  width={15}
                  height={15}
                  action={() => {
                    updateName(true);
                  }}
                />
              </div>

              <div className="user-verify">
                <div className="verify">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {name ? (
          <PopUp close={() => updateName(false)}>
            <ChangeName
              close={() => {
                updateName(false);
              }}
            />
          </PopUp>
        ) : null}

        {password ? (
          <PopUp close={() => updatePassword(false)}>
            <ChangePassword
              close={() => {
                updatePassword(false);
              }}
            />
          </PopUp>
        ) : null}

        {email ? (
          <PopUp close={() => updateEmail(false)}>
            <ChangeEmail
              close={() => {
                updateEmail(false);
              }}
            />
          </PopUp>
        ) : null}

        <div className="options">
          <div
            className="option-list"
            onClick={() => {
              history.push("/user/order history");
            }}
          >
            Order History
          </div>
          <div
            className="option-list"
            onClick={() => {
              history.push("/user/wishlist");
            }}
          >
            Wish List
          </div>

          <div
            className="option-list"
            onClick={() => {
              updateEmail(true);
            }}
          >
            Change Email
          </div>

          <div
            className="option-list"
            onClick={() => {
              updatePassword(true);
            }}
          >
            Change Password
          </div>

          <div className="option-list" onClick={() => {}}>
            Customer Service
          </div>

          <div className="option-list" onClick={WebShare}>
            <span>Invite a friend</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Proflie;
