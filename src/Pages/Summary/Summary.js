import React from "react";
import PropTypes from "prop-types";
import "./summary.css";
import styled from "styled-components";

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: auto;
  bottom: 0;
  padding: 0px 10px;
  background-color: #ffffff;
  border-top: 1px solid #abababb5;

  @media (max-width: 540px) {
  }
`;

const Summary = ({ children }) => {
  return <SummaryWrapper>{children}</SummaryWrapper>;
};

export default Summary;

Summary.propTypes = {
  children: PropTypes.node.isRequired,
};
