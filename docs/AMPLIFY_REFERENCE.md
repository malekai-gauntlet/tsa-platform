# AWS Amplify Reference Guide

## Overview

AWS Amplify is everything frontend developers need to develop and deploy cloud-powered fullstack applications without hassle. Easily connect your frontend to the cloud for data modeling, authentication, storage, serverless functions, SSR app deployment, and more.

## How Amplify Works

### Build fullstack apps with your framework of choice

You can use AWS Amplify with popular web and mobile frameworks like JavaScript, Flutter, Swift, and React. Build, connect, and host fullstack apps on AWS.

## Key Features

### Code-first DX

The fullstack TypeScript developer experience lets you focus on your app code instead of infrastructure.

### Fullstack Git deployments

Deploy your frontend and backend together on every code commit. Your Git branch is the source of truth.

### Faster local development

Per-developer cloud sandbox environments let you quickly iterate during development.

## Amplify Functions

### Overview

Amplify Functions are powered by AWS Lambda, and allow you to perform a wide variety of customization through self-contained _functions_. Functions can respond to events from other resources, execute some logic in-between events like an authentication flow, or act as standalone jobs.

### Common Use Cases

- **Authentication flow customizations** (e.g. attribute validations, allowlisting email domains)
- **Resolvers for GraphQL APIs**
- **Handlers for individual REST API routes**, or to host an entire API
- **Scheduled jobs**

### Setting Up a Function

1. **Create the function directory and resource file:**

   ```typescript
   // amplify/functions/say-hello/resource.ts
   import { defineFunction } from '@aws-amplify/backend';

   export const sayHello = defineFunction({
     // optionally specify a name for the Function (defaults to directory name)
     name: 'say-hello',
     // optionally specify a path to your handler (defaults to "./handler.ts")
     entry: './handler.ts',
   });
   ```

2. **Create the handler file:**

   ```typescript
   // amplify/functions/say-hello/handler.ts
   import type { Handler } from 'aws-lambda';

   export const handler: Handler = async event => {
     console.log('event', event);
     return {
       statusCode: 200,
       body: JSON.stringify('Hello from Lambda!'),
     };
   };
   ```

3. **Add to backend configuration:**

   ```typescript
   // amplify/backend.ts
   import { defineBackend } from '@aws-amplify/backend';
   import { sayHello } from './functions/say-hello/resource';

   defineBackend({
     sayHello,
   });
   ```

### Integration with GraphQL APIs

To invoke your Function through a strongly typed GraphQL query, add it as a handler in your data resource:

```typescript
// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sayHello } from '../functions/say-hello/resource';

const schema = a.schema({
  sayHello: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(sayHello)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
```

## GraphQL Schema Directives

### Supported Amplify Directives

| Name        | Model Level | Field Level | Description                                               |
| ----------- | ----------- | ----------- | --------------------------------------------------------- |
| @model      | ✅          | ❌          | Creates a datasource and resolver for a table             |
| @auth       | ✅          | ✅          | Allows access to data based on authorization methods      |
| @primaryKey | ❌          | ✅          | Sets a field to be the primary key                        |
| @index      | ❌          | ✅          | Defines an index on a table                               |
| @default    | ❌          | ✅          | Sets the default value for a column                       |
| @hasOne     | ❌          | ✅          | Defines a one-way 1:1 relationship from parent to child   |
| @hasMany    | ❌          | ✅          | Defines a one-way 1:M relationship between models         |
| @belongsTo  | ❌          | ✅          | Defines bi-directional relationship with the parent model |
| @refersTo   | ✅          | ✅          | Maps a model to a table, or a field to a column, by name  |
| @sql        | ❌          | ✅          | Accepts inline SQL statement or reference to .sql file    |

## Project Structure

### Backend Configuration

```
amplify/
├── auth/
│   └── resource.ts
├── backend.ts
├── data/
│   └── resource.ts
├── functions/
│   ├── coach-invite/
│   │   ├── handler.ts
│   │   └── resource.ts
│   └── parent-application/
│       ├── handler.ts
│       └── resource.ts
├── package.json
└── tsconfig.json
```

## Debugging and Troubleshooting

### Essential Debugging Artifacts

1. **Amplify CloudFormation artifacts**: The Amplify CLI provisions AWS resources using CloudFormation templates and user-provided input parameters.

2. **CLI walkthrough input parameters**: All inputs provided during CLI walkthrough are stored in JSON files in the `/amplify/backend` folder (e.g., `cli-inputs.json`, `amplify-meta.json`).

### Required Domains for Proxy Configuration

If you run Amplify CLI via proxy, add these domains to the allowlist:

- amazonaws.com
- amplifyapp.com
- aws-amplify.github.io

### GraphQL-Specific Debugging

1. **Schema VTL generation**: The `amplify api gql-compile` command transpiles the GraphQL schema and generates deployment artifacts.

2. **Client-side code generation**: Use `amplify codegen` to generate client-side code for web and mobile clients.

## Splitting GraphQL Files

AWS Amplify supports splitting your GraphQL schema into separate `.graphql` files:

1. Create `amplify/backend/api/<api-name>/schema/` directory
2. Split schema by domain (e.g., `Blog.graphql`, `Post.graphql`, `Comment.graphql`)
3. Run `amplify api gql-compile` to build the complete schema

### Using the `extend` Keyword

For larger projects, use the `extend` keyword to split queries, mutations, and subscriptions:

```graphql
# schema1.graphql
type Query {
  # initial custom queries
}

# schema2.graphql
extend type Query {
  # additional custom queries
}
```

## Best Practices

1. **Use TypeScript**: Take advantage of the fullstack TypeScript developer experience
2. **Leverage Git deployments**: Your Git branch should be the source of truth
3. **Use sandbox environments**: Per-developer cloud sandbox environments for faster iteration
4. **Organize schema files**: Split large GraphQL schemas into domain-specific files
5. **Type your functions**: Use strongly typed GraphQL queries to invoke Lambda functions
