import React from "react";
import { render } from "@testing-library/react";

import CartItem from "../Pages/Cart/cartItem";

describe("CartItem", () => {
  test("renders App component", () => {
    render(<CartItem />);
  });
});
