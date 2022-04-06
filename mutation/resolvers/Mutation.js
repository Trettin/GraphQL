const { users, nextId } = require("../data/db");

module.exports = {
  newUser(_, args) {
    const emailExists = users.some((user) => user.email === args.email);

    if (emailExists) throw new Error("Email already exists");

    const nextUser = {
      id: nextId(),
      ...args,
      profile_id: 1,
      status: "ACTIVE",
    };

    users.push(nextUser);

    return nextUser;
  },
};
