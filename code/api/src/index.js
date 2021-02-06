// 📝 The starting point of our whole app... I think. Likely won't need to modify anything here
// Imports
import express from 'express'

// App Imports
import setupLoadModules from './setup/load-modules'
import setupGraphQL from './setup/graphql'
import setupUpload from './setup/upload'
import setupStartServer from './setup/start-server'

// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)

// Setup uploads
setupUpload(server)

// Setup GraphQL
// 📝 The important part we'll be playing with
setupGraphQL(server)

// Start server
setupStartServer(server)
