import React, { useState } from "react";
import { useMutation } from "react-query";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import { userProfileUpdate } from "../../endpoints";
import ProfilePhotoUpdate from "../../Components/Profile Photo Update ";
import { useData } from "../../Context";

import "./change.css";

const ChangeName = ({ close }) => {
  const { uniqueID } = useData();

  const [loading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const clear = () => {
    setFirstName("");
    setLastName("");
  };

  const mutation = useMutation((formData) => {
    return fetch(userProfileUpdate, formData);
  });

  const updateDetail = async (event) => {
    setMessage("");
    event.preventDefault();

    var formData = new FormData();

    let empty = first_name && last_name;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);
      formData.set("buyer_unique_id", uniqueID);
      formData.set("firstname", first_name);
      formData.set("lastname", last_name);

      try {
        const data = await mutation.mutateAsync(formData);
        setMessage(data.message);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clear();
      }
    }
  };

  return (
    <>
      <ProfilePhotoUpdate />

      <form className=" change ">
        <Input
          class_name="input "
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          class_name="input "
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        {message ? <Message message={message} class_name="message" /> : null}

        <Button
          class_name="primary"
          name="Update"
          action={updateDetail}
          loading={loading}
        />

        {/* <Button class_name="secondary" name="Cancel" action={close} /> */}
      </form>
    </>
  );
};

export default ChangeName;
