const USERS = require("./tables").USERS;

module.exports = class ProfileService {

    constructor(knex) {
        this.knex = knex;
    }

    list(user) {
        return this.knex.select('name', 'profile_picture', 'description', 'total_tips', 'total_wins').from(USERS).where('id', user.id);
    }
};