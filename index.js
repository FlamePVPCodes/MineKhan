// Import the required modules
const express = require("express");
const app = express();

// Define the port number
const port = 4000;

// Middleware to enable CORS and serve static files
app.use('/', (req, res, next) => {
    // Allow SharedArrayBuffer
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// Start the server
app.listen(port, () => {
    console.log(`🔥 Server is up and running on port ${port}! 🔥`);
});
