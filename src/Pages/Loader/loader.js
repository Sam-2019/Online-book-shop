import React from "react";
import { Navigator } from "../Product/styles";
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
