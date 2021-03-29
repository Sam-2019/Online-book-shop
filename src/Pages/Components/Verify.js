import React from "react";
import { useData } from "../Context";

const Verify = () => {
  const { verfifcationStatus } = useData();

  return (
    <div className="user-verify">
      {verfifcationStatus ? (
        <span className="verify">Verified</span>
      ) : (
        <span className="not-verify">Unverified</span>
      )}
    </div>
  );
};

export default Verify;
