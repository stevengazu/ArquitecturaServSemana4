const jwt = require('jsonwebtoken');
//creo la session
module.exports.createSession = (user)=>{
    //const token = jwt.sign({sub: user._id}, "Super Secreto", {expiresIn: "1h"});
    const token = jwt.sign(
      {sub: user._id, exp: Date.now() / 1000 + 300},
       "Super Secreto"
      );//1 minuto
      return token;
};
//cargo la session
module.exports.loadSession = (token)=>{
    const payload = jwt.verify(token, "Super Secreto");
  return payload.sub;
}