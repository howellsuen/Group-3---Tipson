const teamData = require('../database/2018-05-13-matches');

exports.seed = function(knex, Promise) {
    return knex('matches').del()
        .then(() => {
            let matchPromises = [];
            teamData.forEach((match) => {
                matchPromises.push(createMatch(knex, match));
            });
            return Promise.all(matchPromises);
        })
        .catch((err) => {
            console.log(err);
        })
};

const createMatch = (knex, match) => {
    return knex('matches').insert({
        id: match.id,
        matchday: match.matchday,
        home_team_id: match.home_team_id,
        away_team_id: match.away_team_id,
        result: match.result
    });
};