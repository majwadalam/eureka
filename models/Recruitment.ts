import mongoose from 'mongoose';

const RecruitmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  why: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Recruitment || mongoose.model('Recruitment', RecruitmentSchema);