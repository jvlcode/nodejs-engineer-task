const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const timeRoutes = require('./routes/timeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')

app.use(express.json());

app.use(cors()); // Apply CORS middleware

//routes
app.use('/auth', authRoutes);
app.use('/link', linkRoutes);
app.use('/time', timeRoutes);
app.use('/admin', adminRoutes);

//  error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
