const { users, nextId } = require("../../data/db");

function userIndex(filter) {
  if (!filter) return -1;

  const { id, email } = filter;

  if (id) {
    return users.findIndex((u) => u.id === id);
  } else if (email) {
    return users.findIndex((u) => u.email === email);
  }

  return -1;
}

module.exports = {
  newUser(_, { data }) {
    const emailExists = users.some((user) => user.email === data.email);

    if (emailExists) throw new Error("Email already exists");

    const nextUser = {
      id: nextId(),
      ...data,
      profile_id: 1,
      status: "ACTIVE",
    };

    users.push(nextUser);

    return nextUser;
  },

  deleteUser(_, { filter }) {
    const i = userIndex(filter);
    if (i < 0) return null;

    const excluded = users.splice(i, 1);
    return excluded[0] || null;
  },

  updateUser(_, { filter, data }) {
    const i = userIndex(filter);
    if (i < 0) return null;

    const user = {
      ...users[i],
      ...data,
    };

    users.splice(i, 1, user);
    return user;
  },
};
