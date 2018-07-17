
module.exports = class UserService{

    constructor(jsonFile){
        jsonFile.read((data)=>{
            let maxId = data.users.reduce((maxId,user)=>{
                return maxId > user.id ? maxId: user.id
            },0);
            this.nextId = maxId++;
        });
        this.jsonFile = jsonFile;
    }
    

    create(user){
        return this.jsonFile.write((data)=>{
            user.id = this.nextId;
            this.nextId++;
            data.users.push(user);
            return {
                id: user.id,
                data:data
            }
        });
    }


    delete(userId){
        return this.jsonFile.write((data)=>{
            data.users = data.users.filter((user)=>{
                return user.id != userId;
            });
            return {
                id:userId,
                data:data
            }
        });
    }


    list(limit=100,offset=0){
        return this.jsonFile.read((data)=>{
                return data.users;
            })
    }

    update(id,newUser){
        return this.jsonFile.write((data)=>{
                let user = data.users.map((user)=>{
                    if(user.id == id){
                        return Object.assign(user,newUser);
                    }else{
                        return user;
                    }
                })
                return {
                    id:id,
                    data:data
                }
            })
    }

    search(searchCriteria,limit=100,offset=0){
        return this.jsonFile.read((data)=>{
                data.users.filter((user)=>{
                    for(let criterion in searchCriteria){
                        if(searchCriteria[criterion] != user[criterion]){
                            return false;
                        }
                    }
                    return true;
                });
                return data.users;
            });
    }
}