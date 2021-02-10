// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import SubscriptionType from '../subscription/types'

// Order type
const OrderType = new GraphQLObjectType({
  name: 'order',
  description: 'Order Type',

  fields: () => ({
    id: { type: GraphQLInt },
    subscription: { type: SubscriptionType },
    deliveryDate: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default OrderType
