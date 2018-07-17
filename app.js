
'strict';

const express = require('express'); // http framework module
const path = require('path'); // root module
const bodyParser = require('body-parser'); // pull information from html in POST
const nodeMailer = require('nodemailer');
const authRoutes = require('./routes/auth-routes'); //oauth routes
const passportSetup = require('./config/passport-setup'); //link the passport-setup


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//setup routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/ranking', (req, res) => {
    res.render('ranking');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

//https setting
const https = require('https');
const fs = require('fs');
const options = {
  cert: fs.readFileSync('./localhost.crt'),
  key: fs.readFileSync('./localhost.key')
};

https.createServer(options, app).listen(3000);

/*http setting
app.listen(3000);
console.log('server is runnin on port 3000...');
*/