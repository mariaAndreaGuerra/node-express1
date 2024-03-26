# Broken App Issues
1. Added express.json() middleware to parse the incoming JSON request body.
2. Used await Promise.all() to properly wait for all Promises to resolve before mapping the results.
3. Corrected the catch block to properly handle errors and pass them to the error handling middleware (next(err)).