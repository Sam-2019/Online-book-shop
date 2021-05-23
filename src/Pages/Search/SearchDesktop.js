import React from "react";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../graphQL functions";
import { useLocation } from "react-router-dom";
import SearchData from "./searchData";
import NoResult from "./No Result";
import Placeholder from "../Placeholders/Products";
import "./search.css";

const Search = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");
  const text = String(desktopQuery);

  const { loading, data } = useQuery(SEARCH, {
    variables: { text },
  });

  let view;

  if (loading) {
    return (
      <div className="search-wrapper ">
        <div className="main">
          <div className="title-makeshift ">
            <Placeholder />
          </div>
        </div>
      </div>
    );
  }

  if (data.search.length === 0) {
    view = <NoResult />;
  }

  if (data.search.length > 0) {
    view = <SearchData data={data.search} />;
  }

  return (
    <div className="search-wrapper ">
      <div className="main">
        <div className="title-makeshift">{view}</div>
      </div>
    </div>
  );
};

export default Search;
