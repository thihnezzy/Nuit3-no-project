const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  state: {
    type: String,
    enum: ['idea', 'inProgress', 'done'],
    default: 'idea',
  },

  name: { type: String, required: true},

  description: {type: String, required: true},

  image: {type: String, required: false},
  
  hashtag: { type: String, required: true},
  
  techStack: { type: [String], required: true},
  
  demo: {type: String},

  desiredSize: {type: Number, required: true},

  coordinator: {
    profileId: {type: mongoose.Schema.ObjectId, ref: 'Profile', required: true}
  },
  
  queueList: [
    {
      profileId: {type: mongoose.Schema.ObjectId, ref: 'Profile'}
    }
  ],
  
  members: [
    {
      profileId: {type: mongoose.Schema.ObjectId, ref: 'Profile'}
    }
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

