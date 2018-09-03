
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, 
          email: 'best@gmail.com',
          password:[],
          token_id:'2s9o01dllm',
          user_type:'standard',
          user_id: 76091
      },
        { id: 2, 
          email: 'verybest@gmail.com',
          password:[],
          token_id:[],
          user_type:'premium',
          user_id: 56879
        }, 
        { id: 3, 
          email: 'bebest@gmail.com',
          password: [],
          token_id:[],
          user_type:[],
          user_id: 56761
        },
        { id: 4, 
          email: 'cba@gmail.com',
          password: [],
          token_id:[],
          user_type: 'standard',
          user_id: 56432
        },
        { id: 5, 
          email: 'xyz@gmail.com',
          password: [],
          token_id:[],
          user_type: 'premium',
          user_id: 56751
        },
      ]);
    })
    .catch((err) => {
      console.log(err);
    });
};
