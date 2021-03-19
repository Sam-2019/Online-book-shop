import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import Cart from "../Components/Cart";
import User from "../Components/User";
import Search from "../Components/Search";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Justify from "../Components/Justify";
import Close from "../Components/Close";
import { MediaQuery } from "../helper";

import "./navigation.css";

const Navigation = ({ toggle }) => {
  const [state, setState] = React.useState(false);
  const [query, setQuery] = React.useState("");

  let history = useHistory();
  const { width } = MediaQuery();

  const breakpoint = 280;
  const queryClient = useQueryClient();

  function navSearch() {
    if (query === "") {
    } else {
      history.push(`/search?q=${query}`);
      queryClient.invalidateQueries("searchContent");
    }
  }

  function newSearch() {
    history.push("/search");
  }

  return (
    <header className="nav-header ">
      <>
        <div className="category ">
          <Justify
            width={breakpoint < width ? 30 : 20}
            height={breakpoint < width ? 30 : 20}
            action={toggle}
          />
          <div className=" okukus ">OKUKUS</div>
        </div>

        {width > 540 ? (
          <>
            <div className="category ">
              <Input
                type="search"
                class_name="header-input  "
                placeholder="Search"
                value={query}
                action={(e) => setQuery(e.target.value)}
              />

              <Button
                name="Search"
                class_name="header-primary2"
                action={navSearch}
              />
            </div>
          </>
        ) : null}

        <div className="category item">
          {width < 540 ? (
            <>
              <div className="object-3 search  ">
                <Search
                  width={breakpoint < width ? 30 : 20}
                  height={breakpoint < width ? 30 : 20}
                  action={newSearch}
                />
              </div>
            </>
          ) : null}

          <div className="object-4 cart  ">
            <Cart
              width={breakpoint < width ? 30 : 20}
              height={breakpoint < width ? 30 : 20}
              action={() => {
                history.push("/cart");
              }}
            />
          </div>

          <div className="object-4 user  ">
            <User
              width={breakpoint < width ? 30 : 20}
              height={breakpoint < width ? 30 : 20}
              action={() => {
                history.push("/user/profile");
              }}
            />
          </div>

          <div
            className="object-4 user  "
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </div>
        </div>
      </>
    </header>
  );
};

export default Navigation;

Navigation.propTypes = {};
