const User = require('../models/user.model');
const tokens = require("../config/tokens.config");
const mailer = require("../services/mailer.service");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res) => {
    User.create(req.body)
        .then((user) => {
            mailer.sendVerificationEmail(user);
            res.status(201).json(user);
        })
        .catch((error) => {
            res.status(400).json(error);
            console.error(error);
        });
 };

 module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
          if(user){

            if(!user.verified){
                return res.status(401).json({message: "User not verified"});
            }
            if(!user.active){
                return res.status(401).json({message: "User not Active"});
            }
            user.checkPassword(req.body.password).then((match) => {
                if(match){
                   const token = tokens.createSession(user);
                   res.header("Set-Cookie", `session_token=${token};`).json({message: "success"});
                
                }else{
                    res.status(401).json({message: "Invalid email or password"});
                }
            });
          }else{
              res.status(401).json({message: "Invalid email or password"}); 
          }
        });
 };

 module.exports.verify = (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        const token = req.query.token;  
        const payload= jwt.verify(token, "Super Secreto")

        if (user.id !== payload.sub) {
            return res.status(401).json({message:"Unauthorized"});
        }

        user.verified = true;
        user.active = true;
        user.save().then(() => {
            res.status(200).json({message:"User verified"});
            
        });
    })
        .catch((error) => { 
            res.status(400).json(error);
        });
 };