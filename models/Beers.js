var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var beerSchema = new Schema ({
  name: String,
  brewery: String,
  style: String,
  abv: Number,
  quantity: Number,
  cold: Boolean,
  image: String,
  price: Number,
  size: String,
  ordered: Date,
  description: String
}, {collection: 'mikesFridge'});

mongoose.model('Beer', beerSchema);
