import React from "react";
import { useLocation } from "react-router-dom";
import SVGContainer from "../SVGs/SVGcontainer";
import SearchSVG from "../SVGs/new-search";

const NoResult = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  return (
    <SVGContainer>
      <SearchSVG />
      <p className="text-3">
        Sorry we couldn't find any matches for <b>{desktopQuery}</b>
      </p>
    </SVGContainer>
  );
};

export default NoResult;
