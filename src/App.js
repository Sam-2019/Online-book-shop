import React from "react";
import styled from "styled-components";
import Okukus from "./Pages/Okukus";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "./Pages/okukus.css";

// import Container from "./Design System/Container";

const AppBackgroundColour = styled.div`
  background: #ababab3c;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBackgroundColour>
        <Okukus />
      </AppBackgroundColour>
    </QueryClientProvider>
  );
}

export default App;
