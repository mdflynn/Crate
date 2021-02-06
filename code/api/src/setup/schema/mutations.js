// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'

// Mutation
// 📝 This is where mutations fields are imported and put together. We'll need to add new a new mutation field here for an order_products, order/delivery, or another model here and import above
// 📝 Mutations are like our post requests in a REST API. They create, modify, and delete resources
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

export default mutation
