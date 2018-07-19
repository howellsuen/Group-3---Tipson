const MATCHES = require("./tables").MATCHES;

module.exports = class HomeService {

    constructor(knex) {
        this.knex = knex;
    }

    list(limit = 100, offset = 0) {
        return this.knex.select("*")
            .from(MATCHES)
            .limit(limit).offset(offset);
    }

    update(id, user) {
        return this.knex(USERS)
            .update(user)
            .where("id", id);
    }

    search(searchCriteria, limit = 100, offset = 0) {
        return this.knex.select("*").from(USERS)
            .where(searchCriteria)
            .limit(limit).offset(offset);
    }
}