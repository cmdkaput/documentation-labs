import * as fs from 'fs';
import { faker } from '@faker-js/faker';

const generate = () => {
  const stream = fs.createWriteStream('data.csv');
  stream.write('restaurantName,cuisine,userName,userEmail,role,rating,comment\n');

  for (let i = 0; i < 1000; i++) {
    const row = [
      faker.company.name().replace(/,/g, ''),
      faker.helpers.arrayElement(['Ukrainian', 'Italian', 'Asian']),
      faker.internet.username(),
      faker.internet.email(),
      faker.helpers.arrayElement(['VISITOR', 'ADMIN', 'OWNER']),
      faker.number.int({ min: 1, max: 5 }),
      faker.lorem.sentence()
    ].join(',');
    stream.write(row + '\n');
  }
  stream.end();
  console.log('data.csv created');
};
generate();