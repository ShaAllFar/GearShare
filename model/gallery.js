'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  createdOn: {type: Date, default: Date.now},
  userID: {type: Schema.Types.ObjectId, required: true},
  postIDs: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('gallery', gallerySchema);
