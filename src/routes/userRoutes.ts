import express from "express";
import { getUser, signUp } from "../controllers/userController";

const router = express.Router();

router.post("/signup", signUp);
router.get("/getuser", getUser);

module.exports = router;
