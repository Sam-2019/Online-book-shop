import React from "react";
import { useLocation } from "react-router-dom";
import Back from "../Components/Back";
import SearchIcon from "../Components/Search";
import Close from "../Components/Close";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Products from "../Product/Products";
import { MediaQuery } from "../helper";
import "./search.css";

const Search = () => {
  let query = new URLSearchParams(useLocation().search).get("q");

  const { width } = MediaQuery();
  const breakpoint = 280;

  const [state, setState] = React.useState(false);
  const [newQuery, setNewQuery] = React.useState("");

  return (
    <div className="search-wrapper ">
      <div className="header">
        {state ? (
          <>
            <div className="object-1">
              <Back width={30} height={30} />
            </div>
            <div className="category2 ">
              <Input
                class_name="header-input  "
                placeholder="Search"
                value={newQuery}
                action={(e) => setNewQuery(e.target.value)}
              />

              <Button name="Search" class_name="header-primary2" />

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
                  Search Results for "l;k'ohkoptrkopektypoj"
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
        {/* <div className="title-makeshift ">Search Results for "{query}"</div> */}
        <Products />
      </div>
    </div>
  );
};

export default Search;
