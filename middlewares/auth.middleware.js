const tokens = require("../config/tokens.config");
const User = require("../models/user.model");
//revisa la session
module.exports.checkSession = (req, res, next) => {
    
    try {
        const cookie = req.headers.cookie;
        if (!cookie) {
            return res.status(401).json("Unauthorized");
        }
        const token = cookie.split("=")[1];
        const userId = tokens.loadSession(token);
        if (!userId) {
            return res.status(401).json("Unauthorized");
        }

    //busca el usuario y verifica que este verified en true
      User.findOne({_id: userId,verified: true})  
      .then((user) => {
            if (!user) {
                return res.status(401).json("Unauthorized");
            }
            req.user = user;
            next();
        })
        .catch((error) => {
            return res.status(401).json("Unauthorized");
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json("Unauthorized");
    }
};