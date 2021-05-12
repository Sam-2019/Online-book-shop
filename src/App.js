import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";

import Okukus from "./Pages/Okukus";
import { ContextProvider } from "./Pages/Context";
import "./Pages/okukus.css";

const AppBackgroundColour = styled.div`
  background: #ababab3c;
`;

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query {
//         products {
//           id
//           name
//           sku
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <AppBackgroundColour>
        <ContextProvider>
          <Okukus />
        </ContextProvider>
      </AppBackgroundColour>
    </ApolloProvider>
  );
}

export default App;
