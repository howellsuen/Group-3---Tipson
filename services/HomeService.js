const moment = require('moment');
const TEAMS = require("./tables").TEAMS;
const MATCHES = require("./tables").MATCHES;
const PREDICTIONS = require("./tables").PREDICTIONS;
const USERS = require("./tables").USERS;

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
                        matchId: results[0][i].id,
                        matchDay: moment(results[0][i].matchday).format('YYYY-MM-DD'),
                        homeTeam: results[0][i].name,
                        homeBadge: results[0][i].badge,
                        awayTeam: results[1][i].name,
                        awayBadge: results[1][i].badge
                    })
                }
                return matches;
            })
            .catch(err => console.log(err));
    }

    async create(choice, user) {
        console.log('user_id', user.id);
        console.log('match_id', choice.matchId);
        console.log('user_choice', choice.userChoice);

        try {
            const predictionRecord = await this.knex(PREDICTIONS)
                .where('user_id', user.id)
                .andWhere('match_id', choice.matchId);

            if (predictionRecord.length == 0) {
                const predictions = this.knex(PREDICTIONS).insert({
                    user_id: user.id,
                    match_id: choice.matchId,
                    user_choice: choice.userChoice
                })

                const updateUserTips = this.knex(USERS)
                    .where('id', user.id)
                    .increment('total_tips', 1);

                const matchResult = this.knex.select('result').from(MATCHES).where('id', choice.matchId);

                return await Promise.all([predictions, updateUserTips, matchResult])
                    .then((data) => {
                        console.log('match_result', data[2][0].result);
                        if (data[2][0].result === choice.userChoice) {
                            return this.knex(USERS)
                                .where('id', user.id)
                                .increment('total_wins', 1);
                        } else {
                            return 'done';
                        }
                    })
            } else {
                throw new Error();
            }
        } catch (err) {
            throw err;
        }
    }
}

//         const predictions = this.knex(PREDICTIONS).insert({
//             user_id: user.id,
//             match_id: choice.matchId,
//             user_choice: choice.userChoice
//         });

//         const updateUserTips = this.knex(USERS)
//             .where('id', user.id)
//             .increment('total_tips', 1);

//         const matchResult = this.knex.select('result').from(MATCHES).where('id', choice.matchId);

//         return Promise.all([predictions, updateUserTips, matchResult])
//             .then((data) => {
//                 console.log('match_result', data[2][0].result);
//                 if (data[2][0].result === choice.userChoice) {
//                     return this.knex(USERS)
//                         .where('id', user.id)
//                         .increment('total_wins', 1);
//                 } else {
//                     return 'done';
//                 }
//             });
//     }
// }