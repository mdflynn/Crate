// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports


// 🌟 Add/Import new models here


import * as user from '../../modules/user/query'
import * as product from '../../modules/product/query'
import * as crate from '../../modules/crate/query'
import * as subscription from '../../modules/subscription/query'

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...product,
    ...crate,
    ...subscription


    // 🌟 Add new fields here


  })
})

export default query
