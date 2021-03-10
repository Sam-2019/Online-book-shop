import React from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import ProfilePhoto from "./Profile Photo";
import {
  buyerID,
  profileImageAdd,
  profileImageGet,
  okukus,
} from "../endpoints";
import { useData } from "../Context";
import "./profilePhoto.css";

const ProfiilePhotoUpdate = () => {
  const [change, setChange] = React.useState(false);
  const [imagePreviewUrl, setimagePreviewUrl] = React.useState("");
  //const [currentImage, newImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const formData = new FormData();

  const { profileImage } = useData();
  const queryClient = useQueryClient();

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
      console.log(data);
      queryClient.invalidateQueries("userImage");
    } else if (data.error === true) {
      setLoading(false);
    }
  };

  //{error: true, message: "JPG, JPEG, & PNG files are allowed to upload."}

  // React.useEffect(() => {
  //   const userImage = async () => {
  //     const { data } = await axios({
  //       method: "post",
  //       url: profileImageGet,
  //       data: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (data.error === false && data.message === "account found") {
  //       newImage(`${okukus}/${data.data.profile_photo_url}`);
  //     }
  //   };

  //   userImage();
  // }, []);

  return (
    <>
      <div className="containerWar">
        <div className="">
          {imagePreviewUrl ? (
            <ProfilePhoto className="just-image" src={imagePreviewUrl} />
          ) : (
            <ProfilePhoto className="just-image" src={profileImage} />
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
