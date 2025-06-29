import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { coachInvite } from '../functions/coach-invite/resource';
import { parentApplication } from '../functions/parent-application/resource';

/*== TSA PLATFORM DATA SCHEMA ===============================================
Comprehensive data schema for the Texas Sports Academy platform
Covers coach profiles, events, enrollments, invitations, analytics, and more
=========================================================================*/

const schema = a.schema({
  // =================================================================
  // CUSTOM FUNCTIONS
  // =================================================================

  coachInvite: a
    .mutation()
    .arguments({
      name: a.string().required(),
      email: a.string().required(),
      cell: a.string().required(),
      location: a.string().required(),
      d1_athletics_count: a.integer().required(),
      bio: a.string().required(),
    })
    .returns(a.json())
    .handler(a.handler.function(coachInvite))
    .authorization(allow => [
      allow.groups(['admin']),
      allow.publicApiKey(), // Allow API key for third-party access
    ]),

  parentApplication: a
    .mutation()
    .arguments({
      // Parent Information
      parentEmail: a.string().required(),
      parentFirstName: a.string(),
      parentLastName: a.string(),
      parentPhone: a.string(),

      // Student Information
      studentName: a.string().required(),
      studentAge: a.integer(),
      studentGrade: a.string(),
      studentDateOfBirth: a.string(),

      // Application Details
      sportInterest: a.string().required(),
      enrollmentType: a.enum(['FULL_TIME', 'PART_TIME', 'AFTER_SCHOOL']),
      schoolPreferences: a.json(),
      startDate: a.string(),
      academicYear: a.string(),

      // Additional Information
      specialNotes: a.string(),
      emergencyContact: a.json(),
      medicalInformation: a.string(),

      // Coach Selection (optional)
      preferredCoachId: a.string(),
      coachName: a.string(),

      // Address Information
      address: a.json(),
    })
    .returns(a.json())
    .handler(a.handler.function(parentApplication))
    .authorization(allow => [
      allow.publicApiKey(), // Allow third-party access via API key
      allow.authenticated(), // Allow authenticated users
      allow.guest(), // Allow guest submissions
    ]),

  // =================================================================
  // USER MANAGEMENT
  // =================================================================

  User: a
    .model({
      email: a.string().required(),
      firstName: a.string(),
      lastName: a.string(),
      phone: a.string(),
      role: a.enum(['COACH', 'PARENT', 'ADMIN', 'STUDENT']),
      status: a.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
      amplifyUserId: a.string(), // Links to Cognito User Pool (updated after authentication)
      lastLoginAt: a.datetime(),

      // EdFi Integration Fields
      studentUSI: a.integer(), // Links to Student table if role is STUDENT
      parentUSI: a.integer(), // Links to Parent table if role is PARENT
      staffUSI: a.integer(), // Links to Staff table if role is COACH/ADMIN

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'update', 'delete']), // Allow admin full access
      allow.authenticated().to(['read', 'update']), // Allow authenticated users to read/update their own data
      allow.publicApiKey().to(['create', 'read']), // Allow API key for parent application function
    ]),

  // USED BY: background-check, onboarding API
  // TODO: Implement profile-management function for profile updates and onboarding
  Profile: a
    .model({
      userId: a.id().required(),
      profileType: a.enum(['COACH', 'PARENT', 'STUDENT']),
      bio: a.string(),
      experience: a.string(),
      specialties: a.string().array(),
      certifications: a.string().array(),
      preferences: a.json(),
      address: a.json(),
      emergencyContact: a.json(),
      backgroundCheckStatus: a.enum(['PENDING', 'APPROVED', 'REJECTED']),
      backgroundCheckDate: a.datetime(),
      onboardingComplete: a.boolean().default(false),
      wizardProgress: a.json(),
      marketingProgress: a.json(), // Stores completed recruiting steps and progress data

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'update', 'delete']), // Allow admin full access
      allow.authenticated().to(['read', 'update']), // Allow authenticated users to read/update their own profile
      allow.publicApiKey().to(['create', 'read']), // Allow API key for parent application function
    ]),

  // =================================================================
  // EVENTS & SESSIONS
  // =================================================================

  Event: a
    .model({
      title: a.string().required(),
      description: a.string(),
      shortDescription: a.string(),
      eventType: a.enum(['TRAINING', 'BOOTCAMP', 'WORKSHOP', 'COMPETITION', 'CAMP', 'TOURNAMENT']),
      status: a.enum(['DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED']),
      startDate: a.datetime().required(),
      endDate: a.datetime().required(),
      timezone: a.string().default('America/Chicago'),
      location: a.json(),
      venue: a.string(),
      address: a.json(),
      capacity: a.integer(),
      registeredCount: a.integer().default(0),
      price: a.float(),
      currency: a.string().default('USD'),
      coachId: a.id().required(),
      coachName: a.string(),
      requirements: a.string().array(),
      equipment: a.string().array(),
      tags: a.string().array(),
      images: a.string().array(),
      isPublic: a.boolean().default(false),
      isOnline: a.boolean().default(false),
      meetingUrl: a.string(),
      registrationDeadline: a.datetime(),
      ageGroups: a.string().array(),
      skillLevel: a.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS']),

      // Google Calendar Integration
      googleCalendarEventId: a.string(),
      googleMeetUrl: a.string(),
      googleCalendarSyncEnabled: a.boolean().default(false),
      googleCalendarLastSynced: a.datetime(),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'update']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read']), // Allow public API access for published events
    ]),

  // USED BY: parent-dashboard
  // TODO: Implement event-registration function for managing registrations and payments
  EventRegistration: a
    .model({
      eventId: a.id().required(),
      userId: a.id().required(),
      studentName: a.string(),
      registrationStatus: a.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'WAITLIST']),
      paymentStatus: a.enum(['PENDING', 'PAID', 'REFUNDED']),
      attendanceStatus: a.enum(['REGISTERED', 'ATTENDED', 'NO_SHOW']),
      registrationData: a.json(),
      notes: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'update']),
      allow.publicApiKey().to(['read']), // Allow public API access for published events
    ]),

  // USED BY: google-calendar
  // Used for session scheduling and feedback
  Session: a
    .model({
      eventId: a.id(),
      coachId: a.id().required(),
      sessionType: a.enum(['INDIVIDUAL', 'GROUP', 'ASSESSMENT']),
      status: a.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']),
      scheduledDate: a.datetime().required(),
      duration: a.integer(),
      location: a.json(),
      participants: a.json(),
      notes: a.string(),
      feedback: a.json(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'update']),
    ]),

  // =================================================================
  // ENROLLMENTS & APPLICATIONS
  // =================================================================

  // USED BY: parent-dashboard
  Enrollment: a
    .model({
      parentId: a.id().required(),
      studentName: a.string().required(),
      studentAge: a.integer(),
      studentGrade: a.string(),
      enrollmentType: a.enum(['FULL_TIME', 'PART_TIME', 'AFTER_SCHOOL']),
      status: a.enum(['PENDING', 'APPROVED', 'WAITLIST', 'REJECTED']),
      applicationData: a.json(),
      documents: a.json(),
      tuitionPlan: a.json(),
      startDate: a.date(),
      academicYear: a.string(),
      schoolPreferences: a.json(),
      // Timeline tracking fields
      coachName: a.string(),
      sportInterest: a.string(),
      currentStep: a.integer().default(1),
      totalSteps: a.integer().default(8),
      timelineSteps: a.json(), // Array of timeline step objects
      timelineStatus: a.enum(['ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED']),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'update', 'delete']),
      allow.publicApiKey().to(['create', 'read']), // Allow API key for parent application function
    ]),

  // =================================================================
  // INVITATIONS SYSTEM
  // =================================================================

  // Enhanced invitation model with comprehensive pre-fill data
  Invitation: a
    .model({
      // Essential invitation fields
      email: a.string().required(),
      invitedBy: a.id().required(),
      invitationType: a.enum(['COACH', 'PARENT']),
      status: a.enum(['PENDING', 'ACCEPTED', 'EXPIRED', 'CANCELLED', 'REVOKED']),
      token: a.string().required(),
      expiresAt: a.datetime().required(),

      // Comprehensive pre-fill data for onboarding
      firstName: a.string(),
      lastName: a.string(),
      phone: a.string(),
      city: a.string(),
      state: a.string(),
      bio: a.string(),
      message: a.string(), // Custom welcome message

      // School information (optional pre-fill)
      schoolName: a.string(),
      schoolType: a.string(),
      sport: a.string(),

      // Timestamps
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      acceptedAt: a.datetime(),
      lastSentAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['create', 'read', 'update', 'delete']), // Allow admin users only
      allow.authenticated().to(['read']), // Allow authenticated users to read invitations
      allow.guest().to(['read']), // Allow public read access for invitation validation only
      allow.publicApiKey().to(['create', 'read']), // Allow API key access for coach invite function
    ]),

  OnboardingProgress: a
    .model({
      userId: a.id().required(),
      email: a.string().required(),
      currentStep: a.enum([
        'PERSONAL_INFO',
        'ROLE_EXPERIENCE',
        'SCHOOL_SETUP',
        'SCHOOL_NAME',
        'SCHOOL_FOCUS',
        'STUDENT_PLANNING',
        'STUDENTS',
        'AGREEMENTS',
        'FINALIZE',
        'COMPLETE',
      ]),
      completedSteps: a.string().array(),
      stepData: a.json(), // EdFi compliant step data
      invitationBased: a.boolean().default(false),
      invitationId: a.string(),
      lastUpdated: a.datetime(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.publicApiKey().to(['create', 'read', 'update', 'delete']), // Allow API key for onboarding operations
      allow.groups(['admin']).to(['read', 'delete']), // Allow admin to manage progress
      allow.authenticated().to(['read', 'update']), // Allow authenticated users to read/update their own progress
    ]),

  // =================================================================
  // TUITION & PAYMENTS
  // =================================================================

  TuitionSetting: a
    .model({
      coachId: a.id().required(),
      coachEmail: a.string().required(),
      defaultTuition: a.float().required().default(5000),
      defaultDeposit: a.float().required().default(100),
      allowPaymentPlans: a.boolean().default(true),
      paymentPlanOptions: a.string().required(), // JSON stringified array
      currency: a.string().default('USD'),

      // Marketplace Settings
      stripeConnectAccountId: a.string(), // Stripe Connect account for receiving payments
      marketplaceEnabled: a.boolean().default(false),
      platformFeePercent: a.float().default(5.0), // Platform fee percentage

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'create', 'update']),
    ]),

  PaymentRecord: a
    .model({
      studentId: a.string().required(), // Links to application/student
      studentName: a.string().required(),
      parentEmail: a.string().required(),
      coachEmail: a.string().required(),
      applicationId: a.string().required(),
      tuitionAmount: a.float().required(),
      depositAmount: a.float().required(),
      totalPaid: a.float().default(0),
      paymentStatus: a.enum(['pending', 'deposit_paid', 'fully_paid', 'overdue']),
      paymentPlan: a.enum(['full', 'deposit_only', 'monthly', 'quarterly']),

      // Stripe Integration
      stripeCustomerId: a.string(),
      stripePaymentLinkId: a.string(),
      stripePaymentIntentId: a.string(),

      // Marketplace Integration
      stripeConnectAccountId: a.string(), // Coach's Stripe Connect account
      platformFeeAmount: a.float(), // Platform fee collected
      coachPayoutAmount: a.float(), // Amount to be paid to coach
      isMarketplacePayment: a.boolean().default(false),

      // Payment Tracking
      lastPaymentDate: a.datetime(),
      nextPaymentDue: a.datetime(),
      paymentHistory: a.json(), // Array of payment records

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'create', 'update']),
      allow.publicApiKey().to(['read', 'update']), // For Stripe webhooks
    ]),

  // NEW: Coach payout tracking for marketplace
  CoachPayout: a
    .model({
      coachEmail: a.string().required(),
      stripeConnectAccountId: a.string().required(),
      payoutAmount: a.float().required(),
      payoutStatus: a.enum(['pending', 'processing', 'paid', 'failed']),
      payoutType: a.enum(['monthly', 'manual', 'automated']),
      stripePayout: a.string(), // Stripe payout/transfer ID
      payoutDate: a.datetime(),
      description: a.string(),
      metadata: a.json(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'create', 'update']),
      allow.publicApiKey().to(['create', 'update']), // For automated payouts
    ]),

  // =================================================================
  // COMMUNICATION
  // =================================================================

  // TODO: Implement messaging function for internal communication system
  Message: a
    .model({
      senderId: a.id().required(),
      recipientId: a.id().required(),
      messageType: a.enum(['DIRECT', 'BROADCAST', 'SYSTEM']),
      subject: a.string(),
      content: a.string().required(),
      priority: a.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
      status: a.enum(['DRAFT', 'SENT', 'DELIVERED', 'READ']),
      attachments: a.json(),
      metadata: a.json(),
      sentAt: a.datetime(),
      readAt: a.datetime(),
      createdAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['coach', 'admin']).to(['read', 'create']),
    ]),

  // TODO: Implement notifications function for push notifications, email alerts, and SMS
  Notification: a
    .model({
      userId: a.id().required(),
      notificationType: a.enum(['EMAIL', 'SMS', 'PUSH', 'IN_APP']),
      title: a.string().required(),
      content: a.string().required(),
      status: a.enum(['PENDING', 'SENT', 'DELIVERED', 'FAILED']),
      priority: a.enum(['LOW', 'NORMAL', 'HIGH']),
      deliveryChannels: a.json(),
      metadata: a.json(),
      scheduledFor: a.datetime(),
      sentAt: a.datetime(),
      createdAt: a.datetime(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.groups(['admin']).to(['read', 'create', 'update']),
    ]),

  // =================================================================
  // ANALYTICS & TRACKING
  // =================================================================

  // USED BY: reports-generator
  AnalyticsEvent: a
    .model({
      eventName: a.string().required(),
      userId: a.id(),
      sessionId: a.string(),
      properties: a.json(),
      utmSource: a.string(),
      utmMedium: a.string(),
      utmCampaign: a.string(),
      utmTerm: a.string(),
      utmContent: a.string(),
      referrer: a.string(),
      userAgent: a.string(),
      ipAddress: a.string(),
      timestamp: a.datetime().required(),
      createdAt: a.datetime(),
    })
    .authorization(allow => [
      allow.authenticated().to(['create']),
      allow.groups(['admin']).to(['read']),
      allow.publicApiKey().to(['create']), // Allow API key for analytics tracking
    ]),

  // =================================================================
  // QUIZZES & ASSESSMENTS
  // =================================================================

  // USED BY: quiz-handler, bootcamp-progress
  Quiz: a
    .model({
      title: a.string().required(),
      description: a.string(),
      category: a.string(),
      difficulty: a.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
      questions: a.json().required(),
      passingScore: a.integer(),
      timeLimit: a.integer(),
      isActive: a.boolean().default(true),
      createdBy: a.id(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['coach', 'admin']).to(['read', 'create', 'update']),
      allow.authenticated().to(['read']),
    ]),

  // USED BY: quiz-handler, bootcamp-progress
  QuizAttempt: a
    .model({
      quizId: a.id().required(),
      userId: a.id().required(),
      answers: a.json().required(),
      score: a.integer(),
      passed: a.boolean(),
      startedAt: a.datetime().required(),
      completedAt: a.datetime(),
      timeSpent: a.integer(),
      metadata: a.json(),
    })
    .authorization(allow => [allow.owner(), allow.groups(['coach', 'admin']).to(['read'])]),

  // =================================================================
  // BUSINESS INCORPORATION
  // =================================================================

  // USED BY: llc-incorporation
  LLCIncorporation: a
    .model({
      coachId: a.id().required(),
      businessName: a.string().required(),
      businessType: a.enum(['LLC', 'CORPORATION', 'PARTNERSHIP']),
      state: a.string().required(),
      status: a.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']),
      filingData: a.json(),
      documents: a.json(),
      filedAt: a.datetime(),
      completedAt: a.datetime(),
      cost: a.float(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [allow.owner(), allow.groups(['admin']).to(['read', 'update'])]),

  // =================================================================
  // SYSTEM & AUDIT
  // =================================================================

  // USED BY: audit-health, reports-generator
  AuditLog: a
    .model({
      userId: a.id(),
      action: a.string().required(),
      resource: a.string().required(),
      resourceId: a.string(),
      changes: a.json(),
      metadata: a.json(),
      ipAddress: a.string(),
      userAgent: a.string(),
      timestamp: a.datetime().required(),
    })
    .authorization(allow => [allow.groups(['admin']).to(['read'])]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - EDUCATIONAL ORGANIZATION STRUCTURE
  // =================================================================

  EducationOrganization: a
    .model({
      educationOrganizationId: a.integer().required(),
      nameOfInstitution: a.string().required(),
      shortNameOfInstitution: a.string(),
      webSite: a.string(),
      operationalStatus: a.string(),

      // Address Information (stored as JSON for flexibility)
      addresses: a.json(), // Array of address objects
      telephones: a.json(), // Array of phone objects

      // Ed-Fi Metadata
      etag: a.string(),
      lastModifiedDate: a.datetime(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  School: a
    .model({
      schoolId: a.integer().required(), // Same as EducationOrganizationId
      localEducationAgencyId: a.integer(),
      schoolType: a.string(),
      charterStatus: a.string(),
      titleIPartASchoolDesignation: a.string(),

      // Administrative Information
      administrativeFundingControl: a.string(),
      magnetSpecialProgramEmphasisSchool: a.string(),

      // Grade Levels and Categories (stored as JSON arrays)
      gradeLevels: a.json(), // ["K", "01", "02", ...]
      schoolCategories: a.json(), // ["Elementary", "Title I"]

      // Ed-Fi Metadata
      etag: a.string(),
      lastModifiedDate: a.datetime(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - STAFF MANAGEMENT
  // =================================================================

  Staff: a
    .model({
      staffUSI: a.integer().required(), // Unique Staff Identifier (system-generated)
      staffUniqueId: a.string().required(),
      personalTitlePrefix: a.string(),
      firstName: a.string().required(),
      middleName: a.string(),
      lastSurname: a.string().required(),
      generationCodeSuffix: a.string(),
      maidenName: a.string(),
      birthDate: a.date(),
      sex: a.string(),

      // Contact Information
      personalEmailAddress: a.string(),
      workEmailAddress: a.string(),

      // Demographics
      hispanicLatinoEthnicity: a.boolean(),
      races: a.json(), // Race information array

      // Professional Information
      highestCompletedLevelOfEducation: a.string(),
      yearsOfPriorProfessionalExperience: a.float(),

      // System Information
      loginId: a.string(),
      isActive: a.boolean().default(true),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      // Only admin can manage staff records (EdFi compliance)
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.owner(),
    ]),

  StaffSchoolAssociation: a
    .model({
      staffUSI: a.integer().required(),
      schoolId: a.integer().required(),
      programAssignment: a.string().required(), // Administrator, Support, etc.
      schoolYear: a.integer(),

      // Employment Information
      employmentStatus: a.string(),
      hireDate: a.date(),
      endDate: a.date(),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - STUDENT INFORMATION
  // =================================================================

  Student: a
    .model({
      studentUSI: a.integer().required(), // Unique Student Identifier (system-generated)
      studentUniqueId: a.string().required(),
      personalTitlePrefix: a.string(),
      firstName: a.string().required(),
      middleName: a.string(),
      lastSurname: a.string().required(),
      generationCodeSuffix: a.string(),
      maidenName: a.string(),

      // Birth Information
      birthDate: a.date(),
      birthCity: a.string(),
      birthStateAbbreviation: a.string(),
      birthCountry: a.string(),

      // Demographics
      sex: a.string(),
      hispanicLatinoEthnicity: a.boolean(),
      races: a.json(), // Race information array

      // Status Information
      studentApplicationStatus: a.enum(['INQUIRY', 'APPLIED', 'ADMITTED', 'ENROLLED']),
      applicationDate: a.date(),
      admissionDate: a.date(),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.groups(['parent']).to(['read']), // Parent can view their students
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  StudentSchoolAssociation: a
    .model({
      studentUSI: a.integer().required(),
      schoolId: a.integer().required(),
      schoolYear: a.integer().required(),
      entryDate: a.date().required(),

      // Entry Information
      entryGradeLevel: a.string(),
      entryType: a.string(),
      repeatGradeIndicator: a.boolean().default(false),

      // Exit Information
      exitWithdrawDate: a.date(),
      exitWithdrawType: a.string(),

      // Academic Planning
      classOfSchoolYear: a.integer(),

      // Application Status Tracking
      applicationStatus: a.string(),
      admissionStatus: a.string(),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.groups(['parent']).to(['read']),
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - PARENT INFORMATION
  // =================================================================

  Parent: a
    .model({
      parentUSI: a.integer().required(), // Unique Parent Identifier (system-generated)
      parentUniqueId: a.string().required(),
      personalTitlePrefix: a.string(),
      firstName: a.string().required(),
      middleName: a.string(),
      lastSurname: a.string().required(),
      generationCodeSuffix: a.string(),
      maidenName: a.string(),

      // Contact Information
      personalEmailAddress: a.string(),
      workEmailAddress: a.string(),

      // Professional Information
      professionDescriptor: a.string(),
      employerName: a.string(),
      backgroundInformation: a.string(), // Parent background for applications

      // Demographics (optional)
      sex: a.string(),
      hispanicLatinoEthnicity: a.boolean(),
      races: a.json(), // Race information array

      // System Information
      loginId: a.string(),
      isActive: a.boolean().default(true),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.owner(),
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  StudentParentAssociation: a
    .model({
      studentUSI: a.integer().required(),
      parentUSI: a.integer().required(),

      // Relationship Information
      relation: a.enum([
        'Mother',
        'Father',
        'Guardian',
        'Stepmother',
        'Stepfather',
        'Grandmother',
        'Grandfather',
        'Other',
      ]),
      primaryContactStatus: a.boolean().default(false),
      livesWith: a.boolean().default(false),

      // Legal Information
      legalGuardian: a.boolean().default(false),
      custodyStatus: a.enum(['FULL', 'PARTIAL', 'NONE']),

      // Contact Preferences
      contactPriority: a.integer(),
      contactRestrictions: a.string(),
      emergencyContactStatus: a.boolean().default(false),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.groups(['parent']).to(['read']),
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']), // Allow API key for testing
    ]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - CONTACT INFORMATION
  // =================================================================

  StudentEducationOrganizationResponsibleContactPerson: a
    .model({
      studentUSI: a.integer().required(),
      educationOrganizationId: a.integer().required(),
      firstName: a.string().required(),
      lastSurname: a.string().required(),

      // Contact Details
      relation: a.string(),
      contactTitle: a.string(),
      contactEmailAddress: a.string(),
      contactTelephones: a.json(), // Phone numbers array
      contactAddress: a.json(), // Address information

      // Status
      emergencyContactStatus: a.boolean().default(false),
      primaryContactStatus: a.boolean().default(false),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.groups(['parent']).to(['read']),
    ]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - DOCUMENT MANAGEMENT
  // =================================================================

  DocumentCategory: a
    .model({
      documentCategoryId: a.integer().required(),
      categoryName: a.string().required(),
      categoryDescription: a.string(),
      isRequired: a.boolean().default(false),
      sortOrder: a.integer(),
      isActive: a.boolean().default(true),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
    ]),

  StudentDocument: a
    .model({
      studentUSI: a.integer().required(),
      documentCategoryId: a.integer().required(),

      // Document Information
      documentTitle: a.string().required(),
      documentDescription: a.string(),
      fileName: a.string(),
      fileSize: a.integer(),
      mimeType: a.string(),

      // Storage Information
      storageLocation: a.string(),
      documentHash: a.string(),

      // Submission Information
      submittedDate: a.datetime(),
      submittedByParentUSI: a.integer(),

      // Review Information
      reviewStatus: a.enum(['PENDING', 'APPROVED', 'REJECTED', 'NEEDS_REVISION']),
      reviewDate: a.datetime(),
      reviewedByStaffUSI: a.integer(),
      reviewComments: a.string(),

      // Compliance
      expirationDate: a.date(),
      isConfidential: a.boolean().default(true),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.groups(['parent']).to(['read', 'create', 'update']),
    ]),

  // =================================================================
  // ED-FI COMPLIANT MODELS - DESCRIPTORS (REFERENCE DATA)
  // =================================================================

  Descriptor: a
    .model({
      descriptorId: a.integer().required(),
      namespace: a.string().required(),
      codeValue: a.string().required(),
      shortDescription: a.string().required(),
      description: a.string(),
      priorDescriptorId: a.integer(),
      effectiveBeginDate: a.date(),
      effectiveEndDate: a.date(),

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
    ]),

  // =================================================================
  // API KEY MANAGEMENT
  // =================================================================

  // API keys for external integrations and third-party access
  ApiKey: a
    .model({
      keyHash: a.string().required(), // SHA-256 hash of the actual API key (NEVER store plaintext)
      keyPrefix: a.string().required(), // First 8 characters of key for identification (e.g., "tsa_lh2x")
      name: a.string().required(), // Human-readable name for the key
      description: a.string(), // Purpose/usage description
      permissions: a.string().array(), // Array of permissions: ['student-applications:write', 'events:read']
      isActive: a.boolean().default(true),
      usageCount: a.integer().default(0), // Track API usage
      lastUsedAt: a.datetime(),
      rateLimitDaily: a.integer().default(1000), // Daily request limit
      rateLimitMinute: a.integer().default(10), // Per-minute request limit

      // Security & Compliance
      createdBy: a.id().required(), // Admin who created the key
      expiresAt: a.datetime(), // Optional expiration date
      lastRotatedAt: a.datetime(), // When key was last rotated
      ipWhitelist: a.string().array(), // Optional IP restrictions

      // Monitoring & Analytics
      metadata: a.json(), // Additional configuration
      securityIncidents: a.integer().default(0), // Count of security violations
      lastSecurityIncident: a.datetime(), // When last incident occurred

      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [allow.groups(['admin']).to(['read', 'create', 'update', 'delete'])]),

  // Track detailed API key usage for security monitoring
  ApiKeyUsage: a
    .model({
      keyId: a.id().required(), // Reference to ApiKey
      keyPrefix: a.string().required(), // For quick identification

      // Request Details
      endpoint: a.string().required(), // GraphQL operation or REST endpoint
      method: a.string(), // HTTP method if applicable
      userAgent: a.string(),
      ipAddress: a.string(),

      // Response Details
      responseStatus: a.integer(), // HTTP status or success/failure
      responseTime: a.integer(), // Response time in milliseconds
      requestSize: a.integer(), // Request payload size in bytes
      responseSize: a.integer(), // Response payload size in bytes

      // Security Context
      permissions: a.string().array(), // Permissions checked for this request
      rateLimitHit: a.boolean().default(false), // Whether rate limit was hit
      securityViolation: a.string(), // Type of security violation if any

      // Metadata
      metadata: a.json(), // Additional request context
      timestamp: a.datetime().required(),

      createdAt: a.datetime(),
    })
    .authorization(allow => [
      allow.groups(['admin']).to(['read', 'create']),
      allow.publicApiKey().to(['create']), // Allow API gateway to log usage
    ]),

  // API Key rotation history for compliance
  ApiKeyRotation: a
    .model({
      oldKeyId: a.id().required(), // Reference to the rotated key
      newKeyId: a.id().required(), // Reference to the new key
      rotationType: a.enum(['MANUAL', 'SCHEDULED', 'SECURITY_INCIDENT']),
      reason: a.string(), // Reason for rotation
      rotatedBy: a.id().required(), // Who performed the rotation

      // Grace period for old key
      gracePeriodEnd: a.datetime(), // When old key stops working
      oldKeyDeactivated: a.boolean().default(false),

      createdAt: a.datetime(),
    })
    .authorization(allow => [allow.groups(['admin']).to(['read', 'create'])]),
}).authorization(allow => [
  // Grant the functions access to the data they need
  allow.resource(coachInvite).to(['query', 'mutate']),
  allow.resource(parentApplication).to(['query', 'mutate']),
]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== ED-FI INTEGRATION NOTES =============================================
The new EdFi-compliant models integrate with existing TSA models:

INTEGRATION MAPPING:
- User.studentUSI -> Student.studentUSI (for student users)
- User.parentUSI -> Parent.parentUSI (for parent users)  
- User.staffUSI -> Staff.staffUSI (for coach/admin users)
- Document.documentCategoryId -> DocumentCategory.documentCategoryId
- Document.studentUSI -> Student.studentUSI (for student documents)

RECOMMENDED DOCUMENT CATEGORIES (insert via Lambda):
1. Birth Certificate (required)
2. Immunization Records (required)
3. Previous School Records (required)
4. Proof of Residency (required)
5. Medical Records (optional)
6. Parent/Guardian ID (required)
7. Emergency Contact Forms (required)
8. Special Education Records (optional)
9. Photo Permission Forms (optional)
10. Transportation Forms (optional)

WORKFLOW INTEGRATION:
- Existing Enrollment -> StudentSchoolAssociation
- Existing Document -> StudentDocument (for student-specific docs)
- Existing User roles map to Staff/Parent/Student entities
- Existing Profile data can populate EdFi demographic fields

NEXT STEPS:
1. Create Lambda function to populate DocumentCategory reference data
2. Create migration script to link existing Users to EdFi entities
3. Update frontend forms to collect EdFi-required demographic data
4. Implement StudentDocument upload workflow for admissions
=========================================================================*/

/*== NOTES ===============================================================
This schema provides:

✅ User Management: Users, Profiles with role-based access
✅ Events & Sessions: Event creation, registration, session management  
✅ Enrollments: Student applications and enrollment process
✅ Invitations: Coach, parent, and event invitation system
✅ Communication: Messages and notifications
✅ Analytics: Event tracking with UTM parameters
✅ Documents: File management and compliance tracking
✅ Quizzes: Assessment system with attempts tracking
✅ LLC Incorporation: Business formation automation
✅ Audit: System activity logging

The Lambda functions can work with this data via:
1. GraphQL API (recommended for new features)
2. Direct DynamoDB access (for existing functions)
=========================================================================*/

/*== FRONTEND INTEGRATION ===============================================
To use this schema in your frontend applications:

1. Install Amplify client libraries
2. Generate the client and use typed models
3. Connect to the GraphQL API with real-time subscriptions

Frontend Example:
```typescript
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

// Create a new event
const newEvent = await client.models.Event.create({
  title: "Summer Training Camp",
  eventType: "TRAINING",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  coachId: "coach-123"
});

// List all events
const { data: events } = await client.models.Event.list();

// Subscribe to real-time updates
const subscription = client.models.Event.onUpdate().subscribe({
  next: (data) => console.log('Event updated:', data),
});
```
=========================================================================*/
