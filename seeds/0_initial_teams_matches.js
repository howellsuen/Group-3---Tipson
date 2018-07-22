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
            return knex('teams').insert([{
                    id: 1,
                    league_id: 1,
                    name: '阿仙奴', //Arsenal
                    badge: ''
                },
                {
                    id: 2,
                    league_id: 1,
                    name: '哈德斯菲爾德', //Huddersfield Town
                    badge: ''
                },
                {
                    id: 3,
                    league_id: 2,
                    name: '巴塞隆拿', //FC Barcelona
                    badge: ''
                },
                {
                    id: 4,
                    league_id: 2,
                    name: '皇家馬德里', //Real Madrid
                    badge: ''
                },
                {
                    id: 5,
                    league_id: 1,
                    name: 'Bournemouth',
                    badge: ''
                },
                {
                    id: 6,
                    league_id: 1,
                    name: 'Burnley FC',
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
                },
                {
                    id: 3,
                    matchday: '2018-05-13',
                    home_team_id: 6,
                    away_team_id: 5,
                    result: 'away'
                }
            ]);
        });
}