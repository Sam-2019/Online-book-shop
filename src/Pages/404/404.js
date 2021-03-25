import React from "react";
import SVGContainer from "../SVGs/SVGcontainer";
import SVG404 from "../SVGs/404 svg";
import Button from "../Components/Button";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  let history = useHistory();
  return (
    <div className="not-found-wrapper">
      <div className="main">
        <SVGContainer>
          <SVG404 />

          {/* <p className="text-3">
            It looks like we can't find the page that you requested.
          </p>

          <p className="text-3">Please, go back and try again!</p> */}

          <p className="text-3">
            Sorry we're unable to find the page you're looking for.
          </p>

          <Button
            name="Go home"
            class_name="primary"
            action={() => {
              history.push("/");
            }}
          />
        </SVGContainer>
      </div>
    </div>
  );
};

export default NotFound;
