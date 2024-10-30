const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/posts",authMiddleware.checkSession, postsController.create);
router.get("/posts", authMiddleware.checkSession, postsController.list);
router.get("/posts/:id", authMiddleware.checkSession, postsController.detail);
router.patch("/posts/:id", authMiddleware.checkSession, postsController.update);
router.delete("/posts/:id",authMiddleware.checkSession, postsController.delete);

router.post("/users", usersController.create);
router.post("/login", usersController.login);
router.get("/users/:id/verify", usersController.verify);

module.exports = router;