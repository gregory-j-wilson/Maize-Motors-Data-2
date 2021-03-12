const db = require('../../connection.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('cars').orderBy('id')
}

function findBy(filter) {
    return db('cars').where(filter).orderBy('id')
}

function findById(id) {
    return db('cars').where({id}).first()
}




async function add(car) {
    try {
        const [id] = await db('cars').insert(car, 'id')
        return findById(id)
    } catch (error) {
        throw error
    }
}

function update(changes, id) {
    return db('cars').where({id}).update(changes)
}

function remove(id) {
    return db('cars').where({id}).del()
}