const express = require("express");

module.exports = class HomeRouter {

    constructor(homeService) {
        this.homeService = homeService;
    }

    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this));
        router.put("/:id", this.put.bind(this));
        router.patch("/:id", this.put.bind(this));
        router.delete("/:id", this.delete.bind(this));
        return router;
    }

    get(req, res) {
        return this.homeService.list()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    post(req, res) {
        return this.userService.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    put(req, res) {
        return this.userService.update(req.params.id, req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    delete(req, res) {
        return this.userService.delete(req.params.id)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}