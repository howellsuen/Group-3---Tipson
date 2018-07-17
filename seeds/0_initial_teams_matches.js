exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
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
                    name: 'English Premier League',
                    badge: ''
                },
                {
                    id: 2,
                    country: 'Spain',
                    name: 'La Liga',
                    badge: ''
                }
            ]);
        })
        .then(() => {
            return knex('teams').insert([{
                    id: 1,
                    league_id: 1,
                    name: 'Arsenal',
                    badge: ''
                },
                {
                    id: 2,
                    league_id: 1,
                    name: 'Huddersfield Town',
                    badge: ''
                },
                {
                    id: 3,
                    league_id: 2,
                    name: 'FC Barcelona',
                    badge: ''
                },
                {
                    id: 4,
                    league_id: 2,
                    name: 'Real Madrid',
                    badge: ''
                }
            ]);
        })
        .then(function() {
            return knex('matches').insert([{
                    id: 1,
                    matchday: '2018-05-07',
                    home_team_id: 3,
                    away_team_id: 4,
                    result: 'draw'
                },
                {
                    id: 2,
                    matchday: '2018-05-13',
                    home_team_id: 2,
                    away_team_id: 1,
                    result: 'away'
                }
            ]);
        });
}