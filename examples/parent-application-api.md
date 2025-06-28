# Parent Application API

This endpoint allows third parties to submit parent applications to the TSA Platform.

## Authentication

The API supports multiple authentication methods:

- **API Key**: For third-party integrations (recommended)
- **Authenticated Users**: For logged-in parents
- **Guest Access**: For public application forms

## GraphQL Endpoint

```
POST https://your-amplify-app.amplifyapp.com/graphql
```

### Headers

```
Content-Type: application/json
Authorization: API-Key your-api-key-here
```

## Mutation

```graphql
mutation SubmitParentApplication($input: ParentApplicationInput!) {
  parentApplication(input: $input) {
    success
    message
    data {
      enrollmentId
      parentId
      studentName
      status
      applicationNumber
      timelineSteps {
        id
        title
        description
        status
        completedAt
      }
      nextSteps
    }
    error
  }
}
```

## Input Variables

```javascript
{
  "input": {
    // Required fields
    "parentEmail": "parent@example.com",
    "studentName": "John Doe",
    "sportInterest": "Basketball",

    // Optional parent information
    "parentFirstName": "Jane",
    "parentLastName": "Doe",
    "parentPhone": "+1-555-123-4567",

    // Optional student information
    "studentAge": 16,
    "studentGrade": "10th",
    "studentDateOfBirth": "2008-03-15",

    // Application details
    "enrollmentType": "FULL_TIME", // or "PART_TIME", "AFTER_SCHOOL"
    "startDate": "2025-09-01",
    "academicYear": "2025-2026",

    // Optional information
    "specialNotes": "Student has experience with club basketball",
    "medicalInformation": "No known allergies or medical conditions",
    "preferredCoachId": "coach-123",
    "coachName": "Coach Smith",

    // Contact information
    "emergencyContact": {
      "name": "John Doe Sr.",
      "relationship": "Father",
      "phone": "+1-555-987-6543",
      "email": "john.doe.sr@example.com"
    },

    // Address information
    "address": {
      "street": "123 Main St",
      "city": "Dallas",
      "state": "TX",
      "zipCode": "75201",
      "country": "US"
    },

    // School preferences
    "schoolPreferences": {
      "preferredCampus": "North Dallas",
      "transportationNeeded": true,
      "afterSchoolProgram": false
    }
  }
}
```

## Response Format

### Success Response

```json
{
  "data": {
    "parentApplication": {
      "success": true,
      "message": "Parent application submitted successfully",
      "data": {
        "enrollmentId": "enroll-abc123",
        "parentId": "parent-xyz789",
        "studentName": "John Doe",
        "status": "PENDING",
        "applicationNumber": "TSA-2025-ABC123",
        "timelineSteps": [
          {
            "id": 1,
            "title": "Application Submitted",
            "description": "Your application has been received",
            "status": "completed",
            "completedAt": "2025-01-15T10:30:00Z"
          },
          {
            "id": 2,
            "title": "Application Review",
            "description": "Our team is reviewing your application",
            "status": "active",
            "completedAt": null
          }
          // ... more timeline steps
        ],
        "nextSteps": [
          "You will receive a confirmation email within 24 hours",
          "Our team will review your application within 2-3 business days",
          "We will contact you to schedule an initial assessment"
        ]
      },
      "error": null
    }
  }
}
```

### Error Response

```json
{
  "data": {
    "parentApplication": {
      "success": false,
      "message": "Missing required fields: parentEmail, studentName, and sportInterest are required",
      "data": null,
      "error": "Missing required fields: parentEmail, studentName, and sportInterest are required"
    }
  }
}
```

## JavaScript Example

```javascript
const submitApplication = async applicationData => {
  const response = await fetch('https://your-app.amplifyapp.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'API-Key your-api-key-here',
    },
    body: JSON.stringify({
      query: `
        mutation SubmitParentApplication(
          $parentEmail: String!
          $studentName: String!
          $sportInterest: String!
          $parentFirstName: String
          $parentLastName: String
          $parentPhone: String
          $studentAge: Int
          $studentGrade: String
          $enrollmentType: AWSJSON
          $address: AWSJSON
        ) {
          parentApplication(
            parentEmail: $parentEmail
            studentName: $studentName
            sportInterest: $sportInterest
            parentFirstName: $parentFirstName
            parentLastName: $parentLastName
            parentPhone: $parentPhone
            studentAge: $studentAge
            studentGrade: $studentGrade
            enrollmentType: $enrollmentType
            address: $address
          ) {
            success
            message
            data
            error
          }
        }
      `,
      variables: applicationData,
    }),
  });

  return response.json();
};

// Usage
const result = await submitApplication({
  parentEmail: 'parent@example.com',
  studentName: 'John Doe',
  sportInterest: 'Basketball',
  parentFirstName: 'Jane',
  parentLastName: 'Doe',
  studentAge: 16,
  enrollmentType: 'FULL_TIME',
});

console.log(result);
```

## Python Example

```python
import requests
import json

def submit_parent_application(application_data):
    url = "https://your-app.amplifyapp.com/graphql"

    query = """
    mutation SubmitParentApplication(
      $parentEmail: String!
      $studentName: String!
      $sportInterest: String!
      $parentFirstName: String
      $parentLastName: String
      $parentPhone: String
      $studentAge: Int
      $studentGrade: String
      $enrollmentType: AWSJSON
    ) {
      parentApplication(
        parentEmail: $parentEmail
        studentName: $studentName
        sportInterest: $sportInterest
        parentFirstName: $parentFirstName
        parentLastName: $parentLastName
        parentPhone: $parentPhone
        studentAge: $studentAge
        studentGrade: $studentGrade
        enrollmentType: $enrollmentType
      ) {
        success
        message
        data
        error
      }
    }
    """

    payload = {
        "query": query,
        "variables": application_data
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": "API-Key your-api-key-here"
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    return response.json()

# Usage
result = submit_parent_application({
    "parentEmail": "parent@example.com",
    "studentName": "John Doe",
    "sportInterest": "Basketball",
    "parentFirstName": "Jane",
    "parentLastName": "Doe",
    "studentAge": 16,
    "enrollmentType": "FULL_TIME"
})

print(result)
```

## Rate Limits

- **API Key**: 1000 requests per day, 10 requests per minute per key
- **Authenticated Users**: 100 requests per hour
- **Guest Access**: 10 requests per hour per IP

## Error Codes

- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (invalid API key)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Testing

You can test the API using tools like:

- Postman
- curl
- GraphQL Playground
- Apollo Studio

## Support

For API support and to request an API key, contact: api-support@tsaplatform.com
