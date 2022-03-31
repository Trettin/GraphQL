const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Api entry points!
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello Worl!";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
