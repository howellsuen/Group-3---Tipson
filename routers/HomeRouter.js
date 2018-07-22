const express = require("express");

module.exports = class HomeRouter {

    constructor(homeService) {
        this.homeService = homeService;
    }

    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.post("/submit", this.post.bind(this));
        return router;
    }

    get(req, res) {
        return this.homeService.list()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    post(req, res) {
        return this.homeService.create(req.body.choice, req.user)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}