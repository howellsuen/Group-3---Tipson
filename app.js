const setupPassport = require('./utils/passport');

// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'

const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');

const {
    GroupRouter,
    HomeRouter
} = require('./routers');

const {
    GroupService,
    HomeService
} = require('./services');

// let groupService = new GroupService(new JsonFile('groups.json'));
let homeService = new HomeService(knex);

const app = require('./utils/init-app')();

setupPassport(app, knex);

app.use('/', new ViewRouter().router());
// app.use('/api/groups', new GroupRouter(groupService).router());
app.use('/api/home', new HomeRouter(homeService).router());

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