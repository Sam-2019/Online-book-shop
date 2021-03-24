import React from "react";
import { useLocation } from "react-router-dom";
import SearchData from "./searchData";
import NoResult from "./No Result";
import Placeholder from "../Placeholders/Products";
import { useAsync2 } from "../helper";
import { itemSearch } from "../endpoints";
import "./search.css";

const Search = () => {
  let activePage;
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  const result = useAsync2("search_phrase", itemSearch, desktopQuery);
  console.log(result.loading);

  switch (result.message) {
    case "no results found":
      activePage = <NoResult />;
      break;
    case "results found":
      activePage = <SearchData data={result.value} />;
      break;
    default:
      activePage = <Placeholder />;
  }

  return (
    <div className="search-wrapper ">
      <div className="main">
        <div className="title-makeshift ">
          <div>
            {/* {status === "loading" ? (
              <Placeholder />
            ) : null // <SearchData data={data} />
            } */}

            {result.loading ? <Placeholder /> : <>{activePage}</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
