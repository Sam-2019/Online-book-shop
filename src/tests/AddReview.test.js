import React from "react";
import { render } from "@testing-library/react";

import AddReview from "../Pages/Product/addReview";

describe("AddReview", () => {
  test("renders App component", () => {
    render(<AddReview />);
  });
});
