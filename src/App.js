import styled from "styled-components";
import Okukus from "./Pages/Okukus";
import "bootstrap/dist/css/bootstrap.css";
import "./Pages/okukus.css";
import { MediaQuery } from "../src/Pages/helper";

function App() {
  const { width } = MediaQuery();
  const breakpoint = 540;

  return <>{breakpoint < width ? <>Please view on mobile</> : <Okukus />}</>;
}

export default App;
