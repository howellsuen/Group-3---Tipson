const {GroupService} = require('../../services');
const JsonFile = require('../../stores/JsonFile');

describe("GroupService ",()=>{

    let groupService;
    let example = { name: "Group1"};
    let file;
    beforeEach((done)=>{
        file = new JsonFile('groups-test.json');
        groupService = new GroupService(file);
        file.write((data)=>{ return {data:{groups:[]}}})
            .then(()=> done());
    });

    it("should support create method",(done)=>{
        groupService.create(example)
        .then(()=>groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(1);
            expect(data[0].name).toEqual("Group1");
            done();
        });
    });

    it("should support delete method",(done)=>{
        groupService.create(example)
        .then((ids)=>groupService.delete(ids[0]))
        .then(()=>groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(0);
            done();
        });
    });

    it("should support list method",(done)=>{
        groupService.create(example)
        .then(()=> groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].name).toEqual("Group1");
            done();
        })
    });

    it("should support update method",(done)=>{
        groupService.create(example)
        .then((ids)=> groupService.update(ids[0],{name:"Group2"}))
        .then(()=> groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].name).toEqual("Group2");
            done();
        })
    });

    it("should support search method",(done)=>{
        groupService.create(example)
        .then(()=> groupService.search({name:"Group1"}))
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].name).toEqual("Group1");
            done();
        })
    });

    afterAll((done)=>{
        file.write((data)=>{ return {data:{groups:[]}}})
            .then(()=> done());
    });
});