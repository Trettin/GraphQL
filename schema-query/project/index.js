const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "jsilva@zmail.com",
    age: 29,
    profile_id: 1,
  },
  {
    id: 2,
    name: "Rafael Junior",
    email: "rafajun@zmail.com",
    age: 31,
    profile_id: 2,
  },
  {
    id: 3,
    name: "Daniela Smith",
    email: "danismi@zmail.com",
    age: 24,
    profile_id: 1,
  },
];

const profiles = [
  {
    name: "Common",
    id: 1,
  },
  {
    name: "Adm",
    id: 2,
  },
];

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
    profile: Profile
  }

  type Profile {
    name: String!
    id: ID!
  }

  type Product {
    name: String!
    price: Float!
    discount: Int
    priceWithDiscount: Float
  }

  # Only queries that return a scalar can be called without {brackets}
  type Query {
    hello: String!
    currentHour: Date!
    loggedUser: User!
    highlightedProduct: Product!
    lotteryNumbers: [Int!]!
    users: [User]
    user(id: ID): User
    profiles: [Profile]
    profile(id: ID): Profile
  }
`;

const resolvers = {
  User: {
    salary(user) {
      return user.salary_in_real;
    },
    profile(user) {
      return profiles.find((profile) => user.profile_id === profile.id);
    },
  },
  Product: {
    priceWithDiscount(product) {
      if (product.discount) {
        return (product.price * ((100 - product.discount) / 100)).toFixed(2);
      } else {
        return product.price;
      }
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
        discount: 15,
      };
    },
    lotteryNumbers() {
      return Array(6)
        .fill()
        .map(() => parseInt(Math.random() * 60 + 1))
        .sort((a, b) => a - b);
    },
    users() {
      return users;
    },
    // The first param of a resolver inside Query is always null because it is a entry point but if the resolver were not in Query it would be the object that was return by another resolver, the parent resolver.
    user(_, { id }) {
      return users.find((user) => user.id.toString() === id);
    },
    profiles() {
      return profiles;
    },
    profile(_, { id }) {
      return profiles.find((user) => user.id.toString() === id);
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
