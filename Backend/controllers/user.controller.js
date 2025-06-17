const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokken.model');
const sendOTP = require('../utils/email');

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        // Only allow Gmail addresses
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
            return res.status(400).json({ error: "Only valid Gmail addresses are allowed" });
        }

        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (!fullName || !fullName.firstname || !fullName.lastname) {
            return res.status(400).json({ error: "Full name is required" });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const role = email === 'admin@example.com' ? 'admin' : 'user';

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

        const user = await userService.createUser({
            firstname: fullName.firstname,
            lastname: fullName.lastname,
            email,
            password: hashedPassword,
            role,
        });

        // Save OTP to user
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP email
        await sendOTP(email, otp);

        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ token, user, message: "OTP sent to email" });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token, user });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json({ user: req.user });
};

module.exports.logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        console.log('Logout token:', token); 
        if (token) {
            await blacklistTokenModel.create({ token });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
};

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Only allow Gmail addresses
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
        return res.status(400).json({ error: "Only valid Gmail addresses are allowed" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to email" });
};

module.exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    user.password = await userModel.hashPassword(newPassword);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
};

// POST /api/auth/verify
module.exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });
        if (user.isVerified) return res.status(400).json({ error: "User already verified" });

        if (user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = "You have verified your email";
        user.otpExpiresAt = null;
        await user.save();

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

    // check if a user exists with this email
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }

    // generate an OTP and set it in DB
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpires = otpExpires;
    // send otp
    sendOTP(email, otp)

    user.save()     // save the otp in the DB
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
        const user = await User.findOne({ otp });            // dubious
        if (!user){
            return res.status(400).json({error: "Invalid or expired OTP"})
        }

        if (user.otp != otp) {
            return res.status(400).json({ error: "OTP didn't match" })
        }

        // check if new password and confirm new password match
        if (newPassword != confirmNewPassword) {
            return res.status(400).json({ error: "new password and confirm new password doesn't match" })
        }

        // update and save the new passowrd in the daatabae
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        
        // remove the otp and otpExpiresAt from db
        user.otp = null;
        user.otpExpiresAt = null;

        await user.save()

        res.json({      // test response
            message: "Password changed successfully"
        })

    } catch (error) {
        console.log(error)
    }
}

