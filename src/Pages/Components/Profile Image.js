import React from "react";
import axios from "axios";
import { buyerID, profileImageAdd } from "../endpoints";

const ProfileImage = ({ change }) => {
  const [file, setFile] = React.useState("");
  const [imagePreviewUrl, setimagePreviewUrl] = React.useState("");
  const formData = new FormData();

  const imageUpload = async (e) => {
    e.preventDefault();

    console.log(file);

    formData.set("buyer_unique_id", buyerID);
    formData.append("file_profile_photo", file);

    const response = await axios({
      method: "post",
      url: profileImageAdd,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response);
  };

  change = (e) => {
    console.log("clicked!!!");
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

  return (
    <>
      <form onSubmit={imageUpload}>
        <input className="fileInput" type="file" onChange={change} />

        <button className="submitButton" type="submit">
          Upload Image
        </button>
      </form>

      <div className="imgPreview">
        {imagePreviewUrl ? (
          <>
            <img src={imagePreviewUrl} />
          </>
        ) : (
          <>
            <div className="previewText">
              Please select an Image for Preview
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileImage;
