var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mikesFridge');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we connected to Mike's Fridge!")
})

var Schema = mongoose.Schema;

var beerSchema = new Schema ({
  name: string,
  brewery: string,
  style: string,
  abv: number,
  quantity: number,
  cold: boolean,
  image: string,
  price: number,
  size: string,
  ordered: date,
  description: string
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
