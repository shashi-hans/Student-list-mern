const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rollno: {
    type: Number,
    required: true
  }
}, {
    collection: 'students'
  })
module.exports = mongoose.model('Student', studentSchema)