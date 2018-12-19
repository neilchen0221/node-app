const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  }
});

const University = mongoose.model('University', universitySchema, 'University');
module.exports = University;
