import React from "react";
import axios from "axios";
import ProfilePhoto from "./Profile Photo";
import {
  buyerID,
  profileImageAdd,
  profileImageGet,
  okukus,
} from "../endpoints";
import "./profilePhoto.css";

const ProfiilePhotoUpdate = () => {
  const [change, setChange] = React.useState(false);

  const [imagePreviewUrl, setimagePreviewUrl] = React.useState("");
  const [currentImage, newImage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const formData = new FormData();

  formData.set("buyer_unique_id", buyerID);

  const openBox = () => {
    setChange(!change);
  };

  const update = async (e) => {
    setLoading(true);
    e.preventDefault();

    let reader = new FileReader();
    let pic = e.target.files[0];

    reader.onloadend = () => {
      setimagePreviewUrl(reader.result);
    };

    formData.append("file_profile_photo", pic);

    const { data } = await axios({
      method: "post",
      url: profileImageAdd,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data.error === false) {
      setLoading(false);
      reader.readAsDataURL(pic);
    } else if (data.error === true) {
      setLoading(false);
    }
  };

  //{error: true, message: "JPG, JPEG, & PNG files are allowed to upload."}

  React.useEffect(() => {
    const userImage = async () => {
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

    userImage();
  }, []);

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
    </>
  );
};

export default ProfiilePhotoUpdate;
