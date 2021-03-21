import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import Back from "../Components/Back";
import SearchIcon from "../Components/Search";
import Close from "../Components/Close";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import SearchData from "./searchData";
import SearchBox from "./Searchbox";
import Placeholder from "../Placeholders/Products";
import { MediaQuery, axiosMethod, backendData } from "../helper";
import { itemSearch } from "../endpoints";
import GroupComponent from "../Components/GroupComponent";
import "./search.css";

const Search = () => {
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  const [state, setState] = React.useState(true);
  const [query, setQuery] = React.useState("");

  const [queryResult, setQueryResult] = React.useState([]);

  const queryClient = useQueryClient();

  const { width } = MediaQuery();
  const breakpoint = 280;

  // const find = async () => {
  //   queryClient.invalidateQueries("searchContent");

  //   var formData = new FormData();
  //   formData.set("search_phrase", query);

  //   const { data } = await axiosMethod("post", itemSearch, formData);

  //   console.log(data);

  //   if (!data.error) {
  //     setQueryResult(data.data);
  //     setState(false);
  //   }

  //   if (data.error) {
  //     setQueryResult([]);
  //     setQuery("");
  //   }
  // };

  return (
    <div className="search-wrapper ">
      <div className="header">
        {state ? (
          <>
            <div className="object-1">
              <Back width={30} height={30} />
            </div>
            <div className="category2 ">
              <SearchBox action={setQuery(false)} />

              <div className="object-4 cart ">
                <Close
                  width={breakpoint < width ? 30 : 20}
                  height={breakpoint < width ? 30 : 20}
                  action={() => {
                    setState(false);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="category">
              <div className="object-1">
                <Back width={30} height={30} />
              </div>

              <div className="object-2">
                <div className="search-text">
                  {query !== "" ? (
                    <> Search Results for "{query}"</>
                  ) : (
                    <> Search Results</>
                  )}
                </div>
              </div>
            </div>
            <div className="category">
              <div className="object-4 cart ">
                <SearchIcon
                  width={breakpoint < width ? 30 : 20}
                  height={breakpoint < width ? 30 : 20}
                  action={() => {
                    setState(true);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="main">
        <div className="search-page">
          <GroupComponent />
          {/* <div className="text-1">   Sorry we couldn't find any matches for lkmhl;mrl;hm4;lml;hm4;l5hm  </div>
          <p className="text-2">Please try searching with another term</p> */}
          <p className="text-3">Search</p>
        </div>

        {queryResult ? <SearchData data={queryResult} /> : <Placeholder />}
      </div>
    </div>
  );
};

export default Search;
