const db = require("../../config/db");

module.exports = {
  async profiles() {
    return await db("profiles");
  },
  async profile(_, { filter: { id, name } }) {
    if (!id && !name) return null;

    return await db("profiles")
      .where((builder) => {
        if (id && id > 0) {
          builder.where({ id });
        } else {
          builder.where({ name });
        }
      })
      .first();
  },
};
