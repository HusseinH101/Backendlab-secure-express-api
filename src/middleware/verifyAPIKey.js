// Middleware that checks if the request contains a valid API key
function verifyAPIKey(req, res, next) {
    // Read API key from query string:
    const queryKey = req.query.apiKey

    // Read API key from header:
    const headerKey = req.headers["x-api-key"]

    // Read the valid API key from .env
    const validKey = process.env.API_KEY

    // Allow access if the query key OR header key matches the valid key
    if (queryKey === validKey || headerKey === validKey) {
        return next()
    }

    // If key is missing or wrong, deny access
    res.status(401).json({ error: "Invalid or missing API key" })
}

export default verifyAPIKey