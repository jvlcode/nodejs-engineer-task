const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error details
    res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;
