import React from "react";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import Pen from "../Components/Pen";
import PopUp from "../Components/Popup";
import "./profile.css";
import ChangePassword from "./Profile/Change Password";
import ChangeEmail from "./Profile/Change Email";
import ChangeName from "./Profile/Change Name";

import { MediaQuery } from "../helper";

const Proflie = () => {
  let history = useHistory();
  let { width } = MediaQuery();
  const breakpoint = 540;
  const [password, updatePassword] = React.useState(false);
  const [email, updateEmail] = React.useState(false);
  const [name, updateName] = React.useState(false);

  const WebShare = (event) => {
    event.preventDefault();
    const title = "Okukus.com";

    const url = "Okukus.com";
    const canonicalElement = document.querySelector("link[rel=canonical]");

    if (navigator.share) {
      if (canonicalElement !== null) {
        url = canonicalElement.href;
      }

      navigator
        .share({
          title: title,
          text:
            "Your one-stop shop for a wide selection of books, magazines & just about anything else. ",
          url: "https://okukus.com",
        })
        .then(() => {
          console.log("Thanks for sharing");
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

      <div className="main item">
        <div className="user-detailsXother-pages">
          <div className="left-side item">
            <div className="user-detail">
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

            <div className="options">
              {width > breakpoint ? (
                <>
                  <div className="option-list">Order History</div>

                  <div className="option-list">Wish List</div>

                  <div className="option-list"> Change Email</div>

                  <div className="option-list"> Change Password</div>

                  <div className="option-list"> Customer Service</div>

                  <div className="option-list" onClick={WebShare}>
                    <span>Invite a friend</span>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="right-side item">
            <div className="other-pages">Hello</div>
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
      </div>
    </div>
  );
};
export default Proflie;
