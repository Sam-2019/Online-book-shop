import React from "react";
import { Navigator } from "../Product/Products";
import "./loader.css";

const Loader = () => {
  return (
    <Navigator>
      <div className="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Navigator>
  );
};

export default Loader;
