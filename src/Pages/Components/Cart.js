import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Cart = ({ width, height, action }) => {
  return (
    <svg
    fill="currentColor"
      className="bi bi-cart3"
      viewBox="0 0 16 16"
      id="cart3"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path d="M0 1.5A.5.5 0 01.5 1H2a.5.5 0 01.485.379L2.89 3H14.5a.5.5 0 01.49.598l-1 5a.5.5 0 01-.465.401l-9.397.472L4.415 11H13a.5.5 0 010 1H4a.5.5 0 01-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 01-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-7 1a1 1 0 110 2 1 1 0 010-2zm7 0a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
};

export default Cart;

Cart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};


