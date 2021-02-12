// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SubscriptionType from '../subscription/types'

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    streetAddress: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    subscriptions: { type: new GraphQLList(SubscriptionType) },
    country: { type: GraphQLString },
    twitter: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

// User Login type
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',

  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

// User Gender type
const UserGenderType = new GraphQLObjectType({
  name: 'userGender',
  description: 'User Gender Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

export { UserType, UserLoginType, UserGenderType }
