const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Api entry points!

  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Product {
    name: String!
    price: Float!
    discount: Int
    priceWithDiscount: Float
  }

  type Query {
    hello: String!
    currentHour: Date!
    loggedUser: User!
    highlightedProduct: Product!
  }
`;

const resolvers = {
  User: {
    salary(user) {
      return user.salary_in_real;
    },
  },
  Product: {
    priceWithDiscount(product) {
      return (product.price * ((100 - product.discount) / 100)).toFixed(2);
    },
  },
  // Query is the first entry and the methods have no params
  Query: {
    hello() {
      return "Hello Worl!";
    },
    currentHour() {
      return new Date();
    },
    loggedUser() {
      return {
        id: 1,
        name: "Ana",
        email: "ana@gmail.com",
        age: 28,
        salary_in_real: 2000.5,
        vip: true,
      };
    },
    highlightedProduct() {
      return {
        name: "Ball",
        price: 19.99,
        discount: 10,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executing in ${url}`);
});
