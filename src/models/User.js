const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  role: { type: String, enum: ['Regular', 'Admin'], default: 'Regular' },
  username: String,
  email: String,
  password: String,
  name: String,
  document: Number,
  birthDate: Date,
  address: String,
  credit: { type: Number, default: 0 },
  bank: Number,
  account: Number,
  investments: [{ type: Schema.Types.ObjectId, ref: 'Investment' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
