const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const paginate = require('express-paginate');

const app = express();

// Logging on development mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(paginate.middleware(10, 50));

// Routes
app.use('/', require('./router'));

app.use('/images', express.static('uploads'));

module.exports = app;
