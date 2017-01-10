'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  name: { type: String, required: true},
  desc: { type: String, required: true},
  created: { type: Date, required: true, default: Date.now},
  userID: { type: Schema.Types.ObjectId, required: true},

  galleryID: { type: String, required: true},

  price: { type: Number, required: true}
});

module.exports = mongoose.model('post', postSchema);
