const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    currentStep: { type: Number, default: 1 },
    steps: [{ stepNumber: Number, approved: Boolean }]
});

module.exports = mongoose.model('Request', RequestSchema);
