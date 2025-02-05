const express = require('express');
const app = express();
const claimRoutes = require('./routes/claimRoutes');
const policyRoutes = require('./routes/policyRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');

app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use('/claims', claimRoutes);
app.use('/policies', policyRoutes);
app.use('/policyholders', policyholderRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});