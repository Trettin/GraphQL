const db = require('../config/db');

// const newProfile = {
//     name: "visitor",
//     label: "Visitor"
// }

// db('profiles').insert(newProfile)
//     .then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy());

const profileSU = {
    name: 'root' + Math.random(),
    label: 'Super User'
}

// Insert into profiles (name, label) 
// values ('...'. '...');
db.insert(profileSU).into('profiles')
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy());