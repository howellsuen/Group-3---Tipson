exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("name");
        table.string("facebookId");
        table.string("accessToken");
        table.boolean("paid");
        table.string("payment_id");
        table.string("profile_picture");
        table.string("description");
        table.integer("total_tips").defaultTo(0);
        table.integer("total_wins").defaultTo(0);
        table.timestamps(false, true);
    })

    .then(() => {
        return knex.schema.createTable('subscriptions', (table) => {
            table.increments();
            //fk
            table.integer("follower_id").unsigned();
            table.foreign("follower_id").references('users.id');

            table.integer("following_id").unsigned();
            table.foreign("following_id").references('users.id');

            table.timestamps(false, true);
        });
    })


    .then(() => {
        return knex.schema.createTable('leagues', (table) => {
            table.increments();
            table.string("country");
            table.string("name");
            table.string("badge");
            table.timestamps(false, true);
        });
    })

    .then(() => {
        return knex.schema.createTable('teams', (table) => {
            table.increments();
            //fk
            table.integer("league_id").unsigned();
            table.foreign("league_id").references('leagues.id');

            table.string("name");
            table.string("badge");
            table.timestamps(false, true);
        });
    })

    .then(() => {
        return knex.schema.createTable('matches', (table) => {
            table.increments();
            table.date("matchday");
            //fk
            table.integer("home_team_id").unsigned();
            table.foreign("home_team_id").references('teams.id');

            table.integer("away_team_id").unsigned();
            table.foreign("away_team_id").references('teams.id');

            table.string("result");
            table.timestamps(false, true);
        });
    })

    .then(() => {
        return knex.schema.createTable('predictions', (table) => {
            table.increments();
            //fk
            table.integer("user_id").unsigned();
            table.foreign("user_id").references('users.id');

            table.integer("match_id").unsigned();
            table.foreign("match_id").references('matches.id');

            table.string("user_choice");
            table.timestamps(false, true);
        });
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('predictions')
        .then(() => {
            return knex.schema.dropTable('matches');
        })
        .then(() => {
            return knex.schema.dropTable('teams');
        })
        .then(() => {
            return knex.schema.dropTable('leagues');
        })
        .then(() => {
            return knex.schema.dropTable('subscriptions');
        })
        .then(() => {
            return knex.schema.dropTable('users');
        })
};