const notFoundMiddleware = (req, res) => res.status(404).send("<h2>404 Route is not valid</h2>");

module.exports = notFoundMiddleware;
