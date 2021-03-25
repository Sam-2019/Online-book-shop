import React from "react";
import styled from "styled-components";

const SvgPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10% 0 0;
  width: 35%;
  margin: 0 auto;

  @media (max-width: 540px) {
    width: 60%;
    padding: 30% 0 0;
  }

  @media (max-width: 530px) {
    width: 90%;
    padding: 30% 0 0;
  }
`;

export const SvgItem = styled.div`
  text-align: center;
`;

const SVGcontainer = ({ children }) => {
  return <SvgPage>{children}</SvgPage>;
};

export default SVGcontainer;
