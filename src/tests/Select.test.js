import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("axios");

import Select from "../Pages/Components/Select";

describe("Select", () => {
  test("render Select component", () => {
    render(<Select />);

    // expect(screen.getByRole("combobox")).toBeInTheDocument();
    //    expect(screen.queryByText(/Pick your location/)).toBeNull();

     fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Pick your location" },
    });

    //   expect(await screen.findByText(/Pick your location/)).toBeInTheDocument();
  });
});
