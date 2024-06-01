const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'Requested', enum: ['Requested', 'Processing', 'Completed', 'Rejected'] }, // Añadir el campo de estado
  createdAt: { type: Date, default: Date.now },
});

const Return = mongoose.model('Return', returnSchema);
module.exports = Return;
