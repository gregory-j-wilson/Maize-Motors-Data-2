
exports.up = function(knex) {

    return knex.schema.table('users', function(t) {
        t.string('city')
        t.string('state')
        t.string('country')
        t.text('bio', 'longtext')
        t.text('profile_pic_url')
    })
  
};

exports.down = function(knex) {

    return knex.schema.table('users', function(t) {
        t.dropColumn('city')
        t.dropColumn('state')
        t.dropColumn('country')
        t.dropColumn('bio')
        t.dropColumn('profile_pic_url')
    })
  
};
