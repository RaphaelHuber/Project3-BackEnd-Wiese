const mongoose = require('mongoose');
const Project = require('./src/models/Project');

mongoose.connect('mongodb://localhost/wiese');

const projects = [{
  owner: '5c85a73614daaac8d35979fe',
  investments: [],
  name: 'Mini-Hydro Plant',
  company: 'TheAwesomeCompany',
  country: 'Kanto',
  energySource: 'Hydro',
  description: 'Located by Cerulean City, this power plant provides energy to Kanto and Johto. With it\'s 5MW it will be able to provide sufficient clean energy to more than 4000 households around it, while having a minimal effect on the enviroment.',
  responsiblePerson: {
    name: 'Zapdos',
    email: 'shock@legendarybirds.com',
    telephone: 145145
  },
  minimumAmount: 2000000,
  targetAmount: 10000000,
  minimumInvestment: 500,
  projectStatus: 'Approved',
  expectedReturn: 0.1,
  investmentPeriod: 12,
  paymentPeriod: 360,
  periodicity: 12,
  pictures: ['https://cdn.bulbagarden.net/upload/thumb/4/48/Power_Plant_interior_FRLG.png/735px-Power_Plant_interior_FRLG.png'],
  financials: [String]
}, {
  owner: '5c85a73614daaac8d35979fe',
  investments: [],
  name: 'Shadow Moses',
  company: 'TUA',
  country: 'Alaska',
  energySource: 'Other',
  description: 'This new alakian technology mixes photovoltaics with hydro power and offers a specialy effecient renewable power source in the coldes regions of earth. Low maintenance and cost makes this method especially lucrative for investors. The area populated by these panels will be proportional to the amount raised.',
  responsiblePerson: {
    name: 'Snake',
    email: 'solid@foxhound.com',
    telephone: 470455
  },
  minimumAmount: 300000,
  targetAmount: 3000000,
  minimumInvestment: 100,
  projectStatus: 'Under review',
  expectedReturn: 0.15,
  investmentPeriod: 6,
  paymentPeriod: 180,
  periodicity: 6,
  pictures: ['https://files.gamebanana.com/img/ss/maps/530-90_57f0d41ad0a88.jpg'],
  financials: [String]
}, {
  owner: '5c85a73614daaac8d35979fe',
  investments: [],
  name: 'Sionis Steel Mill',
  company: 'Halte',
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
  minimumInvestment: 200,
  projectStatus: 'Rejected',
  expectedReturn: 0.06,
  investmentPeriod: 12,
  paymentPeriod: 480,
  periodicity: 12,
  pictures: ['https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  financials: [String]
}, {
  owner: '5c85a73614daaac8d35979fe',
  investments: [],
  name: 'Stark Factory',
  company: 'EveR',
  country: 'USA',
  energySource: 'Wind',
  description: 'Iron Man\'s ultra-advanced weapons factory will be restructured to a wind power plant helping nearby households reducing their bills and enjoying cleaner air for their children.',
  responsiblePerson: {
    name: 'Pepper',
    email: 'potts@stark.com',
    telephone: 123456
  },
  minimumAmount: 15000000,
  targetAmount: 15000000,
  minimumInvestment: 2000,
  projectStatus: 'Under review',
  expectedReturn: 0.09,
  investmentPeriod: 12,
  paymentPeriod: 240,
  periodicity: 12,
  pictures: ['http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg.jpg'],
  financials: [String]
}, {
  owner: '5c87adce41fafa2944f8da7d',
  investments: [],
  name: 'Solar for all',
  company: 'Novems',
  country: 'Maldives',
  energySource: 'Solar',
  description: 'With our newly developed floating solar panels we can have more area at our disposal and reduce the cost of construction. Building these next to hotels in the Maldives we can reduce the burned diesel by 50% and provide clean energy and low enviromental impact energy.',
  responsiblePerson: {
    name: 'Jack',
    email: 'jack@isawesome.com',
    telephone: 786498310
  },
  minimumAmount: 800000,
  targetAmount: 1200000,
  minimumInvestment: 200,
  projectStatus: 'Under review',
  expectedReturn: 0.10,
  investmentPeriod: 12,
  paymentPeriod: 240,
  periodicity: 12,
  pictures: ['https://news-media.energysage.com/wp-content/uploads/2018/10/10.17.2018_Floating-panels.jpg'],
  financials: [String]
}, {
  owner: '5c87adce41fafa2944f8da7d',
  investments: [],
  name: 'Wind energy saving dolphins',
  company: 'NovaOnda',
  country: 'Brazil',
  energySource: 'Wind',
  description: 'Every year more than 50.000L of oil leaks in the ocean through broken pipes delivering oil to the local power plant to produce energy for the Cucama town in the north of Brazil. By building a new wind farm we can replace this outdated powerplant and stop the oil leakage into the ocean and therefore saving the local dolphins.',
  responsiblePerson: {
    name: 'Nicole',
    email: 'nicole@saves.com',
    telephone: 8963481649
  },
  minimumAmount: 1000000,
  targetAmount: 2000000,
  minimumInvestment: 400,
  projectStatus: 'Under review',
  expectedReturn: 0.10,
  investmentPeriod: 12,
  paymentPeriod: 360,
  periodicity: 6,
  pictures: ['https://3ohkdk3zdzcq1dul50oqjvvf-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/Wind-farm-Canada.jpg'],
  financials: [String]
}, {
  owner: '5c87adce41fafa2944f8da7d',
  investments: [],
  name: 'Biomass changing lives',
  company: 'Saive',
  country: 'Cuba',
  energySource: 'Bio',
  description: 'While CUba only uses 60% of its produced sugar cane we want to construct a modern biomass power plant burning sugar cane to produce energy and using the ashes as fertilizes for the new plants.',
  responsiblePerson: {
    name: 'Jane',
    email: 'jane@sugar.com',
    telephone: 987392864
  },
  minimumAmount: 2000000,
  targetAmount: 2000000,
  minimumInvestment: 1000,
  projectStatus: 'Under review',
  expectedReturn: 0.14,
  investmentPeriod: 12,
  paymentPeriod: 360,
  periodicity: 3,
  pictures: ['https://www.utilities-me.com/sites/default/files/utme/styles/full_img/public/images/2018/01/08/Biomass_Korea.jpg?itok=2N-mXR-5'],
  financials: [String]
}
];

Project.create(projects, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${projects.length} projects`);
});
