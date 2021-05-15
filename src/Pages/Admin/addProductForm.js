import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../graphQL functions";
import { TextArea, Input } from "../Components/Input";

const AddBookForm = ({ closeform }) => {
  const [name, setName] = React.useState("");
  const [sku, setSku] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [error, setError] = React.useState(false);

  const [
    addProduct,
    { loading: productLoading, error: productError, data: productData },
  ] = useMutation(ADD_PRODUCT);

  const onSubmit = () => {
    console.log(name);
    addProduct({
      variables: {
        name: String(name),
        sku: String(sku),
        price: String(price),
        imageURL: String(imageURL),
        quantity: Number(quantity),
        author: String(author),
        detail: String(detail),
      },
    });

    if (productError) {
      return setError(true);
    } else {
      closeform();
    }
  };
  return (
    <div id="admin-form-wrapper">
      <form id="admin-form">
        <Input
          class_name="input "
          value={name}
          placeholder="Name"
          action={(e) => setName(e.target.value)}
          type="text"
        />

        <div style={{ display: "flex", padding: "0 0 12px 0" }}>
          <div style={{ width: "50%", margin: "0 15px 0 0" }}>
            {" "}
            <Input
              class_name="input "
              value={sku}
              placeholder="Sku"
              action={(e) => setSku(e.target.value)}
              type="text"
            />
          </div>

          <div style={{ width: "50%" }}>
            <Input
              class_name="input "
              value={author}
              placeholder="Author"
              action={(e) => setAuthor(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <div style={{ display: "flex", padding: "0 0 12px 0" }}>
          <div style={{ width: "50%", margin: "0 15px 0 0" }}>
            <Input
              class_name="input "
              value={price}
              placeholder="Price"
              action={(e) => setPrice(e.target.value)}
              type="text"
            />
          </div>

          <div style={{ width: "50%" }}>
            <Input
              class_name="input "
              value={quantity}
              placeholder="Quantity"
              action={(e) => setQuantity(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <Input
          class_name="input "
          value={imageURL}
          placeholder="ImageUrl"
          action={(e) => setImageURL(e.target.value)}
          type="text"
        />
        <TextArea
          class_name="text-input "
          value={detail}
          placeholder="Detail"
          action={(e) => setDetail(e.target.value)}
          type="text"
        />

        {error && <span>{productError}</span>}

        <div className="button-wrapper">
          <button onClick={onSubmit} className="submitForm-button">
            Submit
          </button>
          <button onClick={closeform} className="cancelForm-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
