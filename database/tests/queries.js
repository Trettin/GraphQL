const db = require('../config/db')

// db('profiles')
//     .then(prof => prof.map(p => p.name))
//     .then(name => console.log(name))
//     .finally(()=> db.destroy())

// db('profiles').select('name', 'id')
//     .then(res => console.log(res))
//     .finally(()=> db.destroy())

// db.select('name', 'id')
//     .from('profiles')
//     .limit(4).offset(2)
//     .then(res => console.log(res))
//     .finally(()=> db.destroy())

db('profiles')
    // .where({id:2})
    // .where('id', '=', 2) // returns an array
    // .where('name', 'like', '%min%') // contains
    // .whereNot({id: 2})
    .whereIn('id', [1,2,3])
    //.first() // returns the first obj in the array
    .then(res => console.log(res))
    .finally(()=> db.destroy())