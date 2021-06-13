
const link = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: 'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});