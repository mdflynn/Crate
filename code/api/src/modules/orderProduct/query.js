// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import OrderProductType from './types'
import { getAll, getByUser, get } from './resolvers'

// OrderProducts All
export const orderProducts = {
  type: new GraphQLList(OrderProductType),
  resolve: getAll
}

// OrderProducts by user
export const orderProductsByUser = {
  type: new GraphQLList(OrderProductType),
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getByUser
}

// OrderProduct By id
export const orderProduct = {
  type: OrderProductType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}
