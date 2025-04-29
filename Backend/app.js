const dotenv = require('dotenv');
dotenv.config(); // Loads environment variables

const express = require("express");
const cors = require("cors");

const app = express(); // Creates an Express app
app.use(cors());       // Enables Cross-Origin Resource Sharing

const connectToDb = require('./db/db'); // Connects to database
const userRoutes = require('./routes/user.routes'); // Imports user routes

connectToDb();
app.use(express.json()); // Parses incoming JSON data
app.use(express.urlencoded({ extended: true })); // ✅ Fixed syntax

app.get('/', (req, res) => {
    res.send('Hello World!'); // Test route
});

app.use('/users', userRoutes); // Mounts user routes

module.exports = app; // Exports the app for use in server.js
