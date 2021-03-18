import { BrowserRouter as Router } from "react-router-dom";
import { MediaQuery } from "./helper";

import Mobile from "./Mobile Okukus";
import Desktop from "./Desktop Okukus";

const breakpoint = 540;

const Okukus = () => {
  const { width } = MediaQuery();

  return <Router>{width > breakpoint ? <Desktop /> : <Mobile />}</Router>;
};

export default Okukus;
