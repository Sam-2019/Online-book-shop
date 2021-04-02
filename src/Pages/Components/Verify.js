import React from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useData } from "../Context";
import { userCreateEmailVerify } from "../endpoints";
import { fetch } from "../helper";

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
  const { verfifcationStatus, email } = useData();

  const notify = (data) => {
    toast.success(data);
  };

  const mutation = useMutation((formData) => {
    return fetch(userCreateEmailVerify, formData);
  });

  const verify = async (event) => {
    var formData = new FormData();
    event.preventDefault();
    formData.set("buyer_email", email);

    try {
      const data = await mutation.mutateAsync(formData);
      console.log(data);

      if (data) {
        notify(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <Verification>
      {verfifcationStatus !== "Verified" ? (
        <Verified>Verified</Verified>
      ) : (
        <NotVerified onClick={verify}>Unverified</NotVerified>
      )}
    </Verification>
  );
};

export default Verify;
