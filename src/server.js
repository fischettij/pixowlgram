const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Logging on development mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/images', express.static('uploads'));

// Routes
app.use('/', require('./router'));

module.exports = app;
