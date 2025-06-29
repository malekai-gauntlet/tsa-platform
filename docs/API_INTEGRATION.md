# API Integration Examples

This document provides examples of how to integrate with the TSA Platform APIs.

## GraphQL API

### Authentication

All API calls require authentication using AWS Cognito tokens.

```typescript
import { GraphQLClient } from '@/lib/api/graphql-client';

// The client automatically handles authentication
const client = new GraphQLClient();
```

### User Operations

#### Get Current User

```typescript
const getCurrentUser = async () => {
  const query = `
    query GetCurrentUser {
      getCurrentUser {
        id
        email
        firstName
        lastName
        role
        createdAt
        updatedAt
      }
    }
  `;

  const result = await client.request(query);
  return result.getCurrentUser;
};
```

#### Update User Profile

```typescript
const updateUserProfile = async profileData => {
  const mutation = `
    mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
      updateUserProfile(input: $input) {
        id
        firstName
        lastName
        email
        phone
        address {
          street
          city
          state
          zipCode
        }
      }
    }
  `;

  const variables = {
    input: profileData,
  };

  const result = await client.request(mutation, variables);
  return result.updateUserProfile;
};
```

### Event Operations

#### List Events

```typescript
const listEvents = async (filters = {}) => {
  const query = `
    query ListEvents($filter: EventFilterInput, $limit: Int, $nextToken: String) {
      listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          title
          description
          startDate
          endDate
          location
          capacity
          registrationCount
          status
        }
        nextToken
      }
    }
  `;

  const variables = {
    filter: filters,
    limit: 20,
  };

  const result = await client.request(query, variables);
  return result.listEvents;
};
```

#### Create Event

```typescript
const createEvent = async eventData => {
  const mutation = `
    mutation CreateEvent($input: CreateEventInput!) {
      createEvent(input: $input) {
        id
        title
        description
        startDate
        endDate
        location
        capacity
        status
        createdAt
      }
    }
  `;

  const variables = {
    input: eventData,
  };

  const result = await client.request(mutation, variables);
  return result.createEvent;
};
```

### Application Operations

#### Submit Student Application

```typescript
const submitStudentApplication = async applicationData => {
  const mutation = `
    mutation SubmitStudentApplication($input: SubmitStudentApplicationInput!) {
      submitStudentApplication(input: $input) {
        id
        studentId
        coachId
        status
        submittedAt
        reviewedAt
        decision
        notes
      }
    }
  `;

  const variables = {
    input: applicationData,
  };

  const result = await client.request(mutation, variables);
  return result.submitStudentApplication;
};
```

#### Review Application

```typescript
const reviewApplication = async (applicationId, decision, notes) => {
  const mutation = `
    mutation ReviewApplication($input: ReviewApplicationInput!) {
      reviewApplication(input: $input) {
        id
        status
        decision
        notes
        reviewedAt
        reviewedBy
      }
    }
  `;

  const variables = {
    input: {
      applicationId,
      decision,
      notes,
    },
  };

  const result = await client.request(mutation, variables);
  return result.reviewApplication;
};
```

## REST API Endpoints

### Onboarding API

#### Get Onboarding Progress

```typescript
const getOnboardingProgress = async token => {
  const response = await fetch('/api/onboarding/progress', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch onboarding progress');
  }

  return response.json();
};
```

#### Update Onboarding Progress

```typescript
const updateOnboardingProgress = async (token, progressData) => {
  const response = await fetch('/api/onboarding/progress', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(progressData),
  });

  if (!response.ok) {
    throw new Error('Failed to update onboarding progress');
  }

  return response.json();
};
```

#### Complete Onboarding

```typescript
const completeOnboarding = async token => {
  const response = await fetch('/api/onboarding/complete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to complete onboarding');
  }

  return response.json();
};
```

### Validation API

#### Validate Invitation Token

```typescript
const validateInvitationToken = async token => {
  const response = await fetch('/api/onboarding/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Invalid invitation token');
  }

  return response.json();
};
```

## Error Handling

### GraphQL Errors

```typescript
const handleGraphQLError = error => {
  if (error.response?.errors) {
    // GraphQL errors
    error.response.errors.forEach(err => {
      console.error('GraphQL Error:', err.message);
    });
    throw new Error(error.response.errors[0].message);
  } else if (error.request) {
    // Network errors
    console.error('Network Error:', error.message);
    throw new Error('Network error occurred');
  } else {
    // Other errors
    console.error('Error:', error.message);
    throw error;
  }
};
```

### REST API Errors

```typescript
const handleRestError = async response => {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // JSON parsing failed, use default message
    }

    throw new Error(errorMessage);
  }
};
```

## Best Practices

### Request Optimization

- Use GraphQL fragments to avoid over-fetching
- Implement pagination for large datasets
- Cache responses when appropriate
- Use optimistic updates for better UX

### Error Handling

- Always handle network errors gracefully
- Provide meaningful error messages to users
- Log errors for debugging purposes
- Implement retry logic for transient failures

### Authentication

- Always include authentication tokens in requests
- Handle token expiration gracefully
- Use refresh tokens when available
- Implement logout functionality
