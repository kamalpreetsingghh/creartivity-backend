import express from "express";
import { getAllImages } from "../controllers/imageController";

const router = express.Router();

router.get("/", getAllImages);

module.exports = router;
