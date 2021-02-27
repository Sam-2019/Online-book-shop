import React, { useEffect, useState } from "react";
import CartItem from "./cartItem";

const CartMain = ({ data }) => {
  const [formData, setFormData] = useState("");
  const [checked, setChecked] = useState([]); //cart items from DB
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData(new FormData());
    onFormSubmit();
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

    var data = formData.get("categories");
    console.log(data);
  };

  function onFormSubmit(messagE) {
    setMessage(messagE);
  }
  return (
    <div>
      {/* {Array(5)
        .fill()
        .map((items, i) => (
          <CartItem
            key={i}
            {...items}
            handleToggle={handleToggle}
            onFormSubmit={onFormSubmit}
          />
        ))} */}

      {data.map((items, index) => (
        <CartItem
          key={index}
          {...items}
          handleToggle={handleToggle}
          onFormSubmit={onFormSubmit}
        />
      ))}
    </div>
  );
};

export default CartMain;
