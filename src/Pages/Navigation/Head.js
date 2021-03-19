import React from "react";
import Drawer from "react-motion-drawer";
import Tag from "../Tags/Tags";

import Navigation from "./Navigation";
import "./navigation.css";

function Nav() {
  const [show, hide] = React.useState(false);

  function Toggle() {
    hide(!show);
  }
  return (
    <>
      <Drawer open={show} width={300} onChange={Toggle}
       className="hamburger">
        {(val) => <Tag toggle={Toggle} />}
      </Drawer>

      <Navigation toggle={Toggle} />
    </>
  );
}
export default Nav;
