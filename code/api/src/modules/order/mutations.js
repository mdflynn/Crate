// Imports
import { GraphQLInt } from 'graphql'

// App Imports
import OrderType from './types'
import { create, remove } from './resolvers'

// Order create
export const orderCreate = {
  type: OrderType,
  args: {
    subscriptionId: {
      name: 'subscriptionId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Order remove
export const orderRemove = {
  type: OrderType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
