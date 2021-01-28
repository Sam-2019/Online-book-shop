import React, { useState, useCallback, useEffect } from "react";
import { locations } from "./endpoints";
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
  const [selectedOption, setSelectedOption] = useState("");
  const [userInput, setUserInput] = useState(false);

  const [selected, setSelected] = useState("Pick your location");
  const [otherSelected, setOtherSelected] = useState(false);

  let offset 

  useEffect(() => {
    const fetchData = async () => {
      var formData = new FormData();
      formData.set("buyer_unique_id", offset);
      const result = await axios({
        method: "post",
        url: locations,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result);
    };
    fetchData();
  }, []);

  const activateInput = useCallback(() => {
    if (selectedOption === "Other") {
      setUserInput(true);
    } else {
      setUserInput(false);
    }
  }, [selectedOption]);

  const otherInput = useCallback(() => {
    if (selected === "Other") {
      setOtherSelected(true);
    } else {
      setOtherSelected(false);
    }
  }, [selected]);

  useEffect(() => {
    otherInput();
    activateInput();
  }, [otherInput, activateInput]);

  return (
    <>
      <h1>Select</h1>

      {/* Hard-coded data */}
      <select
        className="select"
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          activateInput();
        }}
      >
        <option value="" disabled defaultValue>
          Select a payment method
        </option>
        <option value="Cash">Cash</option>
        <option value="Momo">Momo</option>
        <option value="Other">Other</option>
      </select>

      <div className="text">{selectedOption}</div>

      {userInput ? <input type="text" /> : null}

      {/* Sever-side data */}
      <select
        className=""
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          otherInput();
        }}
      >
        {selection.map((item) => (
          <option
            key={item.id}
            value={item.name}
            disabled={item.disable}
            defaultValue={item.default}
          >
            {item.name}
          </option>
        ))}
      </select>

      {/* <div className="text">{selected}</div> */}

      {otherSelected ? <input type="text" /> : null}
    </>
  );
};

export default Select;
