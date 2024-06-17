const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    trainingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        required: true
    },
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    repetitions: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
