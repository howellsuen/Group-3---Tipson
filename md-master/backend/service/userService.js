const bcrypt = require('../utils/bcrypt')


class UserService {
    constructor(knex) {
        this.knex = knex;
    }

    //Add profile service
    addUserDetails(email, password, facebook_id){
        console.log('this works')
        let query = this.knex
        .select()
        .from('users')
        .where('email', email)

        return query.then(rows => {
            if(rows.length > 0) {
                console.log('User Already exists');
            } else {
                console.log('inserting')
                return this.knex('users')
                    .insert({
                        email: email,
                        password: hash,
						facebook_id: facebook_id,
						user_id: Math.floor((Math.random()*1000000)+1)

                    }).then('should have worked')
            }
        })

    }


    /** Profile details services
    getUserDetail(userID){
        let query = this.knex
        .select('email')
        .from('users')
        .where('users.user_id', user_id)

        return query.then(rows => {
            return rows.map(row => ({
                name: row.name,
                email: row.email,
                phone: row.phone,
                user_id: row.user_id
            }))
        })
    }**/ 

    //Change user details
    updateUserDetail(email, password) {
        console.log('updating the user')
        let query = this.knex
        .select('users.email')
        .from('users');


        return query.then(rows => {
                    console.log(rows)
                if(rows.length !== 1) {
                console.log('User undefined')
            } else {
                console.log(email, user_id)
                return this.knex('users')
                    .where('users.user_id', user_id)
                    .update({
                        email: email,
                        password: hash,                        
                    })
            }
        })
    }

 


}

module.exports = userService;