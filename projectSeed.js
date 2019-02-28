const mongoose = require('mongoose');
const Project = require('./src/models/Project');

mongoose.connect('mongodb://localhost/wiese');

const projects = [{
  company: '5c7695a7d7340b282f52ec68',
  investments: [],
  name: 'Power Plant',
  country: 'Kanto',
  energySource: 'Hydro',
  description: 'Located by Cerulean City, this power plant provides energy to Kanto and Johto',
  responsiblePerson: {
    name: 'Zapdos',
    email: 'shock@legendarybirds.com',
    telephone: 145145
  },
  minimumAmount: 2000000,
  targetAmount: 10000000,
  projectStatus: 'Approved',
  investmentPeriod: 12,
  repayment: {
    expectedReturn: 0.1,
    gracePeriod: 12,
    years: 20,
    periodicity: 12
  },
  pictures: ['https://cdn.bulbagarden.net/upload/thumb/4/48/Power_Plant_interior_FRLG.png/735px-Power_Plant_interior_FRLG.png'],
  financials: [String]
}, {
  company: '5c7695a7d7340b282f52ec68',
  investments: [],
  name: 'Shadow Moses',
  country: 'Alaska',
  energySource: 'Other',
  description: 'Weapons OSP',
  responsiblePerson: {
    name: 'Snake',
    email: 'solid@foxhound.com',
    telephone: 470455
  },
  minimumAmount: 30000000,
  targetAmount: 10000000,
  projectStatus: 'Under review',
  investmentPeriod: 24,
  repayment: {
    expectedReturn: 0.05,
    gracePeriod: 36,
    years: 10,
    periodicity: 12
  },
  pictures: ['https://files.gamebanana.com/img/ss/maps/530-90_57f0d41ad0a88.jpg'],
  financials: [String]
}, {
  company: '5c7695a7d7340b282f52ec68',
  investments: [],
  name: 'Sionis Steel Mill',
  country: 'Gotham',
  energySource: 'Bio',
  description: 'The Steel Mill is a factory that was tied to Arkham City by Hugo Strange, and was a part of the Industrial District. During Batman: Arkham City, Joker used the Steel Mill as his main base of operations.',
  responsiblePerson: {
    name: 'Bruce',
    email: 'bat@wayneenterprises.com',
    telephone: 500000
  },
  minimumAmount: 5000000,
  targetAmount: 8000000,
  projectStatus: 'Rejected',
  investmentPeriod: 12,
  repayment: {
    expectedReturn: 0.15,
    gracePeriod: 36,
    years: 15,
    periodicity: 12
  },
  pictures: ['https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  financials: [String]
}, {
  company: '5c7695a7d7340b282f52ec68',
  investments: [],
  name: 'Stark Factory',
  country: 'USA',
  energySource: 'Wind',
  description: 'Iron Man\'s ultra-advanced weapons factory',
  responsiblePerson: {
    name: 'Pepper',
    email: 'potts@stark.com',
    telephone: 123456
  },
  minimumAmount: 15000000,
  targetAmount: 15000000,
  projectStatus: 'Under review',
  investmentPeriod: 12,
  repayment: {
    expectedReturn: 0.08,
    gracePeriod: 12,
    years: 20,
    periodicity: 12
  },
  pictures: ['http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg.jpg'],
  financials: [String]
}
];

Project.create(projects, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${projects.length} projects`);
});
