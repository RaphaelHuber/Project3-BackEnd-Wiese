const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  investments: [{ type: Schema.Types.ObjectId, ref: 'Investment' }],
  name: String,
  country: String,
  energySource: { type: String, enum: ['Hydro', 'Solar', 'Wind', 'Bio', 'Other']},
  description: String,
  responsiblePerson: {
    name: String,
    email: String,
    telephone: Number
  },
  minimumAmount: Number,
  targetAmount: Number,
  raisedAmount: { type: Number, default: 0 },
  projectStatus: { type: String, enum: ['Under review', 'Approved', 'Rejected']},
  expectedReturn: Number,
  investmentPeriod: Number,
  paymentPeriod: Number,
  periodicity: Number,
  pictures: [String],
  financials: [String]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
