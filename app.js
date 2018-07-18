const express = require('express');
const authRouter = require('./routers/authRouter');
const setupPassport = require('./utils/passport');


// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');

const {
    GroupRouter,
    UserRouter
} = require('./routers');

const {
    GroupService,
    UserService
} = require('./services');

const JsonFile = require('./stores/JsonFile');

let groupService = new GroupService(new JsonFile('groups.json'));
let userService = new UserService(new JsonFile('users.json'));

const {
    app
} = require('./utils/init-app')();

setupPassport(app);

app.use('/auth', authRouter);
app.use('/', new ViewRouter().router());
app.use('/api/groups', new GroupRouter(groupService).router());
app.use('/api/users', new UserRouter(userService).router());

//https setting
const https = require('https');
const fs = require('fs');
const httpsOptions = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
};

https.createServer(httpsOptions, app).listen(3000, () => {
    console.log('server running at ' + 3000)
});