const db = require('../config/db')

const newUser = {
    name: "Pedro",
    email: 'pedro@empresa.com.br',
    password: '1234214124'
}

// update ... db('...'). where({...}).update({...})

async function exercises() {
    // return qty = await db('users')
    //     .count('* as qty').first()

    await db('users').where({email: 'pedro@empresa.com.br'}).update({active: 0})

    return await db('users').where({email: 'pedro@empresa.com.br'})
}

exercises()
    .then(user => console.log(user))
    .finally(() => db.destroy())