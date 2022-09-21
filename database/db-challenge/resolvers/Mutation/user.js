const db = require("../../config/db");
const { user: getUser } = require("../Query/User");

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
    try {
      const user = await getUser(_, { filter });
      if (user) {
        const { id } = user;
        await db("users_profiles").where({ user_id: id }).delete();
        await db("users").where({ id }).delete();
      }
      return user;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },

  async updateUser(_, { filter, data }) {
    if (!filter || (!filter.id && !filter.email))
      new Error("Please send a user Id or Email");

    const { profiles, ...dataToUpdate } = data;

    try {
      const user = await getUser(_, { filter });
      if (user) {
        const { id } = user;

        if (profiles) {
          await db("users_profiles").where({ user_id: id }).delete();

          for (let profile of profiles) {
            await db("users_profiles")
              .where({ user_id: id })
              .insert({ user_id: id, profile_id: profile.id });
          }
        }
        await db("users")
          .where({ id })
          .update({ ...dataToUpdate });
        return await getUser(_, { filter });
      }
    } catch (e) {
      throw new Error(e);
    }
  },
};
