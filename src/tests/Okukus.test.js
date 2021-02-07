import React from "react";
import { render, screen } from "@testing-library/react";

import Okukus from "../Pages/Okukus";

describe("Okukus", () => {
  test("renders App component", () => {
    render(<Okukus />);

    expect(screen.queryByText('OKUKUS')).toBeNull();
  });
});
