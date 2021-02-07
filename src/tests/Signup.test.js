import React from "react";
import { render } from "@testing-library/react";

import Signup from "../Pages/User/Signup";

describe("Signup", () => {
  test("renders App component", () => {
    render(<Signup />);
  });
});
