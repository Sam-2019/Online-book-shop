import React from "react";
import "./image.css";

const Image = () => {
  return (
    <>
      <div className="containerWar ">
        <img src="https://reactnative.dev/img/tiny_logo.png" alt="Avatar" className="image" />

        <div className="middle ">
          <div className="text ">Change Image</div>
        </div>
      </div>
    </>
  );
};

export default Image;
