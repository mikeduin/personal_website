var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogpostSchema = new Schema ({
  title: String,
  author: String,
  tags: Array,
  date: Date,
  image: String,
  imageCaption: String,
  post: String
}, {collection: 'alaBlog'});

mongoose.model('Blogpost', blogpostSchema);
