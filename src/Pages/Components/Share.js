import React from "react";
import "./icons.css";

const Share = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      className="bi bi-share-fill"
      viewBox="0 0 16 16"
      id="share-fill"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5z" />{" "}
    </svg>
  );
};

export default Share;
