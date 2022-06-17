const mongoose = require('mongoose');

const calorieSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  caloriesConsumedtoday:{
    type: Number,
    required: false,
    default: 0
  },
  height:{
        type: Number,
        required: true
  },
  weight:{
        type: Number,
        required: true
    }, 
  age:{
        type: Number,
        required: true
  },
  gender:{
    type: String, 
    enum: ["male","female"],
    required: true
  },
  maintainanceCalorie: {
    type: Number,
    required: true,
  },
  calorieGoal: {
    type: Number,
    required: true,
  },
  activity: {
    type: String,
    enum: ["not active","active","very active"],
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = mongoose.model('Calorie', calorieSchema);
  