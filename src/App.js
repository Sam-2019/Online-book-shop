import styled from "styled-components";
import Okukus from "./Pages/Okukus";
import "bootstrap/dist/css/bootstrap.css";
import {
  useQuery,
  useQueryCache,
  useMutation,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import "./Pages/okukus.css";

// import Container from "./Design System/Container";

const AppBackgroundColour = styled.div`
  background: #ababab3c;
`;

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AppBackgroundColour>
        <Okukus />
      </AppBackgroundColour>
    </ReactQueryCacheProvider>
  );
}

export default App;
