# Third-Party API Integration Guide

## Option 1: GraphQL API with API Key (Already Configured!)

Your coachInvite function is ready for third-party access using your existing API key system.

### API Endpoint

```
POST https://your-amplify-graphql-endpoint.amazonaws.com/graphql
```

### Headers

```
Content-Type: application/json
x-api-key: YOUR_API_KEY
```

### Request Body

```json
{
  "query": "mutation CoachInvite($name: String!, $email: String!, $cell: String!, $location: String!, $d1_athletics_count: Int!, $bio: String!) { coachInvite(name: $name, email: $email, cell: $cell, location: $location, d1_athletics_count: $d1_athletics_count, bio: $bio) }",
  "variables": {
    "name": "John Smith",
    "email": "john@example.com",
    "cell": "555-123-4567",
    "location": "Austin, TX",
    "d1_athletics_count": 5,
    "bio": "Experienced coach with 10 years developing youth athletes."
  }
}
```

### Response

```json
{
  "data": {
    "coachInvite": {
      "success": true,
      "message": "Application received for John Smith (john@example.com)",
      "invitationToken": "coach_1234567890_123456",
      "invitationData": {
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Smith",
        "phone": "+15551234567",
        "city": "Austin",
        "state": "TX",
        "bio": "Experienced coach...",
        "d1_athletics_count": 5
      }
    }
  }
}
```

### JavaScript Example

```javascript
async function submitCoachApplication(data) {
  const response = await fetch('https://your-endpoint.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY',
    },
    body: JSON.stringify({
      query: `mutation CoachInvite($name: String!, $email: String!, $cell: String!, $location: String!, $d1_athletics_count: Int!, $bio: String!) {
        coachInvite(name: $name, email: $email, cell: $cell, location: $location, d1_athletics_count: $d1_athletics_count, bio: $bio)
      }`,
      variables: data,
    }),
  });

  return response.json();
}
```

### cURL Example

```bash
curl -X POST https://your-endpoint.amazonaws.com/graphql \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "query": "mutation { coachInvite(name: \"John Smith\", email: \"john@example.com\", cell: \"555-123-4567\", location: \"Austin, TX\", d1_athletics_count: 5, bio: \"Experienced coach\") }",
    "variables": {}
  }'
```

## Option 2: REST API Wrapper (If GraphQL is not preferred)

If the third-party platform prefers REST endpoints, we can create a REST wrapper function.
