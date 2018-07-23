exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('subscriptions').del()
        // .then(() => {
        //     return knex('subscriptions').del();
        // })
        .then(() => {
            return knex('users').del();
        })
        .then(() => {
            // Inserts seed entries
            return knex('users').insert([{
                    id: 1,
                    name: 'Howell',
                    facebookId: '',
                    accessToken: '',
                    paid: 'false',
                    payment_id: '',
                    profile_picture: '',
                    description: 'Have faith!',
                    total_tips: '1',
                    total_wins: '1'
                },
                {
                    id: 2,
                    name: 'Perry',
                    facebookId: '',
                    accessToken: '',
                    paid: 'false',
                    payment_id: '',
                    profile_picture: '',
                    description: 'Have faith!',
                    total_tips: '1',
                    total_wins: '0'
                },
                {
                    id: 3,
                    name: 'Jonathan',
                    facebookId: '',
                    accessToken: '',
                    paid: 'false',
                    payment_id: '',
                    profile_picture: '',
                    description: 'Have faith!',
                    total_tips: '0',
                    total_wins: '0'
                }
            ]);
        })
        .then(() => {
            return knex('subscriptions').insert([{
                    id: 1,
                    follower_id: 1,
                    following_id: 2
                },
                {
                    id: 2,
                    follower_id: 1,
                    following_id: 3
                },
                {
                    id: 3,
                    follower_id: 2,
                    following_id: 1
                },
                {
                    id: 4,
                    follower_id: 3,
                    following_id: 1
                }
            ]);
        })
        // .then(function() {
        //     return knex('predictions').insert([{
        //             id: 1,
        //             user_id: 1,
        //             match_id: 2,
        //             user_choice: 'away',
        //         },
        //         {
        //             id: 2,
        //             user_id: 2,
        //             match_id: 1,
        //             user_choice: 'home',
        //         }
        //     ]);
        // });
};