const bcrypt = require('bcrypt');

export const userData1 = {
  id: 1,
  name: 'The Admin',
  email: 'admin@crate.com',
  password: bcrypt.hashSync('1234567890', 10),
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date(),
  streetAddress: "123 Admin St",
  city: "Denver",
  state: "Colorado",
  zip: "80123",
  country: "USA",
  image: "https://www.chicagotribune.com/resizer/NUc4EPJ-swl5GzWbfbKR8vH0pd0=/800x440/top/www.trbimg.com/img-546459ac/turbine/redeye-jake-from-state-farm-commercial-20141112",
  description: "Jake from State Farm"
};

export const userData2 = {
  id: 2,
  name: 'The User',
  email: 'user@crate.com',
  password: bcrypt.hashSync('123456890', 10),
  role: "USER",
  createdAt: new Date(),
  updatedAt: new Date(),
  streetAddress: "987 User St",
  city: "Denver",
  state: "Colorado",
  zip: "80123",
  country: "USA",
  image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/CFE3/production/_108391235_nessie.jpg",
  description: "Nessie"
};
