const express = require('express');
const router = express.Router();
// const User = require('../../models/User');
const Vendorlog = require('../../models/Vendorlogs');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res) => {
              
    res.render('home/index', { });

        });


router.get('/login', (req, res) => {

    res.render('home/login');
});

//APP LOGIN
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

    Vendorlog.findOne({email: email}).then(user => {

        if(!user) return done(null, false, {message: 'No user found'});

        if(password === user.password){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password'});
        }
        // bcrypt.compare(password, user.password, (err, matched) => {

        //     if(err) return err;

        //     if(matched){
        //         return done(null, user);
        //     } else {

        //         return done(null, false, {message: 'Incorrect password'});
        //     }
        // });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Vendorlog.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login', (req, res, next) => {

   passport.authenticate('local', { 

    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
   
    })(req, res, next);
});

//LOGOUT
router.get('/logout', (req, res) => {

    req.logout();
    res.render('home/login');
});

router.get('/post/:id', (req, res) => {

    Post.findOne({_id: req.params.id})
    .populate('user')
    .populate({path: 'comments', match: {approveComment: true}, populate: {path: 'user', model: 'users'}})
        .then(post => {
            
            Category.find({}).then(categories => {
            res.render('home/post', {post: post, categories:categories});
        });
    });
});


module.exports = router;