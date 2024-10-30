const { post } = require("../config/routes.config");
const Post = require("../models/post.model");


module.exports.create = (req, res) => { 
    req.body.user = req.user.id;

    Post.create(req.body)
    .then((post) => {
        res.status(201).json(post);
    })
    .catch((error) => {
        res.status(400).json(error);
    });
};

module.exports.list = (req, res) => {
    Post.find()
    //populate("user") para que me traiga el usuario completo
    .populate("user")
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(400).json(error);
    });
};

module.exports.detail = (req, res) => {  
    Post.findById(req.params.id)
    .then((post) => {
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json(post);
    })
    .catch((error) => {
        res.status(404).json(error);
    });
};

module.exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) 
    .then((post) => {
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json(post);
    })
    .catch((error) => {
        res.status(404).json(error);
    });
};

module.exports.delete = (req, res) => {
     Post.findByIdAndDelete(req.params.id)
    .then((post) => {
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(204).json();
    })
    .catch((error) => {
        res.status(404).json(error);
    });
};
