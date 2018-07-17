const express = require("express");


class GroupRouter{

    constructor(groupService){
        this.groupService = groupService;
    }

    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.put("/:id",this.put.bind(this));
        router.patch("/:id",this.put.bind(this));
        router.delete("/:id",this.delete.bind(this));
        return router;
    }

    get(req,res){
        //Validation Logic
        return this.groupService.list()
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }

    post(req,res){
        //Validation Logic
        return this.groupService.create(req.body)
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }

    put(req,res){
        //Validation Logic
        return this.groupService.update(req.params.id,req.body)
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }

    delete(req,res){
        //Validation Logic
        return this.groupService.delete(req.params.id)
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }
}

module.exports = GroupRouter

