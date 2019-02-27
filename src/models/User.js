const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  role: { type: String, enum: ['Investor', 'Company', 'Admin'] },
  document: Number,
  paymentInfo: {
    bank: { type: Number, min: 100, max: 200 },
    account: { type: Number, min: 8000, max: 9000 }
  },
  investments: [{ type: Schema.Types.ObjectId, ref: 'Investment' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
