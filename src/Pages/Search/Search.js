import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import Back from "../Components/Back";
import SearchIcon from "../Components/Search";
import Close from "../Components/Close";
import SearchData from "./searchData";
import SearchBox from "./Searchbox";

import Placeholder from "../Placeholders/Products";
import { MediaQuery, axiosMethod } from "../helper";
import { itemSearch } from "../endpoints";
import SearchSVG from "../SVGs/new-search";
import SVGContainer from "../SVGs/SVGcontainer";
import NoResult from "./No Result";
import "./search.css";

const Search = () => {
  let activePage;
  let history = useHistory();
  const desktopQuery = new URLSearchParams(useLocation().search).get("q");

  const [state, setState] = React.useState(true);
  const [message, setMessage] = React.useState();
  const [query, setQuery] = React.useState([]);

  const [searchItem, setSearchItem] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { width } = MediaQuery();
  const breakpoint = 280;

  const formData = React.useMemo(() => new FormData(), []);
  formData.set("search_phrase", desktopQuery);

  const find = async () => {
    setLoading(true);
    if (query === "") {
      // alert();
    } else {
      history.push(`/search?q=${searchItem}`);

      const { data } = await axiosMethod("post", itemSearch, formData);

      if (data) {
        setMessage(data.message);
        setQuery(data.data);
        setLoading(false);
      }
    }
  };

  switch (message) {
    case "no results found":
      activePage = <NoResult />;
      break;
    case "results found":
      activePage = <SearchData data={query} />;
      break;
    default:
      activePage = (
        <SVGContainer>
          <SearchSVG />
          <p className="text-3">Search</p>
        </SVGContainer>
      );
  }

  return (
    <div className="search-wrapper ">
      <div className="header">
        {state ? (
          <>
            <div className="object-1">
              <Back width={30} height={30} />
            </div>
            <div className="category2 ">
              <SearchBox
                action={find}
                input={searchItem}
                setInput={(e) => setSearchItem(e.target.value)}
              />

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
                  {desktopQuery !== "" ? (
                    <> Search Results for "{desktopQuery}"</>
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
        {loading ? <Placeholder /> : <>{activePage}</>}
      </div>
    </div>
  );
};

export default Search;
