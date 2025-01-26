import mongoose from 'mongoose';

const HackathonSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  proposalText: {
    type: String,
    required: function() {
    //   return !this.proposalLink;
    },
  },
  proposalLink: {
    type: String,
    required: function() {
    //   return !this.proposalText;
    },
  }
}, {
  timestamps: true,
});

export default mongoose.models.Hackathon || mongoose.model('Hackathon', HackathonSchema); 