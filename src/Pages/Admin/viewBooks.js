import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../graphQL functions";

const AllBooks = ({ closeform, data }) => {

  return (
    <div id="admin-form-wrapper">
      <div className="product-container">
        <Products data={data} />
      </div>

      <div className="button-wrapper">
        <button onClick={closeform} className="cancelForm-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AllBooks;

const Products = ({ data }) => {
  const content = data.products;

  return (
    <div className="product-view">
      {content.map((items, index) => (
        <BookItem key={index} {...items} />
      ))}
    </div>
  );
};

const BookItem = ({ imageURL, name, id }) => {
  const [
    deleteProduct,
    { loading: productLoading, error: productError, data: productData },
  ] = useMutation(DELETE_PRODUCT);

  const onDelete = () => {
    deleteProduct({
      variables: {
        id: String(id),
      },
    });

    if (productError) {
    }
  };

  return (
    <div onClick={onDelete} className="product-item">
      <img src={imageURL} alt="book" className="book-image" />
      <p>{name}</p>
    </div>
  );
};
