import express from "express";
import { getAllDoctorsUsingAI } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getAllDoctorsUsingAI)

export default router;
