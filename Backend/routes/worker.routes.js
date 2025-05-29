const express = require("express");
const { body } = require("express-validator");
const authorizationMiddleware = require('../middlewares/auth.middleware');
const workerController = require("../controllers/worker.controller");

const router = express.Router();

console.log("🔧 worker.routes.js loaded");


router.post("/register", [
  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phone").matches(/^\+?\d{10,15}$/).withMessage("Enter a valid phone number"),
  body("serviceType").isIn(["plumber", "electrician", "carpenter", "cleaner", "painter", "other"]).withMessage("Invalid service type"),
  body("experience").isNumeric().withMessage("Experience must be a number")
], workerController.registerWorker);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
], (req, res, next) => {
  console.log("✅ /workers/login hit");
  next();
}, workerController.loginWorker);

router.get("/profile", authorizationMiddleware.authWorker, workerController.getWorkerProfile);
router.get("/logout", authorizationMiddleware.authWorker, workerController.logoutWorker);

module.exports = router;
