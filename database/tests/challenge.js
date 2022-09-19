const db = require("../config/db");

async function saveUser(name, email, password) {
  const userExists = await db("users").where({ email }).first();

  const userData = { name, password, email };

  if (userExists) {
    await db("users").where({ email }).update({ name: name });
  } else {
    await db("users").insert(userData);
  }

  const user = await db("users").where({ email }).first();
  return user;
}

async function saveProfile(name, label) {
  const profileExists = await db("profiles").where({ name }).first();

  if (profileExists) {
    await db("profiles").where({ name }).update({ label });
  } else {
    await db("profiles").insert({ name, label });
  }

  const profile = await db("profiles").where({ name }).first();
  return profile;
}

async function addProfiles(user, ...profiles) {
  const { id: user_id } = user;

  for (profile of profiles) {
    const existRelation = await db("users_profiles")
      .where({ user_id, profile_id: profile.id })
      .first();

    if (!existRelation) {
      await db("users_profiles").insert({ user_id, profile_id: profile.id });
    }
  }
}

async function execute() {
  const user = await saveUser("Catarina", "catarina@company.com", "123456");
  const profileA = await saveProfile("hr", "Prople");
  const profileB = await saveProfile("fin", "Financial");
  const profileC = await saveProfile("op", "Operational");

  console.log(user);
  console.log(profileA);
  console.log(profileB);

  await addProfiles(user, profileA, profileB, profileC);
}

execute()
  .catch((err) => console.log(err))
  .finally(() => db.destroy());
