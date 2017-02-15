'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = Schema({
  name: { type: String },
  desc: { type: String },
  created: { type: String, default: Date.now},
  userID: { type: Schema.Types.ObjectId, required: true},
  galleryID: { type: Schema.Types.ObjectId, required: true},
  postID: { type: Schema.Types.ObjectId, required: true},
  imageURI: { type: String, required: true, unique: true},
  objectKey: { type: String, required: true, unique: true}
});

module.exports = mongoose.model('image', imageSchema);
