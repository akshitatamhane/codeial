const User= require('../models/user');

module.exports.profile=function(req,res){
  if(req.cookies.user_id){
     
    User.findById(req.cookies.user_id).then(function(user){
      return res.render('user_profile',{
        title:"User Profile",
        user: user
      })  
    }).catch( function(err){
        return res.redirect('/users/sign-in');
    })


  }else{
    return res.redirect('/users/sign-in');
  }
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

    //steps to authenticate
    //find the user
    //callback functions are depricated in findOne
    //  User.findOne({email:req.body.email},function(err,user){
    //     if(err)
    //     {
    //         console.log('error in finding the user in signing in');
    //         return;
    //     }
    //      //handle the user found

    //      if(user){
    //         //handle passwords which doesn't match 
    //           if(user.password != req.body.password){
    //             return res.redirect('back');
    //           }
    //         //handle session creation
    //           res.cookie('user_id',user.id);
    //           return res.redirect('/users/profile');
    //      }else{
    //        //handle user not found

    //        return res.redirect('back');
    //      }
    //  })




    User.findOne({email:req.body.email})
         //handle the user found
         .then( function(user)
            {
            //handle passwords which doesn't match 
              if(user.password != req.body.password){
                return res.redirect('back');
              }
            //handle session creation
              res.cookie('user_id',user.id);
              return res.redirect('/users/profile');
         }).catch( function(err)
           //handle user not found
          {
           console.log('error in finding the user in signing in');
           return res.redirect('back');
          })
          


    
   










   

    

    



}