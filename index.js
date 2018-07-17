const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "tipson",
        user: "howellsuen",
        password: ""
    }
});