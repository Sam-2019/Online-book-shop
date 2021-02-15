import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { MediaQuery } from "./helper";


import Mobile from './Mobile Okukus'
import Desktop from './Desktop Okukus'

const Main = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  transition: all 0.6s ease-in-out;
  min-height: 30em;
`;

const breakpoint = 540;

const Okukus = () => {
  const { width } = MediaQuery();

  return <Router>{width > breakpoint ? <Desktop /> : <Mobile />}</Router>;
};

export default Okukus;
