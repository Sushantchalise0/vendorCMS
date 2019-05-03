const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');
//start for secure api
// const morgan = require('morgan'),
// jwt    = require('jsonwebtoken'),
// config = require('./config/config');

//end for secure api

mongoose.connect(mongoDbUrl, { useNewUrlParser: true }).then((db) => {

    console.log('MONGO connected');
}).catch(error => console.log(error));

app.use(express.static(path.join(__dirname, 'public')));

//SET VIEW ENGINE
const {select, generateTime} = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateTime: generateTime}}));
app.set('view engine', 'handlebars');

//METHOD OVERRIDE   
app.use(methodOverride('_method'));

//UPLOAD MIDDLEWARE
app.use(upload());

// BODY PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//SESSIONS
app.use(session({

    secret: 'sushantChaliseCodingCMS',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//LOCAL VARIABLES USING MIDDLEWARE
app.use((req, res, next) => {

    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

//LOAD ROUTES
let home = require('./routes/home/index');
let admin = require('./routes/admin/index');
let products = require('./routes/admin/products');
let category = require('./routes/admin/category');
let comment = require('./routes/admin/comments');
let vendorlog = require('./routes/admin/settings');
//for secure api
// const  ProtectedRoutes = express.Router(); 

//USE ROUTES
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/category',category);
app.use('/admin/products',products);
app.use('/admin/comments', comment);
app.use('/admin/settings', vendorlog);

const port = process.env.PORT || 4500;

app.listen(port, () => {

    console.log(`listening on port ${port}`);

});