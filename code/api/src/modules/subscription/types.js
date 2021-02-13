// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import { UserType } from '../user/types'
import CrateType from '../crate/types'
import OrderType from '../order/types'

// Subscription type
const SubscriptionType = new GraphQLObjectType({
  name: 'subscription',
  description: 'Subscription Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    crate: { type: CrateType },
    orders: { type: new GraphQLList(OrderType) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default SubscriptionType
