const db = require('../../connection.js')

module.exports = {
    find,
    findBy,
    findById,
    findByUserId,
    add,
    update,
    remove
}

function find() {
    return db('posts').orderBy('id')
}

function findBy(filter) {
    return db('posts').where(filter).orderBy('id')
}

function findById(id) {
    return db('posts').where({id}).first()
}

function findByUserId(user_id) {
    return db('posts').where({user_id})
}





async function add(post) {
    try {
        const [id] = await db('posts').insert(post, 'id')
        return findById(id)
    } catch (error) {
        throw error
    }
}

function update(changes, id) {
    return db('posts').where({id}).update(changes)
}

function remove(id) {
    return db('posts').where({id}).del()
}