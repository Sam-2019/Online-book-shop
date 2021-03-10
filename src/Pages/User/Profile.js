import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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

import { MediaQuery, axiosMethod } from "../helper";
import "./profile.css";

const SmallView = styled.div`
  width: 320px;
  padding: 0 0 0 10px;

  @media (max-width: 540px) {
    padding: 0;
  }

  @media (max-width: 320px) {
    padding: 0;
  }

  @media (max-width: 280px) {
    padding: 0;
  }
`;

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
    case "Change Email":
      activePage = (
        <SmallView>
          <ChangeEmail />
        </SmallView>
      );
      break;
    case "Change Password":
      activePage = (
        <SmallView>
          <ChangePassword />
        </SmallView>
      );
      break;
    default:
      activePage = <OrderHistory />;
      break;
  }

  React.useEffect(() => {
    let didCancel = false;

    async function userImage() {
      const { data } = await axiosMethod("post", profileImageGet, formData);

      if (!didCancel) {
        if (data.error === false && data.message === "account found") {
          setProfileImage(`${okukus}/${data.data.profile_photo_url}`);
        }
      }
    }
    userImage();

    return () => {
      didCancel = true;
    };
  }, [formData]);

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

                  <div
                    className="option-list"
                    onClick={() => {
                      setActive("Change Email");
                    }}
                  >
                    Change Email
                  </div>

                  <div
                    className="option-list"
                    onClick={() => {
                      setActive("Change Password");
                    }}
                  >
                    Change Password
                  </div>

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

      {/* <>
        {isError && <div>Something went wrong ...</div>}

        {isLoading ? <div>Loading ...</div> : <>hello</>}
      </> */}
    </div>
  );
};
export default Proflie;
