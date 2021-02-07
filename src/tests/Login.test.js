import React from "react";
import { render } from "@testing-library/react";

import Login from "../Pages/User/Login";

describe("Login", () => {
  test("renders App component", () => {
    render(<Login />);
  });
});
