const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt =require('passport-jwt').ExtractJwt;
const User=require('../models/User.js');
module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest =ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey=process.env.SECRET;
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload._id,(err,user)=>{
        if(err){
            return done(err,false);
        }
        if(user){
            return done(null,{user});
        }else{
            return done(null,user);
        }
    });
    }));
}