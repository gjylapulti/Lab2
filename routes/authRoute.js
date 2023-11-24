import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
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

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

export default router;
