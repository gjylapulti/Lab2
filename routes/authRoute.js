import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
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

//PROTECTED ROUTE AUTH
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
