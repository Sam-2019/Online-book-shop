import React from "react";
import { render } from "@testing-library/react";

import Password from "../Pages/User/Password";

describe("Password", () => {
  test("renders App component", () => {
    render(<Password />);
  });
});
