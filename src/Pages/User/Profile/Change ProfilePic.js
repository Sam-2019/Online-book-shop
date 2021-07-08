import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import ProfilePhoto from "../../Components/Profile Photo";
import Button from "../../Components/Button";
import { Spacer } from "../../styles";

import { UPDATE_PHOTOURL, GET_USER } from "../../graphQL functions";

import "./change.css";

const ProfiilePhotoUpdate = ({ close }) => {
  const [change, setChange] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [imagePreviewUrl, setimagePreviewUrl] = React.useState(
    "https://i.redd.it/liptgenrd1b01.png"
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [updatePhoto, { loading, error, data }] = useMutation(UPDATE_PHOTOURL, {
    refetchQueries: [{ query: GET_USER }],
    onCompleted: (data) => {},
  });

  const notify = (data) => {};

  const openBox = () => {
    setChange(!change);
  };

  const Change = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let pic = e.target.files[0];

    reader.onloadend = () => {
      setFile(e.target.files[0]);
      setimagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(pic);
    setFile(pic);
  };

  const imageUpload = async (e) => {
    setLoading(true);

    e.preventDefault();

    try {
      setLoading(false);
      photoUpdate({
        variables: {},
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <div className="image-holder">
        <div className="holdImage">
          {imagePreviewUrl ? (
            <ProfilePhoto className="just-image" src={imagePreviewUrl} />
          ) : (
            <ProfilePhoto className="just-image" src />
          )}
        </div>
        <div className="middle" onClick={openBox}>
          <input
            className="fileInput"
            type="file"
            onChange={Change}
            id="profileImage"
            accept="image/*"
          />

          <label htmlFor="profileImage" className="text">
            {loading ? "Loading.." : "   Change Image"}
          </label>
        </div>
        {/* {message ? <Message message={massage} class_name="message" /> : null}
         */}
        <Spacer />
        <Button class_name="primary" name="Upload Image" action={imageUpload} />
        <Button class_name="secondary" name="Cancel" action={close} />
      </div>
    </form>
  );
};

export default ProfiilePhotoUpdate;
