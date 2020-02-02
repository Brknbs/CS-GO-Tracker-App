const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const profile = require('./routes/profile');

const app = express();
const PORT = process.env.PORT;

// Dev logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Proile route
app.use('/api/v1/profile/steam', profile);

// Handle production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname, '/public/index.html'));
}

app.get('/', (req, res) => {
  res.send(`This is the back-end on port ${PORT}`);
})

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`))