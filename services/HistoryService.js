const moment = require('moment');
const TEAMS = require("./tables").TEAMS;
const MATCHES = require("./tables").MATCHES;
const PREDICTIONS = require("./tables").PREDICTIONS;
const USERS = require("./tables").USERS;

module.exports = class HistoryService {

    constructor(knex) {
        this.knex = knex;
    }

    list(user) {
        const getPredictions = this.knex.select('predictions.id', 'matchday', 'home_team_id', 'away_team_id', 'result', 'user_choice')
            .from(MATCHES).join(PREDICTIONS, 'match_id', 'matches.id')
            .where('user_id', user.id)
            .orderBy('predictions.id', 'desc')
            .limit(10).offset(0);

        return getPredictions.then(predictions => {
                console.log(predictions);
                const matchPromises = [];
                for (let i = 0; i < predictions.length; i++) {
                    const homeTeam = this.knex.select("name")
                        .from(TEAMS).join(MATCHES, "home_team_id", "teams.id")
                        .where("teams.id", predictions[i].home_team_id);
                    const awayTeam = this.knex.select("name")
                        .from(TEAMS).join(MATCHES, "away_team_id", "teams.id")
                        .where("teams.id", predictions[i].away_team_id);
                    matchPromises.push(homeTeam, awayTeam);
                }

                return Promise.all(matchPromises)
                    .then(results => {
                        // console.log(results);
                        const matchResults = [];
                        let i = 0;
                        let j = 1;
                        for (let k = 0; k < predictions.length; k++) {
                            matchResults.push({
                                predictionsId: predictions[k].id,
                                matchDay: moment(predictions[k].matchday).format('DD/MM'),
                                homeTeam: results[i][0].name,
                                awayTeam: results[j][0].name,
                                result: predictions[k].result,
                                userChoice: predictions[k].user_choice
                            })
                            i += 2;
                            j += 2;
                        }
                        console.log(matchResults);
                        return matchResults;
                    })
            })
            .catch(err => console.log(err));

    }
};