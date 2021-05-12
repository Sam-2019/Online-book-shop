import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartData = () => {
  const [formData, setFormData] = useState("");
  const [checked, setChecked] = useState([]); //cart items from DB

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);

    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    setChecked(all);
    formData.set("categories", all);
    console.log(all);
    // var data = formData.get("categories");
  };

  return <div></div>;
};

export default CartData;

CartData.propTypes = {};
