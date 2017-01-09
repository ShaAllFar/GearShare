'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postObjSchema = Schema({
  name: { type: String, required: true},
  desc: { type: String, required: true},
  created: { type: String, default: Date.now},
  userID: { type: Schema.Types.ObjectId, required: true},
  galleryID: { type: Schema.Types.ObjectId, required: true},
  imageURI: { type: String, required: true, unique: true},
  objectKey: { type: String, required: true, unique: true},
  price: { type: String, required: true},
  location: { type: String, required: true}
});

module.exports = mongoose.model('postObj', postObjSchema);
