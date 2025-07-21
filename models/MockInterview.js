import mongoose from 'mongoose'

const InterviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  mockId: {
    type: String,
    required: true
  },
  mockRes: {
    type: String,
    required: true
  },
  jobPosition:{
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  jobExperience:{
    type: String,
    required: true
  },
  createdBy:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.MockInterview || mongoose.model('MockInterview', InterviewSchema, 'mock_interviews');
