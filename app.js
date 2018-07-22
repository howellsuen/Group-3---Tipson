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
    HomeRouter
} = require('./routers');

const {
    HomeService
} = require('./services');

let homeService = new HomeService(knex);

const app = require('./utils/init-app')();

require('./utils/init-sessions')(app);

setupPassport(app, knex);

app.use('/', new ViewRouter().router());
// app.use('/api/home/submit', isLoggedIn, (req) => console.log('req.body', req.body));
app.use('/api/home', isLoggedIn, new HomeRouter(homeService).router());

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