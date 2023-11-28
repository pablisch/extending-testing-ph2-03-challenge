const { fakerEN_GB: faker } = require('@faker-js/faker');

faker.seed(123);
const name1 = faker.person.fullName()
const name2 = faker.person.fullName()
const name3 = faker.person.fullName()
const address = faker.location.streetAddress(true)
console.log(name1, name2, name3)
console.log(address)

const ukAddress = faker.location.streetAddress() + ', ' +
                  faker.location.city() + ', ' +
                  faker.location.county() + ', ' +
                  faker.location.zipCode();

console.log(ukAddress);

