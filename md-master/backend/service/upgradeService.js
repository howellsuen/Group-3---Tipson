
class upgradeService {

    constructor (knex) {
        this.knex = knex;
    }
    
    //check for details

    async checkInfo(email){
        try {
            return this.knex.select().from(users).where('email', email).then(()=>{
                if(users.premium_user = false){
                return new Error ('Hi, please join us for enjoying our lovely services');
                console.log(); 
            }else{
                return 'Hey, Welcome Back! You are one of us again!';
            }
        }).then(()=>{

        }
    )
    

    }catch(err) {
        throw err;
    }


    } 

}

    