const User= require("../models/user");


module.exports.renderSignup=(req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLogin= (req, res)=>{
    res.render("users/login.ejs");

};

module.exports.signup=async(req, res)=>{
    try{
        
        let{username, email , password} =req.body;
        
        const newUser = new User({email, username});
       const registeredUser= await User.register(newUser, password);
       console.log(registeredUser);
       req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("sucesss", "Welcome to Wanderlust!");
        res.redirect("/listings");
       });
      
    }
    catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
    };


module.exports.login=async(req, res)=>{
    

    req.flash("success","Welcome back to Wanderlust!");
   res.redirect(res.locals.redirectUrl);

//    let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect();
};


module.exports.logout=(req, res, next)=>{
    req.logout((err)=>{
        if(err)
        {
           return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};