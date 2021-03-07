const cors = require('cors'),
    express = require('express');

module.exports = async ({ app }) => {
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
