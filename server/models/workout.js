const mongoose = require('mongoose');
const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
