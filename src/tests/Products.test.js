import React from "react";
import { render } from "@testing-library/react";

import Products from "../Pages/Product/Products";

describe("Products", () => {
  test("renders App component", () => {
    render(<Products />);
  });
});
