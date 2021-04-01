import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import ProfilePhoto from "../../Components/Profile Photo";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import { profileImageAdd } from "../../endpoints";
import { useData } from "../../Context";
import { Spacer } from "../../styles";
import { fetch } from "../../helper";
import "./change.css";

const ProfiilePhotoUpdate = ({ close }) => {
  const { profileImage, uniqueID } = useData();

  const [change, setChange] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [imagePreviewUrl, setimagePreviewUrl] = React.useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formData = new FormData();

  const queryClient = useQueryClient();
  const mutation = useMutation((formData) => {
    return fetch(profileImageAdd, formData);
  });

  const notify = (data) => {
    toast.success(data);
  };

  const openBox = () => {
    setChange(!change);
  };

  const Change = (e) => {
    // console.log("clicked!!!");
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

    //console.log(file);
    formData.set("buyer_unique_id", uniqueID);
    formData.append("file_profile_photo", file);

    try {
      const data = await mutation.mutateAsync(formData);
      // console.log(data);
      // setMessage(data.message);
      notify(data.message);
      setLoading(false);
      queryClient.invalidateQueries("profileImage");
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.invalidateQueries("profileImage");

      close();
    }

    // const response = await axios({
    //   method: "post",
    //   url: profileImageAdd,
    //   data: formData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    // if (response) {
    //   setLoading(false);
    //   console.log(response);
    // }
  };

  return (
    <form>
      <div className="image-holder">
        <div className="holdImage">
          {imagePreviewUrl ? (
            <ProfilePhoto className="just-image" src={imagePreviewUrl} />
          ) : (
            <ProfilePhoto
              className="just-image"
              src={`https://okukus.com/${profileImage}`}
            />
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
