const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   
    title: { type: String, required: true, minlength: 5 },
    text: { type: String, required: true, minlength: 5 },
    author: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
},
{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id=ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});

module.exports = mongoose.model("Post", postSchema);