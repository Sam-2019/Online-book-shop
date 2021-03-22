import React from "react";
import { useLocation } from "react-router-dom";
import GroupComponent from '../Components/GroupComponent'

const Empty = ({ message }) => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  return (
    <div className="search-page">
      <GroupComponent />
      {/* <div className="text-1">   Sorry we couldn't find any matches for lkmhl;mrl;hm4;lml;hm4;l5hm  </div>
    <p className="text-2">Please try searching with another term</p> */}

      <p className="text-3">No item was found for "{desktopQuery}"</p>);
    </div>
  );
};

export default Empty;
