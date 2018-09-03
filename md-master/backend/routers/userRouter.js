const express = require("express");

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        //add user 
        router.post('/signup', (req, res) => { 
            console.log('signing up')
            this.userService.addUserDetails(req.body.email,req.body.password)
                .then((Details) => res.json(Details))
                .then(console.log('done'))
                
                .catch((err) => res.status(500).json(err));

        })

       /* // Profile details service
        router.get('/details/:userID', (req, res) => { //getting details of user profile
            this.userService.getUserDetail(req.params.userID)
            .then((userDetails) => res.json(userDetails))
            .catch((err) => re.status(500).json(err));
        }) */

        //update user 
        router.put('/details/:user_iD', (req, res) => { 
            this.userService.updateUserDetail(req.body.email,req.body.password)
                .then((Details) => res.json(Details))
                .then(console.log('so far so good'))

                .catch((err) => res.status(500).json(err));

        })


        return router;
    }
}

module.exports = UserRouter;