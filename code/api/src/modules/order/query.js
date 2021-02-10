// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import OrderType from './types'
import { getAll, getByUser, get } from './resolvers'

// Order All
export const orders = {
  type: new GraphQLList(OrderType),
  resolve: getAll
}

// Orders by user
export const ordersByUser = {
  type: new GraphQLList(OrderType),
  resolve: getByUser
}

// Order By id
export const order = {
  type: OrderType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}
