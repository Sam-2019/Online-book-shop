import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";

const PageWrapper = ({ pageTitle, children }) => {
  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">{pageTitle}</div>
        </div>
      </div>

      <div className="main">
        <div className=" wrapper-item">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;

PageWrapper.propTypes = {
    pageTitle: PropTypes.string,
    children: PropTypes.any
  };
  