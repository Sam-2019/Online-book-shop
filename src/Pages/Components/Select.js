import React from "react";
import axios from "axios";
import { locations } from "../endpoints";
import "./select.css";

const Select = () => {
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState("Pick your location");
  const [items, setItems] = React.useState([]);

  let offset = "5f665c1eb29f36.64067252";

  var formData = new FormData();
  formData.set("buyer_unique_id", offset);

  React.useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const response = await axios({
        method: "post",
        url: locations,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const body = await response.data;
      console.log(body);

      if (!unmounted) {
        setItems(
          body.data.map(({ location, unique_id, fee, disabled }) => ({
            uniqueID: unique_id,
            label: location,
            value: location,
            fee: fee,
            disable: disabled,
          }))
        );
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <select
      autoFocus
      required
      disabled={loading}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      {items.map(({ label, value, fee, uniqueID, disable }) => (
        <option key={value} value={value} disabled={disable}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
