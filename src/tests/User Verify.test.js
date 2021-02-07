import React from "react";
import { render } from "@testing-library/react";

import UserVerify from "../Pages/User/User Verify";

describe("UserVerify", () => {
  test("renders App component", () => {
    render(<UserVerify />);
  });
});
