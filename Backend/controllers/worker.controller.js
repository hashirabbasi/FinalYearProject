const workerModel = require('../models/worker.model');
const workerService = require('../services/worker.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokken.model');

// Register new worker (default status: inactive)
exports.registerWorker = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const existing = await workerModel.findOne({ email: req.body.email });
  if (existing) return res.status(400).json({ message: "Worker already exists" });

  const {

    firstname,
    lastname,
    email,
    password,
    phone,
    serviceType,
    experience
  } = req.body;

  try {
    const worker = await workerService.createWorker({
      firstname,
      lastname,
      email,
      password,
      phone,
      serviceType,
      experience,
      status: "inactive" // force status = inactive
    });

    const token = worker.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ token, worker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login only if worker is approved (status: active)
exports.loginWorker = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const worker = await workerModel.findOne({ email }).select('+password');
    if (!worker || !(await worker.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (worker.status !== 'active') {
      return res.status(403).json({ error: 'Your account is pending admin approval.' });
    }

    const token = worker.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, worker });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// View own profile
exports.getWorkerProfile = (req, res) => {
  res.status(200).json({ worker: req.worker });
};

// Logout
exports.logoutWorker = async (req, res) => {
  try {
    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

    if (!token) {
      return res.status(400).json({ error: 'No token found to logout' });
    }

    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (!blacklisted) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/auth/verify
module.exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const worker = await workerModel.findOne({ email });

        if (!worker) return res.status(400).json({ error: "Worker not found" });
        if (worker.isVerified) return res.status(400).json({ error: "Worker already verified" });

        if (worker.otp !== otp || worker.otpExpiresAt < new Date()) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        worker.isVerified = true;
        worker.otp = "You have verified your email";
        worker.otpExpiresAt = null;
        await worker.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    // check if a worker exists with this email
    const worker = await worker.findOne({ email })
    if (!worker) {
        return res.status(400).json({ error: "worker not found" })
    }

    // generate an OTP and set it in DB
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    worker.otp = otp;
    worker.otpExpires = otpExpires;
    // send otp
    sendOTP(email, otp)

    worker.save()     // save the otp in the DB
    res.json({
        email: email,
        message: "Otp sent on email"
    })
}

module.exports.resetPassword = async (req, res) => {
    try {
        const { otp, newPassword, confirmNewPassword } = req.body;

        if (!otp || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ error: "All fields are required" })
        }

        // matching the otp
        const worker = await worker.findOne({ otp });            // dubious
        if (!worker){
            return res.status(400).json({error: "Invalid or expired OTP"})
        }

        if (worker.otp != otp) {
            return res.status(400).json({ error: "OTP didn't match" })
        }

        // check if new password and confirm new password match
        if (newPassword != confirmNewPassword) {
            return res.status(400).json({ error: "new password and confirm new password doesn't match" })
        }

        // update and save the new passowrd in the daatabae
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        worker.password = hashedPassword;
        
        // remove the otp and otpExpiresAt from db
        worker.otp = null;
        worker.otpExpiresAt = null;

        await worker.save()

        res.json({      // test response
            message: "Password changed successfully"
        })

    } catch (error) {
        console.log(error)
    }
}

