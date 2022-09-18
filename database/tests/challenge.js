const db = require("../config/db");

async function saveUser(name, email, password) {}

async function saveProfile(name, label) {}

async function addProfiles(user, ...profiles) {}

async function execute() {
  const user = await saveUser("Ana", "ana@company.com", "123456");
  const profileA = await saveProfile("hr", "People");
  const profileB = await saveProfile("fin", "Financial");

  console.log(user);
  console.log(profileA);
  console.log(profileB);

  await addProfiles(user, profileA, profileB);
}

execute()
  .catch((err) => console.log(err))
  .finally(() => db.destroy());
