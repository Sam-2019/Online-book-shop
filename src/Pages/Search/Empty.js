import React from "react";
import { useLocation } from "react-router-dom";
import GroupComponent from "../Components/GroupComponent";

const Empty = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  return (
    <div className="search-page">
      <GroupComponent />

      <p className="text-3">No item was found for "{desktopQuery}"</p>
    </div>
  );
};

export default Empty;
