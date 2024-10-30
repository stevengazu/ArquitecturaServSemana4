const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true, minlength: 6},
    bio: { type: String, maxlength: 500},
    active: { type: Boolean, default: false},
    verified: { type: Boolean, default: false},
},
{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id=ret._id;
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
userSchema.methods.checkPassword = function (plainpassword) {
   
    return bcrypt.compare(plainpassword, this.password);
};

userSchema.pre("save", function (next) {
   if(this.isModified("password")){
       bcrypt.hash(this.password, 8, (error, hash) => {
           if(error){
               return next(error);
           }
           this.password = hash;
           next();
       });
   }else{
       next();
   }
});
module.exports = mongoose.model("User", userSchema);