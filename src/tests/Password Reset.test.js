import React from "react";
import { render } from "@testing-library/react";

import PasswordReset from "../Pages/User/Password Reset";

describe("PasswordReset", () => {
  test("renders App component", () => {
    render(<PasswordReset />);
  });
});
