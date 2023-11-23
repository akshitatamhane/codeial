const express= require('express');
const cookieParser= require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts'); 
const { urlencoded } = require('body-parser');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal= require('./config/passport-local-strategy');

const MongoStore= require('connect-mongo');

app.use(urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);

app.set('layout extractScripts', true);


//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // to do change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongooseConnection: db,
        mongoUrl: 'mongodb://localhost/test-app',
        autoRemove:'disabled'
    },
    function(err){
        console.log(err ||'connect-mongodb setup ok');
    }
    )
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
//fetches index by default so we can do just route
app.use('/',require('./routes/index'));



app.listen(port, function(err){
    if(err)
    {
        //console.log('Error :', err);
        //including a variable inside a string- inyterpolation
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on the port : ${port}`);
})