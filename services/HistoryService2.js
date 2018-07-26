// not in use now
// failed to return

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
        // return this.knex.select('predictions.id', 'matchday', 'home_team_id', 'away_team_id', 'result', 'user_choice')
        //     .from(MATCHES).join(PREDICTIONS, 'match_id', 'matches.id')
        //     .where('user_id', user.id)
        //     .orderBy('predictions.id', 'desc')
        //     .limit(10).offset(0);
        const getPredictions = this.knex.select('predictions.id', 'matchday', 'home_team_id', 'away_team_id', 'result', 'user_choice')
            .from(MATCHES).join(PREDICTIONS, 'match_id', 'matches.id')
            .where('user_id', user.id)
            .orderBy('predictions.id', 'desc')
            .limit(10).offset(0);

        return getPredictions.then(predictions => {
                console.log(predictions);
                const matchResults = [];
                for (let i = 0; i < predictions.length; i++) {
                    const homeTeam = this.knex.select("name")
                        .from(TEAMS).join(MATCHES, "home_team_id", "teams.id")
                        .where("teams.id", predictions[i].home_team_id);
                    const awayTeam = this.knex.select("name")
                        .from(TEAMS).join(MATCHES, "away_team_id", "teams.id")
                        .where("teams.id", predictions[i].away_team_id);
                    Promise.all([homeTeam, awayTeam])
                        .then(results => {
                            console.log(results);
                            matchResults.push({
                                predictionsId: predictions[i].id,
                                matchDay: moment(predictions[i].matchday).format('DD/MM'),
                                homeTeam: results[0][0].name,
                                awayTeam: results[1][0].name,
                                result: predictions[i].result,
                                userChoice: predictions[i].user_choice
                            })
                            console.log(matchResults);
                            // return matchResults;
                        })
                        // return matchResults;
                }
                console.log(matchResults);
                return matchResults;
            })
            .catch(err => console.log(err));


        //     async() => {
        //         try {
        //             const predictions = await this.knex.select('predictions.id', 'matchday', 'home_team_id', 'away_team_id', 'result', 'user_choice')
        //                 .from(MATCHES).join(PREDICTIONS, 'match_id', 'matches.id')
        //                 .where('user_id', user.id)
        //                 .orderBy('predictions.id', 'desc')
        //                 .limit(10).offset(0);

        //             // const matchResults = [];

        //             for (let i = 0; i < predictions.length; i++) {
        //                 const homeTeam = this.knex.select("name")
        //                     .from(TEAMS).join(MATCHES, "home_team_id", "teams.id")
        //                     .where("teams.id", predictions[i].home_team_id);
        //                 const awayTeam = this.knex.select("name")
        //                     .from(TEAMS).join(MATCHES, "away_team_id", "teams.id")
        //                     .where("teams.id", predictions[i].away_team_id);

        //                 return teams = await Promise.all([homeTeam, awayTeam])
        //                     // .then(results => {
        //                     //         matchResults.push({
        //                     //             predictionsId: results[0][i].id,
        //                     //             matchDay: moment(results[0][i].matchday).format('YYYY-MM-DD'),
        //                     //             homeTeam: results[0][i].name,
        //                     //             awayTeam: results[1][i].name,
        //                     //             result: results[1][i].badge,
        //                     //             userChoice:
        //                     //         })
        //                     //     }
        //                     //     return matchResults;
        //                     // })
        //             }
        //             return teams;

        //         } catch (err) {
        //             console.log(err);
        //             throw err;
        //         }
        //     }
    }
};