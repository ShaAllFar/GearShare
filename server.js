'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('gear-share:server.js');

const imageRouter = require('./route/image-router.js');
const authRouter = require('./route/auth-router.js');
const galleryRouter = require('./route/gallery-router');
const postRouter = require('./route/post-router.js');
const profileRouter = require('./route/profile-router.js');
const errors = require('./lib/err-middleware.js');

dotenv.load();

const PORT = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/img/gear-share-crest.png');
// });

app.use(express.static(`${__dirname}/build`));
app.use(imageRouter);
app.use(authRouter);
app.use(galleryRouter);
app.use(postRouter);
app.use(profileRouter);
app.use(errors);

const server = module.exports = app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});

server.isRunning = true;
