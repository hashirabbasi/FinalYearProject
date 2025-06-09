const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const workerSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Lastname must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    location: {
        ltd: { type: Number },
        lng: { type: Number },
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['plumber', 'electrician', 'carpenter', 'cleaner', 'painter', 'other'],
    },
    experience: {
        type: Number,
        min: [0, 'Experience must be a non-negative number'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+?\d{10,15}$/, 'Enter a valid phone number'],
    }
    
}, { timestamps: true });

// 🔐 Auto-hash password before saving
workerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔐 JWT token
workerSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, role: 'worker' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// 🔐 Compare password
workerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Optional static method to hash password
workerSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;
