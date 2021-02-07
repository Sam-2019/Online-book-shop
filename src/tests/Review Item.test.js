import React from "react";
import { render } from "@testing-library/react";

import ReviewItem from "../Pages/Review/reviewItem";

describe("ReviewItem", () => {
  test("renders App component", () => {
    render(<ReviewItem />);
  });
});
