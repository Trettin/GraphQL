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
  deleteUser(_, { id }) {
    const i = users.findIndex((u) => u.id === id);
    if (i < 0) return null;

    const excluded = users.splice(i, 1);
    return excluded[0] || null;
  },
  updateUser(_, args) {
    const i = users.findIndex((u) => u.id === args.id);
    if (i < 0) return null;

    const user = {
      ...users[i],
      ...args,
    };

    users.splice(i, 1, user);
    return user;
  },
};
