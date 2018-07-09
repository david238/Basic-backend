const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  }
});

// REMOVE THE BELOW FROM THE SCHEMA,
//   productImage: {
//     type: String
//   }

var User = mongoose.model('User', UserSchema);

module.exports = {User};
