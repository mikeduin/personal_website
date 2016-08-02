var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogpostSchema = new Schema ({
  title: String,
  titlestring: String,
  author: String,
  tags: Array,
  date: {type: Date, default: Date.now},
  image: String,
  imageCaption: String,
  post: String
}, {collection: 'alaBlog'});

mongoose.model('Blogpost', blogpostSchema);
