import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import MajorBooks from "./Pages/MajorBooks";
import { ContextProvider } from "./Pages/Context";
import "./Pages/majorbooks.css";

const AppBackgroundColour = styled.div`
  background: #ababab3c;
`;

const httpLink = createHttpLink({
  uri: "https://new-ecommerce-be.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("loginToken"));

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppBackgroundColour>
        <ContextProvider>
          <MajorBooks />
        </ContextProvider>
      </AppBackgroundColour>
    </ApolloProvider>
  );
}

export default App;
