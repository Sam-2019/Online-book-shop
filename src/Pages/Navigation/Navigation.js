import React from "react";
import { useHistory } from "react-router-dom";
import Cart from "../Components/Cart";
import User from "../Components/User";
import Search from "../Components/Search";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "./navigation.css";
import Close from "../Components/Close";
import { MediaQuery } from "../helper";

const Navigation = () => {
  const [state, setState] = React.useState(false);
  const [query, setQuery] = React.useState("");

  let history = useHistory();
  const { width } = MediaQuery();

  const breakpoint = 280;

  return (
    <header className="nav-header ">
      {state ? (
        <div className="category2 ">
          <Input
            class_name="header-input  "
            placeholder="Search"
            value={query}
            action={(e) => setQuery(e.target.value)}
          />

          <Button
            name="Search"
            class_name="header-primary2"
            action={() => {
              if (query === "") {
              } else {
                history.push(`/search?q=${query}`);
              }
            }}
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
      ) : (
        <>
          <div className="category">
            <div className=" okukus ">OKUKUS</div>
          </div>

          <div className="category ">
            <div className="object-3 search ">
              <Search
                width={breakpoint < width ? 30 : 20}
                height={breakpoint < width ? 30 : 20}
                action={() => {
                  setState(true);
                }}
              />
            </div>

            <div className="object-4 cart ">
              <Cart
                width={breakpoint < width ? 30 : 20}
                height={breakpoint < width ? 30 : 20}
                action={() => {
                  history.push("/cart");
                }}
              />
            </div>

            {/* <div className="object-4 user ">
              <User
                width={breakpoint < width ? 30 : 20}
                height={breakpoint < width ? 30 : 20}
                action={() => {
                  history.push("/user/profile");
                }}
              />
            </div> */}

            <div
              className="object-4 user "
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navigation;

Navigation.propTypes = {};
