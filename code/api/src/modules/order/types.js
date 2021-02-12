// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SubscriptionType from '../subscription/types'
import OrderProductType from '../orderProduct/types'

// Order type
const OrderType = new GraphQLObjectType({
  name: 'order',
  description: 'Order Type',

  fields: () => ({
    id: { type: GraphQLInt },
    subscription: { type: SubscriptionType },
    deliveryDate: { type: GraphQLString },
    status: { type: GraphQLString },
    orderProducts: { type: new GraphQLList(OrderProductType) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default OrderType
