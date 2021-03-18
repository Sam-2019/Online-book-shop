import React from "react";
import styled from "styled-components";
import Okukus from "./Pages/Okukus";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./Pages/Context";
import "./Pages/okukus.css";

const AppBackgroundColour = styled.div`
  background: #ababab3c;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBackgroundColour>
        <ContextProvider>
          <Okukus />
        </ContextProvider>
      </AppBackgroundColour>
    </QueryClientProvider>
  );
}

// function App() {
//   return <File />;
// }

export default App;
