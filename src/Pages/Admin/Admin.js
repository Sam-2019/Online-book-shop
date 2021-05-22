import React from "react";
import { useQuery } from "@apollo/client";
import AddBookForm from "./addProductForm";
import ViewBooks from "./viewBooks";
import Button from "../Components/Button";

import { GET_PRODUCTS } from "../graphQL functions";

import "./styles.css";

const Admin = () => {
  const [form, setForm] = React.useState(false);
  const [books, setBooks] = React.useState(false);

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  console.log(data);

  return (
    <div className="admin-wrapper">
      <div className="admin-page">
        <Button
          action={() => setForm(true)}
          class_name="admin-buttons "
          name="Add Book"
        />

        <Button
          action={() => setBooks(true)}
          class_name="admin-buttons "
          name="All Books"
        />
      </div>
      {form && <AddBookForm closeform={() => setForm(false)} />}
      {books && <ViewBooks closeform={() => setBooks(false)} data={data} />}
    </div>
  );
};

export default Admin;
