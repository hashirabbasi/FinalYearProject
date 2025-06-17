const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const mapsRoutes = require('./routes/maps.routes'); // Import maps routes

const userRoutes = require('./routes/user.routes');
const workerRoutes = require('./routes/worker.routes');
const adminRoutes = require('./routes/admin.routes');
const rideRoutes = require('./routes/ride.routes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Connect to database
connectToDb();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/workers', workerRoutes);
app.use('/admin', adminRoutes); // Mount admin routes here
app.use('/maps', mapsRoutes); // Use maps routes
app.use('/rides', rideRoutes); // Use ride routes
module.exports = app;
