# Next.js Best Practices

## Core Concepts

- Utilize App Router for routing
- Implement metadata management
- Use caching strategies
- Implement error boundaries

## Components and Features

- Use Next.js built-in components:
  - Image component for optimized images
  - Link component for client-side navigation
  - Script component for external scripts
  - Head component for metadata
- Implement loading states
- Use data fetching methods

## Server Components

- Default to Server Components
- Use URL query parameters for data fetching and server state management
- Use 'use client' directive only when necessary:
  - Event listeners
  - Browser APIs
  - State management
  - Client-side-only libraries
