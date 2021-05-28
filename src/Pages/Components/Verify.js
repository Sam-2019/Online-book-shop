import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { toast } from "react-toastify";
import { GET_VERIFICATION, UPDATE_VERIFICATION } from "../graphQL functions";
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

const Verify = () => {
  const { uniqueID } = useData();

  const id = String(uniqueID);

  const [verifyUser, { data: dataResponse }] = useMutation(UPDATE_VERIFICATION);

  const { data } = useQuery(GET_VERIFICATION, {
    variables: { id },
  });

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

  if (data) {
    return (
      <Verification>
        <Verified>Verified</Verified>
      </Verification>
    );
  }

  return (
    <Verification>
      <NotVerified onClick={verify}>Unverified</NotVerified>
    </Verification>
  );
};

export default Verify;
