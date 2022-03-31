const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Api entry points!

  scalar Date

  type Query {
    hello: String!
    currentHour: Date
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello Worl!";
    },
    currentHour() {
      return new Date();
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
