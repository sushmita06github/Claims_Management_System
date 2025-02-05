require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const claimRoutes = require('./routes/claimRoutes');
const policyRoutes = require('./routes/policyRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/claims', claimRoutes);
app.use('/policies', policyRoutes);
app.use('/policyholders', policyholderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));