import React from "react";
import { render } from "@testing-library/react";

import Navigation from "../Pages/Navigation/Navigation";

describe("Navigation", () => {
  test("renders App component", () => {
    render(<Navigation />);
  });
});
