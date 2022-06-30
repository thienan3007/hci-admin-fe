import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const STORE_NAME = [
  'District 1',
  'District 2',
  'District 3',
  'District 4',
  'District 5',
  'District 6',
  'District 7',
  'District 8',
  'District 9',
  'District 10',
  'District 11',
  'District 12',
];

// ----------------------------------------------------------------------

const foods = [...Array(12)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/static/mock-images/stores/store_${index + 1}.jpg`,
  name: STORE_NAME[index],
  address: STORE_NAME[index],
  price: faker.datatype.number({ min: 10000, max: 1000000, precision: 0.01 }),
  status: sample(['Closed', 'Open']),
}));

export default foods;
