'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('gear-share:server.js');

const errors = require('./lib/err-middleware.js');

dotenv.load();

const PORT = process.env.PORT;
const app = express();


mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(errors);

const server = module.exports = app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});

server.isRunning = true;
