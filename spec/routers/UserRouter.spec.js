const {UserRouter} = require('../../routers')

describe('UserRouter should',()=>{
    let userRouter ; 
    let userService;
    let req;
    let res;
    let users = [
        {
            first_name: "Gordon",
            last_name: "Lau",
            email :"gordon@gmail.com",
            created_at: new Date(),
            updated_at: new Date()
        }
    ]
    beforeEach(()=>{
        userService = jasmine.createSpyObj("userService",{
            list : Promise.resolve(users),
            create: Promise.resolve([1]),
            update: Promise.resolve([1]),
            delete: Promise.resolve([1])
        });
        userRouter = new UserRouter(userService);
        req = jasmine.createSpyObj('req',['params','query','body']);
        res = jasmine.createSpyObj('res',['json']); 
    });

    it(" should run router method successfully",()=>{
        userRouter.router();
    });

    it("support get method",(done)=>{
        userRouter.get(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(users);
            done();
        })
    });

    it("support post method",(done)=>{
        userRouter.post(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });

    it("support put method",(done)=>{
        userRouter.put(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });

    it("support delete method",(done)=>{
        userRouter.delete(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });
})