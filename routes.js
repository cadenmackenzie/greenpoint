const axios = require('axios');

module.exports = function(app, upload, openai, s3) {
  app.get('/test', async (req, res) => {
    
    res.json({ message: 'Hello from the server!' });
  });

  app.get('/inventory', async (req, res) => {
    const data = require('./inventory.json');
    res.json(data);
  });

  
};