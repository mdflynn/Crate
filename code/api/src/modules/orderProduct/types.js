// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import ProductType from '../product/types'
import OrderType from '../order/types'

// OrderProduct type
const OrderProductType = new GraphQLObjectType({
  name: 'orderProduct',
  description: 'OrderProduct Type',

  fields: () => ({
    id: { type: GraphQLInt },
    product: { type: ProductType },
    order: { type: OrderType },
    returned: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default OrderProductType
