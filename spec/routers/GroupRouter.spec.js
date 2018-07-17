const {GroupRouter} = require('../../routers');

describe('GroupRouter ',()=>{
    let groupRouter;
    let groupService;
    let req;
    let res;
    let groups = [
        {
            id:1,
            name:"group1",
            created_at:  new Date(),
            updated_at: new Date()
        },
        {
            id:2,
            name:"group2",
            created_at:  new Date(),
            updated_at: new Date()
        }
    ]

    beforeEach(()=>{
        groupService = jasmine.createSpyObj("groupService",{
                list : Promise.resolve(groups),
                create: Promise.resolve([1]),
                update: Promise.resolve([1]),
                delete: Promise.resolve([1])
        });
        groupRouter = new GroupRouter(groupService);
        groupRouter.router();
        req = jasmine.createSpyObj('req',['params','query','body']);
        res = jasmine.createSpyObj('res',['json']); 
        
    });

    it(" should run router method successfully",()=>{
        groupRouter.router();
    });

    it(" should support get method",(done)=>{
        groupRouter.get(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(groups);
            done();
        })
    });

    it(" should support post method",(done)=>{
        groupRouter.post(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });

    it(" should support put method",(done)=>{
        groupRouter.put(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });

    it(" should support delete method",(done)=>{
        groupRouter.delete(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });
})