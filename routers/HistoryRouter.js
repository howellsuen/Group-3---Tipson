const express = require("express");

module.exports = class HistoryRouter {

    constructor(historyService) {
        this.historyService = historyService;
    }

    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        return router;
    }

    get(req, res) {
        // console.log(req.user);
        return this.historyService.list(req.user)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}