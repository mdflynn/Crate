// App Imports
import models from '../../setup/models'

// Get order by ID
export async function get(parentValue, { id }) {
  return await models.Order.findOne({
    where: { id },
    include: [
      { model: models.Subscription, as: 'subscription' }
    ]
  })
}

// Get order by user
export async function getByUser(parentValue, { id }) {
  return await models.sequelize.query(`SELECT "orders".* FROM "orders" INNER JOIN "subscriptions" ON "subscriptions".id = "orders".id INNER JOIN "users" ON "subscriptions"."userId" = "users".id WHERE "subscriptions"."userId" = ${id};`, {
    model: models.Order,
    mapToModel: true
  })
}

// Get all orders
export async function getAll() {
  return await models.Order.findAll({
    include: [
      { model: models.Subscription, as: 'subscription' }
    ]
  })
}

// Create order
// export async function create(parentValue, { crateId }, { auth }) {
//   if(auth.user && auth.user.id > 0) {
//     return await models.Order.create({
//       crateId,
//       userId: auth.user.id
//     })
//   } else {
//     throw new Error('Please login to subscribe to this crate.')
//   }
// }

// Delete order
// export async function remove(parentValue, { id }, { auth }) {
//   if(auth.user && auth.user.id > 0) {
//     return await models.Order.destroy({where: {id, userId: auth.user.id}})
//   } else {
//     throw new Error('Access denied.')
//   }
// }
