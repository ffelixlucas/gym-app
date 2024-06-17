const mongoose = require('mongoose');
const exerciseSchema = require('./exercise');

const trainingSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    exercises: [exerciseSchema]
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
