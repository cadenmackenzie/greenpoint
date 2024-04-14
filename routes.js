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
  const city = req.query.city
  const accessToken = process.env.MAPBOX_API;
  const data = require('./inventory.json');
  const cityData = data[city]
  let addresses = cityData.nearby_stops;
  addresses.push(cityData.address)
  addresses.unshift(cityData.address)
//   const addresses = [
//     'Ramón Corona 1, Centro, 45680 El Salto, Jal.',
//     "Heliodoro Hernández Loza 344, Potrero Nuevo, 45680 El Salto, Jal.",
//     "Potrero Nuevo, 45680 El Salto, Jalisco",
//     "45680, Lázaro Cárdenas 42, Potrero Nuevo, El Salto, Jal.",
//     "Revolución Nte. 81, Potrero Nuevo, 45680 El Salto, Jal.",
//     "C. Independencia 160, Centro, 45680 El Salto, Jal.",
//     "Agustín de Iturbide 4, Centro, 45680 El Salto, Jal.",
//     "Higuera 65, 45680 El Salto, Jal.",
//     "Independencia el salto, 45680 Guadalajara, Jal.",
//     "Unnamed Road, Mesa de Los Laureles, El Salto, Jal.",
//     "45680 El Salto, Jalisco",
//     'Ramón Corona 1, Centro, 45680 El Salto, Jal.'
// ];

  const stops = [];
  const coordinates = [];
  let failedAddresses = [];

  for (const address of addresses) {
      const coord = await geocodeAddress(address, accessToken);
      if (coord) {
          coordinates.push(coord.join(','));
          stops.push({ address, coordinates: coord });
      } else {
          console.error("Failed to geocode address:", address);
          failedAddresses.push(address);
      }
  }

  if (failedAddresses.length > 0) {
      console.log("Some addresses failed to geocode:", failedAddresses);
      // Consider how you want to handle partial success
  }

  const baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  const coordinateString = coordinates.join(';');

  try {
      const response = await axios.get(`${baseUrl}/${coordinateString}`, {
          params: {
              alternatives: false,
              geometries: 'geojson',
              steps: true,
              access_token: accessToken,
              overview: 'full'
          }
      });
      res.json({ location: response.data, stops, failedAddresses });
  } catch (error) {
      console.error('Failed to get directions:', error);
      res.status(500).send('Error getting directions.');
  }
});


async function geocodeAddress(address, accessToken) {
  try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}`;
      const response = await axios.get(url);
      if (response.data.features && response.data.features.length) {
          return response.data.features[0].center; // returns [longitude, latitude]
      } else {
          console.error("No geocoding results for address:", address);
          return null;
      }
  } catch (error) {
      console.error("Geocoding failed for address: " + address, error.message);
      return null;
  }
}

  
};