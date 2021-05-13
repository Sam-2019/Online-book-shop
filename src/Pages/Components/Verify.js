import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

toast.configure();

const Verification = styled.div`
  font-size: 12px;
  background-color: white;
  font-style: italic;
  display: flex;
`;

const Verified = styled.div`
  border: 1px solid #00d919;
  color: #00d919;
  border-radius: 10px;
  border-radius: 10px;
  padding: 0 10px;
`;

const NotVerified = styled.div`
  border: 1px solid #d91d00;
  color: #d91d00;
  border-radius: 10px;
  padding: 0 10px;
  cursor: pointer;

  :active {
    transform: scale(0.95);
  }

  :focus {
    outline: none;
  }
`;

const Verify = () => {
  const notify = (data) => {
    toast.success(data);
  };

  const verify = async (event) => {
    try {
    } catch (error) {
    } finally {
    }
  };

  return (
    <Verification>
      <NotVerified onClick={verify}>Unverified</NotVerified>
    </Verification>
  );
};

export default Verify;
