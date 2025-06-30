# Zapier Integration for Applications

This integration allows applications submitted through your school template websites to automatically appear in the Cochise Portal.

## How It Works

1. **Student submits application** on your school website
2. **Zapier receives the data** via webhook
3. **Zapier sends email** to coach (existing functionality)
4. **Zapier also sends data** to Cochise Portal API (new functionality)
5. **Application appears** in coach dashboard automatically

## Setup Instructions

### Step 1: Update Your Zapier Workflow

1. Go to your existing Zapier workflow
2. Keep your current email step unchanged
3. Add a new "Webhooks by Zapier" action step
4. Configure it as follows:

**Action**: POST
**URL**: `https://your-cochise-portal-domain.com/api/applications/submit`
**Payload Type**: JSON
**Headers**: 
```
Content-Type: application/json
```

**Data** (copy this exactly):
```json
{
  "tsaLocation": "{{301000887__tsaLocation}}",
  "childFirstName": "{{301000887__childFirstName}}",
  "childLastName": "{{301000887__childLastName}}",
  "childDateOfBirth": "{{301000887__childDateOfBirth}}",
  "enrollmentDate": "{{301000887__enrollmentDate}}",
  "currentSchool": "{{301000887__currentSchool}}",
  "currentGrade": "{{301000887__currentGrade}}",
  "parent1FullName": "{{301000887__parent1FullName}}",
  "parent1Relationship": "{{301000887__parent1Relationship}}",
  "parent1Email": "{{301000887__parent1Email}}",
  "parent1Phone": "{{301000887__parent1Phone}}",
  "parent2FullName": "{{301000887__parent2FullName}}",
  "parent2Relationship": "{{301000887__parent2Relationship}}",
  "parent2Email": "{{301000887__parent2Email}}",
  "parent2Phone": "{{301000887__parent2Phone}}",
  "homeAddress": "{{301000887__homeAddress}}",
  "city": "{{301000887__city}}",
  "state": "{{301000887__state}}",
  "zipCode": "{{301000887__zipCode}}",
  "whyApplying": "{{301000887__whyApplying}}",
  "tellUsMore": "{{301000887__tellUsMore}}",
  "tellUsAboutYou": "{{301000887__tellUsAboutYou}}",
  "specialAccommodations": "{{301000887__specialAccommodations}}",
  "coachEmail": "{{301000887__coachEmail}}",
  "coachEmail2": "{{301000887__coachEmail2}}",
  "coachEmail3": "{{301000887__coachEmail3}}",
  "schoolName": "{{301000887__schoolName}}",
  "schoolLocation": "{{301000887__schoolLocation}}",
  "primaryPosition": "{{301000887__primaryPosition}}",
  "secondaryPosition": "{{301000887__secondaryPosition}}",
  "batsThrows": "{{301000887__batsThrows}}",
  "height": "{{301000887__height}}",
  "weight": "{{301000887__weight}}",
  "throwingVelocity": "{{301000887__throwingVelocity}}",
  "sixtyYardDash": "{{301000887__sixtyYardDash}}",
  "playerVideo": "{{301000887__playerVideo}}",
  "graduationYear": "{{301000887__graduationYear}}",
  "referredBy": "{{301000887__referredBy}}",
  "referredByPhone": "{{301000887__referredByPhone}}"
}
```

### Step 2: Test the Integration

1. Submit a test application through one of your school websites
2. Check your coach email (should still work as before)  
3. Check the Cochise Portal at `/coach/applications` - the application should appear there too

### Step 3: Verify in Cochise Portal

Once applications start coming in, coaches can:
- View all applications at `/coach/applications`
- See application stats on their main dashboard
- View detailed application information
- Approve/reject applications
- Track application status

## Benefits

✅ **Dual Delivery**: Coaches get both email notifications AND dashboard visibility
✅ **No Disruption**: Your existing email process continues to work
✅ **Better Management**: Coaches can track and manage applications systematically
✅ **Automatic Sync**: No manual data entry required
✅ **Status Tracking**: Track application progress through the enrollment process

## Troubleshooting

### If applications aren't appearing in the portal:

1. Check Zapier logs for any webhook errors
2. Verify the webhook URL is correct
3. Ensure the JSON payload matches exactly
4. Check browser console for any errors

### Common Issues:

- **Wrong URL**: Make sure you're using your actual domain
- **Missing Fields**: Ensure all required fields are mapped
- **Authentication**: The API endpoint is public, no auth required
- **Data Format**: Double-check that field names match exactly

## Support

If you need help with the setup, check:
1. Zapier webhook logs
2. Browser console errors
3. Network tab in developer tools

The integration maintains backward compatibility - your existing email notifications will continue working exactly as before. 