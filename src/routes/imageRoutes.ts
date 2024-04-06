import express from "express";
import { getAllImages, getImagesIds } from "../controllers/imageController";

const router = express.Router();

router.get("/", getAllImages);
router.get("/ids", getImagesIds);

module.exports = router;
