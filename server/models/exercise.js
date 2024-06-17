const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    repetitions: {
        type: Number,
        required: true
    },
    // Outros campos como carga, descrição, etc., se necessário
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
