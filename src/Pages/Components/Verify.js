import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { toast } from "react-toastify";
import { UPDATE_VERIFICATION } from "../graphQL functions";
import { useData } from "../Context";

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

const Verify = ({ verfifcationStatus }) => {
  const { uniqueID } = useData();

  const id = String(uniqueID);

  const [verifyUser, { data: dataResponse }] = useMutation(UPDATE_VERIFICATION);

  const verify = async (e) => {
    e.preventDefault();

    await verifyUser({
      variables: {
        id: String(uniqueID),
        verified: Boolean(true),
      },
    });

    if (dataResponse) {
      toast.success("Message sent");
    }
  };

  return (
    <Verification>
      {verfifcationStatus ? (
        <Verified>Verified</Verified>
      ) : (
        <NotVerified onClick={verify}>Unverified</NotVerified>
      )}
    </Verification>
  );
};

export default Verify;
