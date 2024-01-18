import { makeSchema  } from "nexus";
import { join } from "path"
import * as types from "./graphql" // update makeSchema to use all the imports coming in from the src/graphql module

export const schema = makeSchema({
    types, // Passing types to the makeSchema function, and Nexus will do its thing to generate the SDL from this
    outputs: {
        schema: join(process.cwd(), "schema.graphql"), // The first output file that will be generated, a graphql schema file of type .graphql
        typegen: join(process.cwd(), "nexus-typegen.ts"), // The second output file is a Typescript file known as typegen
    },
    contextType: { // configure Nexus to know the type of your GraphQL context by adjusting the configuration of makeSchema
        module: join(process.cwd(), "./src/context.ts"), // Path to the file where the context interface (or type) is exported
        export: "Context", // Name of the exported interface in that module
    },
})

