import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Back from "../Components/Back";
import Pen from "../Components/Pen";
import PopUp from "../Components/Popup";
import ChangePassword from "./Profile/Change Password";
import ChangeEmail from "./Profile/Change Email";
import ChangeName from "./Profile/Change Name";
import OrderHistory from "./Profile/Order History";
import WishList from "./Profile/Wish List";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import { okukus, profileImageGet, buyerID, profliePhoto } from "../endpoints";

import { MediaQuery } from "../helper";
import "./profile.css";

const Proflie = () => {
  let history = useHistory();
  let { width } = MediaQuery();
  const breakpoint = 540;
  let activePage;
  const [password, updatePassword] = React.useState(false);
  const [email, updateEmail] = React.useState(false);
  const [name, updateName] = React.useState(false);
  const [verify, setVerify] = React.useState(false);

  const [profileImage, setProfileImage] = React.useState("");

  const [active, setActive] = React.useState("Order History");
  const formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const WebShare = (event) => {
    event.preventDefault();

    const canonicalElement = document.querySelector("link[rel=canonical]");

    if (navigator.share) {
      if (canonicalElement !== null) {
        okukus = canonicalElement.href;
      }

      navigator
        .share({
          title: okukus,
          text:
            "Your one-stop shop for a wide selection of books, magazines & just about anything else. ",
          url: okukus,
        })
        .then(() => {
          console.log("Thanks for sharing");
        });
    } else {
    }
  };

  switch (active) {
    case "Order History":
      activePage = <OrderHistory />;
      break;
    case "Wish List":
      activePage = <WishList />;
      break;
    default:
      activePage = <OrderHistory />;
      break;
  }

  const userImage = async () => {
    const { data } = await axios({
      method: "post",
      url: profileImageGet,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data.error === false && data.message === "account found") {
      setProfileImage(`${okukus}/${data.data.profile_photo_url}`);
    }
  };

  React.useEffect(() => {
    userImage();
  }, [userImage]);

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

      <div className="main">
        <div className="user-detailsXother-pages">
          <div className="left-side">
            <div className="user-detail">
              <div className="user-category">
                <div className="object-5">
                  <ProfilePhoto
                    className="image"
                    src={profileImage}
                    alt="img"
                  />
                </div>

                <div className="nameXeditXverify">
                  <div className="nameXedit">
                    <UserName name="Dan Nii Tackie" />
                    <Pen
                      width={15}
                      height={15}
                      action={() => {
                        updateName(true);
                      }}
                    />
                  </div>

                  <div className="user-verify">
                    {verify ? (
                      <span className="verify">Verified</span>
                    ) : (
                      <span className="not-verify">Unverified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="options">
              {width > breakpoint ? (
                <>
                  <div
                    className="option-list"
                    onClick={() => {
                      setActive("Order History");
                    }}
                  >
                    Order History
                  </div>

                  <div
                    className="option-list"
                    onClick={() => {
                      setActive("Wish List");
                    }}
                  >
                    Wish List
                  </div>

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

          <div className="right-side">
            <div className="other-pages">
              <div className="activePage">{active}</div>

              <div>{activePage}</div>
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
      </div>
    </div>
  );
};
export default Proflie;
