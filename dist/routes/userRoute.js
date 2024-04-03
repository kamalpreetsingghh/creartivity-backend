"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controllers/userController");
const router = express.Router();
router.post("/signup", userController_1.signUp);
router.get("/getuser", userController_1.getUser);
module.exports = router;
