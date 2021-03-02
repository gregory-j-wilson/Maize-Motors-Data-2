const db = require('../connection.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('users').orderBy('id')
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id')
}

function findById(id) {
    return db('users').where({id}).first()
}

async function add(user) {
    try {
        const [id] = await db('users').insert(user, 'id')
        return findById(id)
    } catch (error) {
        throw error
    }
}

function update(changes, id) {
    return db('users').where({id}).update(changes).then(() => findById(id)).catch(err => console.log(err))
}

function remove(id) {
    return db('users').where({id}).del()
}