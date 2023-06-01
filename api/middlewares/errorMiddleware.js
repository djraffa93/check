module.exports = function(err, req, res, next) {
    console.error(err.message); // log the error message for debugging purposes
  
    // return a generic error message to the client
    res.status(500).send('Server Error');
  };