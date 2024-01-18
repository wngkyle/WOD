import { ApolloServer } from 'apollo-server'
import { context } from './context'
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"; // For offline uses

import { schema } from "./schema" // The schema object you created using Nexus defines your GraphQL schema
                                  // You need to provide this when instantiating your server since that’s 
                                  // how Apollo Server knows which API operations to support in the GraphQL API

export const server = new ApolloServer({
    schema,
    context, // Now, the context object will be initialized with an instance of PrismaClient (as prisma) when ApolloServer is instantiated
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // For offline uses
})

const port = 3000

server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
}) // Your start the server and specify the port. After the server starts, it returns a url string inside a promise