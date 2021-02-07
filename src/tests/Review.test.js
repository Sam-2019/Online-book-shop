import React from "react";
import { render } from "@testing-library/react";

import Review from "../Pages/Review/Review";

describe("Review", () => {
  test("renders App component", () => {
    render(<Review />);
  });
});
