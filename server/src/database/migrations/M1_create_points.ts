import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.bigInteger('whatsapp').notNullable()
        table.decimal('latitude', 10, 7).notNullable()
        table.decimal('longitude', 10, 7).notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points')
}