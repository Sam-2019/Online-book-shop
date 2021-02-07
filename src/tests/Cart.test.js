import React from "react";
import { render } from "@testing-library/react";

import Cart from "../Pages/Cart/Cart";

describe("Cart", () => {
  test("renders App component", () => {
    render(<Cart />);

    // let { id } = useParams();
   // Error: Uncaught [TypeError: Cannot read property 'match' of undefined]
  });
});
