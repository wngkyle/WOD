// Hook the defined types up to the makeSchema function in src/schema.ts
// Could directly import Link from src/graphql/Link.ts, but since there will be more types to add,
// it will be better to create a proper module structure through this index.ts file
export * from "./Link"
export * from "./User"
export * from "./Auth"
