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
    return db('commentary').orderBy('id')
}

function findBy(filter) {
    return db('commentary').where(filter).orderBy('id')
}

function findById(id) {
    return db('commentary').where({id}).first()
}

function findByUserId(user_id) {
    return db('commentary').where({user_id})
}



async function add(chapterCommentary) {
    try {
        const [id] = await db('commentary').insert(chapterCommentary, 'id')
        return findById(id)
    } catch (error) {
        throw error
    }
}

function update(changes, id) {
    return db('commentary').where({id}).update(changes)
}

function remove(id) {
    return db('commentary').where({id}).del()
}