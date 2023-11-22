import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER METHOD POST
router.post("/register", registerController);

//LOGIN POST METHOD
router.post("/login", loginController);

//FORGOT PASSWORD - POST
router.post("/forgot-password", forgotPasswordController);

//TEST ROUTE
router.get("/test", requireSignIn, isAdmin, testController);

//PROTECTED  USER ROUTE AUTH
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ADMIN  ROUTE AUTH
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
