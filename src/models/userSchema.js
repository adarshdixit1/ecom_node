const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
