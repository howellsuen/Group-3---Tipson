
module.exports = class GroupService{

    constructor(jsonFile){
        jsonFile.read((data)=>{
            let maxId = data.groups.reduce((maxId,group)=>{
                return maxId > group.id ? maxId: group.id
            },0);
            this.nextId = maxId++;
        });
        this.jsonFile = jsonFile;
    }
    

    create(group){
        return this.jsonFile.write((data)=>{
            group.id = this.nextId;
            this.nextId++;
            data.groups.push(group);
            return {
                id: group.id,
                data:data
            }
        });
    }


    delete(groupId){
        return this.jsonFile.write((data)=>{
            data.groups = data.groups.filter((group)=>{
                return group.id != groupId;
            });
            return {
                id:groupId,
                data:data
            }
        });
    }


    list(limit=100,offset=0){
        return this.jsonFile.read((data)=>{
                return data.groups;
            })
    }

    update(id,newGroup){
        return this.jsonFile.write((data)=>{
                let group = data.groups.map((group)=>{
                    if(group.id == id){
                        return Object.assign(group,newGroup);
                    }else{
                        return group;
                    }
                });
                return {
                    id:id,
                    data:data
                }
            })
    }

    search(searchCriteria,limit=100,offset=0){
        return this.jsonFile.read((data)=>{
                data.groups.filter((group)=>{
                    for(let criterion in searchCriteria){
                        if(searchCriteria[criterion] != group[criterion]){
                            return false;
                        }
                    }
                    return true;
                });
                return data.groups;
            });
    }
}