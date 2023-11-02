const express= require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts'); 


app.use(express.static('./assets'));
app.use(expressLayouts);

// use express router
app.use('/',require('./routes/index'));
//fetches index by default so we can do just route


//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err)
    {
        //console.log('Error :', err);
        //including a variable inside a string- inyterpolation
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on the port : ${port}`);
})