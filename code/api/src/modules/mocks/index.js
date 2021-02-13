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

export const crateData1 = {
  id: 1,
  name: 'Crate',
  description: 'A crate.',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const subscriptionData1 = {
  id: 1,
  userId: 1,
  crateId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const orderData1 = {
  id: 1,
  subscriptionId: 1,
  status: "delivered",
  deliveryDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

export const orderProductData1 = {
  id: 1,
  orderId: 1,
  productId: 1,
  returned: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const productData1 = {
  id: 1,
  name: 'Belt for Men',
  slug: 'belt-for-men',
  description: 'A very nice belt for men.',
  type: 1,
  gender: 1,
  image: '/images/stock/belt-male.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
