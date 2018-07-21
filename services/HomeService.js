const MATCHES = require("./tables").MATCHES;
const TEAMS = require("./tables").TEAMS;

module.exports = class HomeService {

    constructor(knex) {
        this.knex = knex;
    }

    list() {
        const homeTeam = this.knex.select("matches.id", "matchday", "name", "badge")
            .from(TEAMS).join(MATCHES, "home_team_id", "teams.id").where("matchday", "2018-05-13");
        const awayTeam = this.knex.select("matches.id", "matchday", "name", "badge")
            .from(TEAMS).join(MATCHES, "away_team_id", "teams.id").where("matchday", "2018-05-13");

        return Promise.all([homeTeam, awayTeam])
            .then(results => {
                const matches = [];
                for (let i = 0; i < results[0].length; i++) {
                    matches.push({
                        matchDay: results[0][i].matchday,
                        homeTeam: results[0][i].name,
                        awayTeam: results[1][i].name
                    })
                }
                return matches;
            })
            .catch(err => console.log(err));
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