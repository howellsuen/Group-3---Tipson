
'strict';

const express = require('express'); // http framework module
const path = require('path'); // root module
const bodyParser = require('body-parser'); // pull information from html in POST
const nodeMailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});




app.listen(3000);
console.log('server is runnin on port 3000...');
