const User= require('../models/user');

module.exports.profile=function(req,res){
  return  res.render('user_profile',{
        title:"User Profile"
    })
}

//render thre signup page
module.exports.signUp= function(req, res){
return res.render('user_sign_up',{
    title:"Codeial | Sign Up"
})
}

//render the signin page
module.exports.signIn= function(req, res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
    }


//get the signup data
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email : req.body.email }).then (function (user)
    {
    // res.redirect('/users/sign-in');
        if(!user){
            User.create(req.body).then(function(user){  
                return res.redirect('/users/sign-in');
            }).catch(function(err){
                console.log('error in creating the user while signing up');
            })
        } else{
           return res.redirect('back');
        }
    }).catch(function(err){
        console.log('error in finding the user while signing in');
    })
}

// sign in and create a session for the user
module.exports.createSession= function(req,res){
    //todo later
}