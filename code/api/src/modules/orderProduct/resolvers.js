// App Imports
import models from '../../setup/models'

// Get orderProducts by ID
export async function get(parentValue, { id }) {
  return await models.OrderProduct.findOne({
    where: { id },
    include: [
      { model: models.Product, as: 'product' },
      { model: models.Order, as: 'order' }
    ]
  })
}

// Get orderProducts by user
// Nested products and orders are not working
export async function getByUser(parentValue, { id }) {
  return await models.sequelize.query(`SELECT * FROM "orderProducts" INNER JOIN "subscriptions" ON "subscriptions".id = "orderProducts"."orderId" WHERE "subscriptions"."userId" = ${id};`, {
    model: models.OrderProduct,
    mapToModel: true
  })
}

// Get all orderProducts
export async function getAll() {
  return await models.OrderProduct.findAll({
    include: [
      { model: models.Product, as: 'product' },
      { model: models.Order, as: 'order' }
    ]
  })
}

// Create order
// export async function create(parentValue, { crateId }, { auth }) {
//   if(auth.user && auth.user.id > 0) {
//     return await models.OrderProduct.create({
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
//     return await models.OrderProduct.destroy({where: {id, userId: auth.user.id}})
//   } else {
//     throw new Error('Access denied.')
//   }
// }
