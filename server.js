const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Import and use routes
require('./routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});