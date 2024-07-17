// Import the Node.js path module for working with file and directory paths
const path = require('path');

// Export a function that takes an Express app instance as a parameter
module.exports = (app) =>
  // Handle GET requests to the root URL ('/')
  app.get('/', (req, res) =>
    // Send the index.html file located in the client/dist directory
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
