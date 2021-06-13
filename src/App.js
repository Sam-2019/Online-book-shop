import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import {
  ApolloClient,
  InMemoryCache,
  gql,
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
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("loginToken");
  // return the headers to the context so httpLink can read them
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
          <MajorBooks />
        </ContextProvider>
      </AppBackgroundColour>
    </ApolloProvider>
  );
}

export default App;
