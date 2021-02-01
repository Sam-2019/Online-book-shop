import styled from "styled-components";
import Okukus from "./Pages/Okukus";
import "bootstrap/dist/css/bootstrap.css";
import "./Pages/okukus.css";
import { MediaQuery } from "../src/Pages/helper";
import {
  useQuery,
  useQueryCache,
  useMutation,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

const AppBackgroundColour = styled.div`
  background: #ababab3c;
`;

const queryCache = new QueryCache();

function App() {
  const { width } = MediaQuery();
  const breakpoint = 540;

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AppBackgroundColour>
        <Okukus />
      </AppBackgroundColour>
    </ReactQueryCacheProvider>
  );
}

export default App;
