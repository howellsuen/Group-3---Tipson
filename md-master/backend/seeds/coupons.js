
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coupons').del()

  .then(() => {
      return knex('coupons').insert([{
        id:1,
        coupon_id:777,
        coupon_type: 'Annual'
        
        },
          {
        id:2,
        coupon_id: 888,
        coupon_type: 'Special'
        },
          {
        id:3,
        coupon_id: 123,
        coupon_type:'Seasonal'
        }
      ])
    })

    .catch((err) => {
      console.log(err);
    });

  };

  //create coupon

  const createCoupon = (knex, coupon) =>{
    return knex('coupons').insert({
      id: coupon.id,
      coupon_id: coupon.coupon_id,
      coupon_type: coupon.coupon_type      
    })
  }
