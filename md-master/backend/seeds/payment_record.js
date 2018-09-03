
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('payment_record').del()
      .then(() => {
        // Inserts seed entries
        return knex('payment_record').insert([
          { id: 1, 
            payment_ref: '0x01opxxkp',
            user_id: 76091
        },
          { id: 2, 
            payment_ref: '54qqscdfqe',
            user_id: 56879
          },
          { id: 3,
            payment_ref: '78qrqeeefs',
            user_id: 56761
          }
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  