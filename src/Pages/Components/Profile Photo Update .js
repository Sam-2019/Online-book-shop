import React from "react";
import axios from "axios";
import ProfilePhoto from "./Profile Photo";
import { buyerID, profileImageAdd } from "../endpoints";
import "./profilePhoto.css";

const ProfiilePhotoUpdate = () => {
  const [change, setChange] = React.useState(false);

  const [file, setFile] = React.useState("");
  const [imagePreviewUrl, setimagePreviewUrl] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const formData = new FormData();

  const openBox = () => {
    setChange(!change);
  };

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

  const update = (e) => {
    setLoading(true);
    e.preventDefault();

    let reader = new FileReader();
    let pic = e.target.files[0];

    // reader.onload = (e) => {
    //   setFile(e.target.result);
    // };

    // if (reader.onloadend) {
    //   setFile(e.target.files[0]);
    //   setimagePreviewUrl(reader.result);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    //   setimagePreviewUrl("Update failed!");
    // }

    reader.onloadend = () => {
      setFile(e.target.files[0]);
      setimagePreviewUrl(reader.result);
      setLoading(false);
    };

    // reader.onerror = () => {
    //   setFile(e.target.files[0]);
    //   setimagePreviewUrl(reader.result);
    //   setLoading(false);
    // };

    reader.readAsDataURL(pic);
    setFile(pic);
  };

  return (
    <>
      <div className="containerWar">
        <form onSubmit={imageUpload} className="">
          {imagePreviewUrl ? (
            <>
              <img src={imagePreviewUrl} alt="Avatar" className=" just-image" />
            </>
          ) : (
            <>
              <ProfilePhoto class_name="just-image" />
            </>
          )}

          <div className="middle" onClick={openBox}>
            <input
              className="fileInput"
              type="file"
              onChange={update}
              id="profileImage"
              accept="image/*"
            />

            <label htmlFor="profileImage" className="text">
              {loading ? "Loading.." : "   Change Image"}
            </label>
          </div>

          <button className="uploadImage " type="submit">
            Upload Image
          </button>
        </form>
      </div>

      {/* {change ? (
        <>
          <form onSubmit={imageUpload}>
            <input className="fileInput" type="file" onChange={Change} />

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
      ) : null} */}
    </>
  );
};

export default ProfiilePhotoUpdate;
