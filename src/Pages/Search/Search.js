import React from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "../graphQL functions";
import Back from "../Components/Back";
import SearchIcon from "../Components/Search";
import Close from "../Components/Close";
import SearchData from "./searchData";
import SearchBox from "./Searchbox";
import SearchSVG from "../SVGs/new-search";
import SVGContainer from "../SVGs/SVGcontainer";
import Placeholder from "../Placeholders/Products";
import { MediaQuery } from "../helper";
import NoResult from "./No Result";
import "./search.css";

const Search = () => {
  const [state, setState] = React.useState(true);
  const [searchItem, setSearchItem] = React.useState("");
  const text = String(searchItem);

  const [search, { loading, data }] = useLazyQuery(SEARCH);

  const { width } = MediaQuery();
  const breakpoint = 280;

  let view;

  if (data === undefined) {
    return (
      <div className="search-wrapper ">
        <div className="header">
          {state ? (
            <>
              <div className="object-1">
                <Back width={30} height={30} />
              </div>
              <div className="category2">
                <SearchBox
                  input={searchItem}
                  setInput={(e) => setSearchItem(e.target.value)}
                  action={() => search({ variables: { text } })}
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
                  <div className="search-text"></div>
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
          <SVGContainer>
            <SearchSVG />
            <p className="text-3">Search</p>
          </SVGContainer>
        </div>
      </div>
    );
  }

  if (loading === true) {
    view = <Placeholder />;
  }

  if (data.search.length === 0) {
    view = <NoResult />;
  }

  if (data.search.length > 0) {
    view = <SearchData data={data.search} />;
  }

  return (
    <div className="search-wrapper ">
      <div className="header">
        {state ? (
          <>
            <div className="object-1">
              <Back width={30} height={30} />
            </div>
            <div className="category2">
              <SearchBox
                input={searchItem}
                setInput={(e) => setSearchItem(e.target.value)}
                action={() => search({ variables: { text } })}
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
                <div className="search-text"></div>
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

      <div className="main">{view}</div>
    </div>
  );
};

export default Search;
