const db = require("../../config/db");

module.exports = {
  async profiles(user) {
    return await db("profiles").whereIn(
      "id",
      db.select("profile_id").from("users_profiles").where({ user_id: user.id })
    );
  },
};
