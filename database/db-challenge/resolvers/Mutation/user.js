const db = require("../../config/db");
const { profiles: getUserProfiles } = require("../Type/User");

module.exports = {
  async newUser(_, { data: { name, email, password, profiles } }) {
    if (!name || !email || !password || !profiles) {
      throw new Error(
        "Fields: 'name', 'email', 'password' and 'profiles' are mandatory."
      );
    }
    const userExists = await db("users").where({ email }).first();

    if (userExists) {
      throw new Error("Duplicated email.");
    }

    await db("users").insert({ name, email, password });

    const user = await db("users").where({ email }).first();

    if (profiles.length) {
      for (let userProfile of profiles) {
        await db("profiles")
          .where((builder) => {
            if (userProfile.name) {
              builder.where({ name: userProfile.name });
            } else {
              builder.where({ id: userProfile.id });
            }
          })
          .first()
          .then((profile) =>
            db("users_profiles").insert({
              user_id: user.id,
              profile_id: profile.id,
            })
          );

        // if (userProfile.id) {
        //   await db("users_profiles").insert({
        //     user_id: user.id,
        //     profile_id: userProfile.id,
        //   });
        // } else {
        //   const profile = await db("profiles")
        //     .where({
        //       name: userProfile.name,
        //     })
        //     .first();

        //   await db("users_profiles").insert({
        //     user_id: user.id,
        //     profile_id: profile.id,
        //   });
        // }
      }
    }
    const userProfiles = await getUserProfiles(user);

    return { ...user, profiles: userProfiles };
  },
  async deleteUser(_, { filter }) {
    // implement
  },
  async updateUser(_, { filter, data }) {
    // implement
  },
};
