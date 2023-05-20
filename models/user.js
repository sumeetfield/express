const mongoose = require('mongoose')

userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: Number,
  email: String,
  userType: Number, // 1 for regular user, 2 for premium user
  age: Number,
  gender: String, // male, female, or other
  religion: String,
  caste: String,
  subcaste: String,
  education: String,
  occupation: String,
  income: Number,
  location: {
    city: String,
    state: String,
    country: String
  },
  interests: [String],
  about: String,
  photos: [String],
  preferences: {
    age: {
      min: Number,
      max: Number
    },
    gender: String,
    religion: String,
    caste: String,
    subcaste: String,
    education: String,
    occupation: String,
    income: {
      min: Number,
      max: Number
    },
    location: {
      city: String,
      state: String,
      country: String
    },
    interests: [String]
  }
})

module.exports = mangoose.model('user',userSchema)
