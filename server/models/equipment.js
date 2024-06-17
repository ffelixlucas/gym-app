const mongoose = require('mongoose');
const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
