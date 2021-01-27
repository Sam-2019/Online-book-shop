import React from "react";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Pen from "../Components/Pen";
import PopUp from "../Components/Popup";
import "./profile.css";
import ChangePassword from "./Profile/Change Password";

const Proflie = () => {
  let history = useHistory();
  const [state, setState] = React.useState(false);

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
                <Pen width={15} height={15} />
              </div>

              <div className="user-verify">
                <div className="verify">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {state ? (
          <PopUp close={() => setState(false)}>
            <ChangePassword
              close={() => {
                setState(false);
              }}
            />
          </PopUp>
        ) : null}

        <div className="options">
          <div className="option-list" onClick={() => {}}>
            Account
          </div>
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
              setState(true);
            }}
          >
            Change Password
          </div>

          <div className="option-list" onClick={() => {}}>
            Customer Service
          </div>

          <div className="option-list">
            <a href="sms:+0240586043&body=Hi%there%here to text us!">
              Invite a friend
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Proflie;
