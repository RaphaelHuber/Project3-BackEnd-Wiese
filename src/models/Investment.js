const mongoose = require('mongoose');
const { Schema } = mongoose;

const investmentSchema = new Schema({
  investor: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  invAmount: Number
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Investment = mongoose.model('investment', investmentSchema);

module.exports = Investment;
