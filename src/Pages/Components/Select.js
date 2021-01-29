import React, { useState, useEffect } from "react";
import axios from "axios";
import { locations } from "../endpoints";
import "./select.css";

// const selection = [
//   {
//     id: 0,
//     name: "Pick your location",
//     disable: true,
//     default: "Pick your location",
//   },
//   {
//     id: 1,
//     name: "Comm 1",
//   },
//   {
//     id: 2,
//     name: "Comm 2",
//   },
//   {
//     id: 3,
//     name: "Comm 3",
//   },
//   {
//     id: 4,
//     name: "Other",
//   },
// ];

const Select = () => {
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = useState("Pick your location");
  const [items, setItems] = React.useState([]);

  let offset = "5f665c1eb29f36.64067252";

  var formData = new FormData();
  formData.set("buyer_unique_id", offset);

  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const response = await axios({
        method: "post",
        url: locations,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const body = await response.data;

      if (!unmounted) {
        setItems(
          body.data.map(({ location, unique_id, fee }) => ({
            uniqueID: unique_id,
            label: location,
            value: location,
            fee: fee,
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
    <>
      <h1>Select</h1>

      {/* Sever-side data */}
      <select
        disabled={loading}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {items.map(({ label, value, fee, uniqueID }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;

// (3) [{…}, {…}, {…}]
// 0: {id: 0, unique_id: 0, location: "Pick your location", fee: 0, disabled: true, …}
// 1: {id: "1", unique_id: "5f97102cd9ba86.00000001", location: "Community 1", fee: "7.00", datetime_created: "2020-11-13 00:00:00"}
// 2: {id: "2", unique_id: "5f97102cd9ba86.00000002", location: "Community 2", fee: "7.00", datetime_created: "2020-11-13 00:00:00"}
// length: 3
// __proto__: Array(0)

// (3) [{…}, {…}, {…}]
// 0:
// default: "Pick your location"
// disabled: true
// fee: 0
// id: 0
// location: "Pick your location"
// unique_id: 0
// __proto__: Object
// 1:
// datetime_created: "2020-11-13 00:00:00"
// fee: "7.00"
// id: "1"
// location: "Community 1"
// unique_id: "5f97102cd9ba86.00000001"
// __proto__: Object
// 2:
// datetime_created: "2020-11-13 00:00:00"
// fee: "7.00"
// id: "2"
// location: "Community 2"
// unique_id: "5f97102cd9ba86.00000002"
// __proto__: Object
// length: 3
// __proto__: Array(0)
