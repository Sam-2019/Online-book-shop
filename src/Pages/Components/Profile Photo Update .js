import React from "react";
import axios from "axios";
import ProfilePhoto from "./Profile Photo";
import {
  buyerID,
  profileImageAdd,
  profliePhoto,
  profileImageGet,
  okukus,
} from "../endpoints";
import "./profilePhoto.css";

const ProfiilePhotoUpdate = () => {
  const [change, setChange] = React.useState(false);

  const [file, setFile] = React.useState("");
  const [imagePreviewUrl, setimagePreviewUrl] = React.useState("");
  const [currentImage, newImage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const formData = new FormData();

  const openBox = () => {
    setChange(!change);
  };

  // const imageUpload = async (e) => {
  //   e.preventDefault();

  //   console.log(file);

  //   formData.set("buyer_unique_id", buyerID);
  //   formData.append("file_profile_photo", file);

  //   const { data } = await axios({
  //     method: "post",
  //     url: profileImageAdd,
  //     data: formData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

  //   console.log(data);
  // };

  const update = async (e) => {
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
      //  setimagePreviewUrl(reader.result);
    };

    // reader.onerror = () => {
    //   setFile(e.target.files[0]);
    //   setimagePreviewUrl(reader.result);
    //   setLoading(false);
    // };

    reader.readAsDataURL(pic);

    formData.set("buyer_unique_id", buyerID);
    formData.append("file_profile_photo", pic);

    const { data } = await axios({
      method: "post",
      url: profileImageAdd,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data.error === false) {
      setLoading(false);
      setimagePreviewUrl(`${okukus}/${data.data.profile_photo_url}`);
      ///setimagePreviewUrl(pic);
    }
  };

  const userImage = async () => {
    formData.set("buyer_unique_id", buyerID);
    formData.append("file_profile_photo", file);

    const { data } = await axios({
      method: "post",
      url: profileImageGet,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data.error === false && data.message === "account found") {
      newImage(`${okukus}/${data.data.profile_photo_url}`);
    }
  };

  React.useEffect(() => {
    userImage();
  }, [userImage]);

  return (
    <>
      <div className="containerWar">
        <div className="">
          {imagePreviewUrl ? (
            <ProfilePhoto className="just-image" src={imagePreviewUrl} />
          ) : (
            <ProfilePhoto className="just-image" src={currentImage} />
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

          {/* <button className="uploadImage " type="submit">
            Upload Image
          </button> */}
        </div>
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
