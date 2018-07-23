const express = require("express");

module.exports = class ProfileRouter {

    constructor(profileService) {
        this.profileService = profileService;
    }

    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        // router.post("/submit", this.post.bind(this));
        return router;
    }

    get(req, res) {
        // console.log(req.user);
        return this.profileService.list(req.user)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    // post(req, res) {
    //     return this.homeService.create(req.body, req.user)
    //         .then((data) => res.json(data))
    //         .catch((err) => res.status(500).json(err));
    // }
}