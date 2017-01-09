'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;


const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');

const toggleServer = require('./lib/toggle-server.js');

const url = `http://localhost:${process.env.PORT}`;
