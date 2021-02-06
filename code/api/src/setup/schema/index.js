// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
// 📝 Schema is built here! Won't modify this file though
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
