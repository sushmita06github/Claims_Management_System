require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const claimRoutes = require('./routes/claimRoutes');
const policyRoutes = require('./routes/policyRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');

const app = express();

// CORS Configuration (Allow all origins for now)
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("Error: MONGO_URI is not defined in .env file");
    process.exit(1); // Exit if MONGO_URI is missing
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/claims', claimRoutes);
app.use('/policies', policyRoutes);
app.use('/policyholders', policyholderRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
