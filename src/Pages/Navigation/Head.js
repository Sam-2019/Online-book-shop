import React, { Fragment } from "react";
import Drawer from "react-motion-drawer";
import Tag from "../Tags/Tags";
import { slide as Menu } from "react-burger-menu";
import Navigation from "./Navigation";
import "./navigation.css";

function Nav() {
  const [show, hide] = React.useState(false);

  function Toggle() {
    hide(!show);
  }
  return (
    <Fragment>
      <Drawer
        open={show}
        width={300}
        noTouchOpen={true}
        noTouchClose={true}
        handleWidth={10}
        peakingWidth={100}
        panTolerance={20}
        offset={0}
        className="hamburger"
        overlayClassName="blue"
        overlayColor="rgba(52, 52, 52, 0.866)"
      >
        {(val) => <Tag toggle={Toggle} />}
      </Drawer>

      {/* <Show pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}

      <Navigation toggle={Toggle} />
    </Fragment>
  );
}
export default Nav;

const Show = ({ props }) => {
  return (
    <Menu {...props}>
      <Tag />
    </Menu>
  );
};
