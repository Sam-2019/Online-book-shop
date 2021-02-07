import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("axios");

import Select from "../Pages/Components/Select";

describe("Select", () => {
  test("fetches data from an API and displays them", async () => {
    // const data = [
    //   {
    //     id: "0",
    //     unique_id: "0",
    //     location: "Pick your location",
    //     fee: "0.00",
    //     disabled: true,
    //   },
    //   {
    //     id: "1",
    //     unique_id: "5f97102cd9ba86.00000001",
    //     location: "Community 1",
    //     fee: "7.00",
    //     disabled: false,
    //   },
    //   {
    //     id: "2",
    //     unique_id: "5f97102cd9ba86.00000002",
    //     location: "Community 2",
    //     fee: "7.00",
    //     disabled: false,
    //   },
    // ];

    render(<Select />);

    await screen.findByText(/Pick your location/);

    expect(screen.queryByText(/Pick your location/)).toBeNull();

    fireEvent.change(screen.getByRole("select"), {
      target: { value: "Pick your location" },
    });
    
    expect(screen.getByText(/Pick your location/)).toBeInTheDocument();
  });
});
