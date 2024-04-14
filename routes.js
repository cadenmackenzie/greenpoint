const axios = require('axios');
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});
require('dotenv').config();


module.exports = function(app, upload, openai, s3) {
  app.get('/test', async (req, res) => {
    
    res.json({ message: 'Hello from the server!' });
  });

  app.get('/inventory', async (req, res) => {
    const data = require('./inventory.json');
    res.json(data);
  });

  app.get('/directions', async (req, res) => {
    try {
      console.log(process.env.GOOGLE_MAPS_API);
      const response = await client.directions({
        params: {
          origin: 'Ramón Corona 1, Centro, 45680 El Salto, Jal.',
          destination: 'Ramón Corona 1, Centro, 45680 El Salto, Jal.',
          waypoints: [
            {location: 'Heliodoro Hernández Loza 344, Potrero Nuevo, 45680 El Salto, Jal.', stopover: true},
            {location: 'Potrero Nuevo, 45680 El Salto, Jalisco', stopover: true},
            // Add more waypoints here
            {location: '45680, Lázaro Cárdenas 42, Potrero Nuevo, El Salto, Jal.', stopover: true}
          ],
          optimize: true, // This will attempt to reorder waypoints to minimize travel time
          key: process.env.GOOGLE_MAPS_API
        }
      });
  
      // console.log(response.data);
      res.json({ message: response.data });
      // You can parse response.data.routes to find detailed routing information
    } catch (error) {
      console.error("Failed to get directions:", error.message);
      console.log(error.response ? error.response.data : error);
      res.status(500).send('Error getting directions.');
    }
    
  });
  
};