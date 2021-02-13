// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import OrderType from './types'
import { create, remove, update } from './resolvers'

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

// Update order
export const orderUpdate = {
  type: OrderType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    status: {
      name: 'status',
      type: GraphQLString
    },

    deliveryDate: {
      name: 'deliveryDate',
      type: GraphQLString
    }

  },
  resolve: update
}
