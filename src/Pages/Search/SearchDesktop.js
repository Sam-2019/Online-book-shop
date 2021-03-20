import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import SearchData from "./searchData";
import Placeholder from "../Placeholders/Products";
import { MediaQuery, axiosMethod, backendData } from "../helper";
import { itemSearch } from "../endpoints";
import "./search.css";

const Search = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  var formData = new FormData();
  formData.set("search_phrase", desktopQuery);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["searchWhat", itemSearch, formData],
    () => backendData(itemSearch, formData),
    {
 
    }
  );

  console.log(status);

  return (
    <div className="search-wrapper ">
      <div className="header">Hllo</div>

      <div className="main">
        <div className="title-makeshift ">
          <div>
            {status === "loading" ? (
              <Placeholder />
            ) : (
       null      // <SearchData data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
