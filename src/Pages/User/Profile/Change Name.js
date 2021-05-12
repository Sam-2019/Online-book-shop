import React, { useState } from "react";

import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";

import "./change.css";

const ChangeName = ({ close }) => {


  const [loading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [message, setMessage] = useState("");


  const clear = () => {
    setFirstName("");
    setLastName("");
  };

  const updateDetail = async (event) => {
    setMessage("");
    event.preventDefault();

    let empty = first_name && last_name;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);


      try {

        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clear();

      }
    }
  };

  return (
    <form>
      <Input
        class_name="input "
        placeholder="First Name"
        value={first_name}
        action={(e) => setFirstName(e.target.value)}
        autocomplete="First Name"
      />
      <Input
        class_name="input "
        placeholder="Last Name"
        value={last_name}
        action={(e) => setLastName(e.target.value)}
        autocomplete="Last Name"
      />

      {message ? <Message message={message} class_name="message" /> : null}

      <Button
        class_name="primary"
        name="Update"
        action={updateDetail}
        loading={loading}
      />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeName
