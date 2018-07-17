const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');


module.exports = ()=>{
    let app = express();
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(express.static("public"));
    app.use(bodyParser.json());

    require('./init-sessions')(app);

    return{
        app : app
    }
}