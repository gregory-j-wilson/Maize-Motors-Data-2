const db = require('../../connection.js')

module.exports = {
    find,
    findBy,
    findById,
    findByUserId,
    findByBookChapter,
    add,
    update,
    remove
}

function find() {
    return db('comments_on_posts').orderBy('id')
}

function findBy(filter) {
    return db('comments_on_posts').where(filter).orderBy('id')
}

function findById(id) {
    return db('comments_on_posts').where({id}).first()
}

function findByUserId(user_id) {
    return db('comments_on_posts').where({user_id})
}





async function add(comment_on_post) {
    try {
        const [id] = await db('commentary').insert(comment_on_post, 'id')
        return findById(id)
    } catch (error) {
        throw error
    }
}

function update(changes, id) {
    return db('comments_on_posts').where({id}).update(changes)
}

function remove(id) {
    return db('comments_on_posts').where({id}).del()
}