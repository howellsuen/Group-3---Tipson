const teamData = require('../database/premier-league-teams');

exports.seed = function(knex, Promise) {
    return knex('predictions').del()
        .then(() => {
            return knex('matches').del();
        })
        .then(() => {
            return knex('teams').del();
        })
        .then(() => {
            return knex('leagues').del();
        })
        .then(() => {
            // Inserts seed entries
            return knex('leagues').insert([{
                    id: 1,
                    country: 'England',
                    name: '英超', //English Premier League
                    badge: ''
                },
                {
                    id: 2,
                    country: 'Spain',
                    name: '西甲', //La Liga
                    badge: ''
                }
            ]);
        })
        .then(() => {
            let teamPromises = [];
            teamData.forEach((team) => {
                teamPromises.push(createTeam(knex, team));
            });
            return Promise.all(teamPromises);
        })
        .catch((err) => {
            console.log(err);
        })
};

const createTeam = (knex, team) => {
    return knex('teams').insert({
        id: team.id,
        league_id: 1,
        name: team.zhName,
        badge: team.badge
    });
};