'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  name: { type: String, required: true},
  desc: { type: String, required: true},
  created: { type: Date, default: Date.now},
  userID: { type: Schema.Types.ObjectId, required: true},
  galleryID: { type: Schema.Types.ObjectId, required: true},
  price: { type: Number, required: true},
  category: { type: String, required: true},
  images: [{type: Schema.Types.ObjectId, ref: 'image'}],
});

module.exports = mongoose.model('post', postSchema);
