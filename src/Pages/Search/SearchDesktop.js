import React from "react";
import { useLocation } from "react-router-dom";
import SearchData from "./searchData";
import NoResult from "./No Result";
import Placeholder from "../Placeholders/Products";
import "./search.css";

const Search = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  //const formData = React.useMemo(() => new FormData(), []);



  return (
    <div className="search-wrapper ">
      <div className="main">
        <div className="title-makeshift ">
          {result.loading ? <Placeholder /> : null}

          {result.message === "no results found" ? <NoResult /> : null}

          {result.message === "results found" ? (
            <SearchData data={result.value} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
