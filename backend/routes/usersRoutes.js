const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");

router.get("/users", usersController.getUsers);
router.post("/users", usersController.addUser);
router.put("/users/:id", usersController.editUser);
router.patch("/users/:id/status", usersController.toggleUserStatus);

module.exports = router;
