const mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  productImage: {
    type: String
  }
});


var Image = mongoose.model('Image', ImageSchema);

module.exports = {Image};
