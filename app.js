//packages
var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require("mongoose"),
    passport         = require('passport'),
    cookieParser     = require('cookie-parser'),
    LocalStrategy    = require('passport-local'),
    flash            = require('connect-flash'),
    session          = require('express-session'),
    Letter           = require('./models/letter'),
    User             = require('./models/user'),
    seedDB           = require('./seeds'),
    methodOverride   = require('method-override');


//require routes
var indexRoutes = require('./routes/auth'),
    lettersRoutes = require('./routes/letters');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

seedDB();

//passport configuration
app.use(require('express-session')({
    secret: 'yall gon make me lose my fuckin mind im so deadass right now',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    function(username, password, done){
      User.findOne({ username: username }, function(err, user) {
        if(err){ return done(err); }
        if(!user){
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password){
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//===================
//routes and stuff  
//===================

app.use('/', indexRoutes);
app.use('/letters', lettersRoutes);



//listen on port 3000
app.listen(3000, function(){
    console.log('aight we in dis shit');
});