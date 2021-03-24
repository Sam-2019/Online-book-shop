import React from "react";
import { useLocation } from "react-router-dom";
import SearchSVG from "../Components/SearchSVG";

const Empty = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  return (
    <div className="empty-page">
      <SearchSVG />

      <p className="text-3">
        Sorry we couldn't find any matches for <b>{desktopQuery}</b>
      </p>
      {/* <article className="text-3">
        Please try searching for another item
      </article> */}
    </div>
  );
};

export default Empty;
