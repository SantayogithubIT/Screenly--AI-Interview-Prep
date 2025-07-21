import mongoose from "mongoose";

const UserAnswerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    mockRefId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correctAns: {
        type: String,
        required: true
    },
    userAns: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    userEmail :{
        type : String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

export default mongoose.models.UserAnswer || mongoose.model('UserAnswer', UserAnswerSchema, 'UserAnswer');