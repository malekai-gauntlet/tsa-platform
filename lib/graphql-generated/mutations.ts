/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from './API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const coachInvite = /* GraphQL */ `mutation CoachInvite(
  $bio: String!
  $cell: String!
  $d1_athletics_count: Int!
  $email: String!
  $location: String!
  $name: String!
) {
  coachInvite(
    bio: $bio
    cell: $cell
    d1_athletics_count: $d1_athletics_count
    email: $email
    location: $location
    name: $name
  )
}
` as GeneratedMutation<APITypes.CoachInviteMutationVariables, APITypes.CoachInviteMutation>;
export const createAnalyticsEvent = /* GraphQL */ `mutation CreateAnalyticsEvent(
  $condition: ModelAnalyticsEventConditionInput
  $input: CreateAnalyticsEventInput!
) {
  createAnalyticsEvent(condition: $condition, input: $input) {
    createdAt
    eventName
    id
    ipAddress
    properties
    referrer
    sessionId
    timestamp
    updatedAt
    userAgent
    userId
    utmCampaign
    utmContent
    utmMedium
    utmSource
    utmTerm
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAnalyticsEventMutationVariables,
  APITypes.CreateAnalyticsEventMutation
>;
export const createApiKey = /* GraphQL */ `mutation CreateApiKey(
  $condition: ModelApiKeyConditionInput
  $input: CreateApiKeyInput!
) {
  createApiKey(condition: $condition, input: $input) {
    createdAt
    createdBy
    description
    expiresAt
    id
    ipWhitelist
    isActive
    keyHash
    keyPrefix
    lastRotatedAt
    lastSecurityIncident
    lastUsedAt
    metadata
    name
    permissions
    rateLimitDaily
    rateLimitMinute
    securityIncidents
    updatedAt
    usageCount
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateApiKeyMutationVariables, APITypes.CreateApiKeyMutation>;
export const createApiKeyRotation = /* GraphQL */ `mutation CreateApiKeyRotation(
  $condition: ModelApiKeyRotationConditionInput
  $input: CreateApiKeyRotationInput!
) {
  createApiKeyRotation(condition: $condition, input: $input) {
    createdAt
    gracePeriodEnd
    id
    newKeyId
    oldKeyDeactivated
    oldKeyId
    reason
    rotatedBy
    rotationType
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateApiKeyRotationMutationVariables,
  APITypes.CreateApiKeyRotationMutation
>;
export const createApiKeyUsage = /* GraphQL */ `mutation CreateApiKeyUsage(
  $condition: ModelApiKeyUsageConditionInput
  $input: CreateApiKeyUsageInput!
) {
  createApiKeyUsage(condition: $condition, input: $input) {
    createdAt
    endpoint
    id
    ipAddress
    keyId
    keyPrefix
    metadata
    method
    permissions
    rateLimitHit
    requestSize
    responseSize
    responseStatus
    responseTime
    securityViolation
    timestamp
    updatedAt
    userAgent
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateApiKeyUsageMutationVariables,
  APITypes.CreateApiKeyUsageMutation
>;
export const createAuditLog = /* GraphQL */ `mutation CreateAuditLog(
  $condition: ModelAuditLogConditionInput
  $input: CreateAuditLogInput!
) {
  createAuditLog(condition: $condition, input: $input) {
    action
    changes
    createdAt
    id
    ipAddress
    metadata
    resource
    resourceId
    timestamp
    updatedAt
    userAgent
    userId
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateAuditLogMutationVariables, APITypes.CreateAuditLogMutation>;
export const createCoachPayout = /* GraphQL */ `mutation CreateCoachPayout(
  $condition: ModelCoachPayoutConditionInput
  $input: CreateCoachPayoutInput!
) {
  createCoachPayout(condition: $condition, input: $input) {
    coachEmail
    createdAt
    description
    id
    metadata
    owner
    payoutAmount
    payoutDate
    payoutStatus
    payoutType
    stripeConnectAccountId
    stripePayout
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCoachPayoutMutationVariables,
  APITypes.CreateCoachPayoutMutation
>;
export const createDescriptor = /* GraphQL */ `mutation CreateDescriptor(
  $condition: ModelDescriptorConditionInput
  $input: CreateDescriptorInput!
) {
  createDescriptor(condition: $condition, input: $input) {
    codeValue
    createdAt
    description
    descriptorId
    effectiveBeginDate
    effectiveEndDate
    id
    namespace
    priorDescriptorId
    shortDescription
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDescriptorMutationVariables,
  APITypes.CreateDescriptorMutation
>;
export const createDocumentCategory = /* GraphQL */ `mutation CreateDocumentCategory(
  $condition: ModelDocumentCategoryConditionInput
  $input: CreateDocumentCategoryInput!
) {
  createDocumentCategory(condition: $condition, input: $input) {
    categoryDescription
    categoryName
    createdAt
    documentCategoryId
    id
    isActive
    isRequired
    sortOrder
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDocumentCategoryMutationVariables,
  APITypes.CreateDocumentCategoryMutation
>;
export const createEducationOrganization = /* GraphQL */ `mutation CreateEducationOrganization(
  $condition: ModelEducationOrganizationConditionInput
  $input: CreateEducationOrganizationInput!
) {
  createEducationOrganization(condition: $condition, input: $input) {
    addresses
    createdAt
    educationOrganizationId
    etag
    id
    lastModifiedDate
    nameOfInstitution
    operationalStatus
    shortNameOfInstitution
    telephones
    updatedAt
    webSite
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEducationOrganizationMutationVariables,
  APITypes.CreateEducationOrganizationMutation
>;
export const createEnrollment = /* GraphQL */ `mutation CreateEnrollment(
  $condition: ModelEnrollmentConditionInput
  $input: CreateEnrollmentInput!
) {
  createEnrollment(condition: $condition, input: $input) {
    academicYear
    applicationData
    coachName
    createdAt
    currentStep
    documents
    enrollmentType
    id
    parentId
    schoolPreferences
    sportInterest
    startDate
    status
    studentAge
    studentGrade
    studentName
    timelineStatus
    timelineSteps
    totalSteps
    tuitionPlan
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEnrollmentMutationVariables,
  APITypes.CreateEnrollmentMutation
>;
export const createEvent = /* GraphQL */ `mutation CreateEvent(
  $condition: ModelEventConditionInput
  $input: CreateEventInput!
) {
  createEvent(condition: $condition, input: $input) {
    address
    ageGroups
    capacity
    coachId
    coachName
    createdAt
    currency
    description
    endDate
    equipment
    eventType
    googleCalendarEventId
    googleCalendarLastSynced
    googleCalendarSyncEnabled
    googleMeetUrl
    id
    images
    isOnline
    isPublic
    location
    meetingUrl
    owner
    price
    registeredCount
    registrationDeadline
    requirements
    shortDescription
    skillLevel
    startDate
    status
    tags
    timezone
    title
    updatedAt
    venue
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateEventMutationVariables, APITypes.CreateEventMutation>;
export const createEventRegistration = /* GraphQL */ `mutation CreateEventRegistration(
  $condition: ModelEventRegistrationConditionInput
  $input: CreateEventRegistrationInput!
) {
  createEventRegistration(condition: $condition, input: $input) {
    attendanceStatus
    createdAt
    eventId
    id
    notes
    owner
    paymentStatus
    registrationData
    registrationStatus
    studentName
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEventRegistrationMutationVariables,
  APITypes.CreateEventRegistrationMutation
>;
export const createInvitation = /* GraphQL */ `mutation CreateInvitation(
  $condition: ModelInvitationConditionInput
  $input: CreateInvitationInput!
) {
  createInvitation(condition: $condition, input: $input) {
    acceptedAt
    bio
    city
    createdAt
    email
    expiresAt
    firstName
    id
    invitationType
    invitedBy
    lastName
    lastSentAt
    message
    phone
    schoolName
    schoolType
    sport
    state
    status
    token
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInvitationMutationVariables,
  APITypes.CreateInvitationMutation
>;
export const createLLCIncorporation = /* GraphQL */ `mutation CreateLLCIncorporation(
  $condition: ModelLLCIncorporationConditionInput
  $input: CreateLLCIncorporationInput!
) {
  createLLCIncorporation(condition: $condition, input: $input) {
    businessName
    businessType
    coachId
    completedAt
    cost
    createdAt
    documents
    filedAt
    filingData
    id
    owner
    state
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLLCIncorporationMutationVariables,
  APITypes.CreateLLCIncorporationMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $condition: ModelMessageConditionInput
  $input: CreateMessageInput!
) {
  createMessage(condition: $condition, input: $input) {
    attachments
    content
    createdAt
    id
    messageType
    metadata
    owner
    priority
    readAt
    recipientId
    senderId
    sentAt
    status
    subject
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateMessageMutationVariables, APITypes.CreateMessageMutation>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $condition: ModelNotificationConditionInput
  $input: CreateNotificationInput!
) {
  createNotification(condition: $condition, input: $input) {
    content
    createdAt
    deliveryChannels
    id
    metadata
    notificationType
    owner
    priority
    scheduledFor
    sentAt
    status
    title
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const createOnboardingProgress = /* GraphQL */ `mutation CreateOnboardingProgress(
  $condition: ModelOnboardingProgressConditionInput
  $input: CreateOnboardingProgressInput!
) {
  createOnboardingProgress(condition: $condition, input: $input) {
    completedSteps
    createdAt
    currentStep
    email
    id
    invitationBased
    invitationId
    lastUpdated
    stepData
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOnboardingProgressMutationVariables,
  APITypes.CreateOnboardingProgressMutation
>;
export const createParent = /* GraphQL */ `mutation CreateParent(
  $condition: ModelParentConditionInput
  $input: CreateParentInput!
) {
  createParent(condition: $condition, input: $input) {
    backgroundInformation
    createdAt
    employerName
    firstName
    generationCodeSuffix
    hispanicLatinoEthnicity
    id
    isActive
    lastSurname
    loginId
    maidenName
    middleName
    owner
    parentUSI
    parentUniqueId
    personalEmailAddress
    personalTitlePrefix
    professionDescriptor
    races
    sex
    updatedAt
    workEmailAddress
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateParentMutationVariables, APITypes.CreateParentMutation>;
export const createPaymentRecord = /* GraphQL */ `mutation CreatePaymentRecord(
  $condition: ModelPaymentRecordConditionInput
  $input: CreatePaymentRecordInput!
) {
  createPaymentRecord(condition: $condition, input: $input) {
    applicationId
    coachEmail
    coachPayoutAmount
    createdAt
    depositAmount
    id
    isMarketplacePayment
    lastPaymentDate
    nextPaymentDue
    owner
    parentEmail
    paymentHistory
    paymentPlan
    paymentStatus
    platformFeeAmount
    stripeConnectAccountId
    stripeCustomerId
    stripePaymentIntentId
    stripePaymentLinkId
    studentId
    studentName
    totalPaid
    tuitionAmount
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePaymentRecordMutationVariables,
  APITypes.CreatePaymentRecordMutation
>;
export const createProfile = /* GraphQL */ `mutation CreateProfile(
  $condition: ModelProfileConditionInput
  $input: CreateProfileInput!
) {
  createProfile(condition: $condition, input: $input) {
    address
    backgroundCheckDate
    backgroundCheckStatus
    bio
    certifications
    createdAt
    emergencyContact
    experience
    id
    marketingProgress
    onboardingComplete
    preferences
    profileType
    specialties
    updatedAt
    userId
    wizardProgress
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateProfileMutationVariables, APITypes.CreateProfileMutation>;
export const createQuiz = /* GraphQL */ `mutation CreateQuiz(
  $condition: ModelQuizConditionInput
  $input: CreateQuizInput!
) {
  createQuiz(condition: $condition, input: $input) {
    category
    createdAt
    createdBy
    description
    difficulty
    id
    isActive
    passingScore
    questions
    timeLimit
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateQuizMutationVariables, APITypes.CreateQuizMutation>;
export const createQuizAttempt = /* GraphQL */ `mutation CreateQuizAttempt(
  $condition: ModelQuizAttemptConditionInput
  $input: CreateQuizAttemptInput!
) {
  createQuizAttempt(condition: $condition, input: $input) {
    answers
    completedAt
    createdAt
    id
    metadata
    owner
    passed
    quizId
    score
    startedAt
    timeSpent
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateQuizAttemptMutationVariables,
  APITypes.CreateQuizAttemptMutation
>;
export const createSchool = /* GraphQL */ `mutation CreateSchool(
  $condition: ModelSchoolConditionInput
  $input: CreateSchoolInput!
) {
  createSchool(condition: $condition, input: $input) {
    administrativeFundingControl
    charterStatus
    createdAt
    etag
    gradeLevels
    id
    lastModifiedDate
    localEducationAgencyId
    magnetSpecialProgramEmphasisSchool
    schoolCategories
    schoolId
    schoolType
    titleIPartASchoolDesignation
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateSchoolMutationVariables, APITypes.CreateSchoolMutation>;
export const createSession = /* GraphQL */ `mutation CreateSession(
  $condition: ModelSessionConditionInput
  $input: CreateSessionInput!
) {
  createSession(condition: $condition, input: $input) {
    coachId
    createdAt
    duration
    eventId
    feedback
    id
    location
    notes
    owner
    participants
    scheduledDate
    sessionType
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateSessionMutationVariables, APITypes.CreateSessionMutation>;
export const createStaff = /* GraphQL */ `mutation CreateStaff(
  $condition: ModelStaffConditionInput
  $input: CreateStaffInput!
) {
  createStaff(condition: $condition, input: $input) {
    birthDate
    createdAt
    firstName
    generationCodeSuffix
    highestCompletedLevelOfEducation
    hispanicLatinoEthnicity
    id
    isActive
    lastSurname
    loginId
    maidenName
    middleName
    owner
    personalEmailAddress
    personalTitlePrefix
    races
    sex
    staffUSI
    staffUniqueId
    updatedAt
    workEmailAddress
    yearsOfPriorProfessionalExperience
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateStaffMutationVariables, APITypes.CreateStaffMutation>;
export const createStaffSchoolAssociation = /* GraphQL */ `mutation CreateStaffSchoolAssociation(
  $condition: ModelStaffSchoolAssociationConditionInput
  $input: CreateStaffSchoolAssociationInput!
) {
  createStaffSchoolAssociation(condition: $condition, input: $input) {
    createdAt
    employmentStatus
    endDate
    hireDate
    id
    programAssignment
    schoolId
    schoolYear
    staffUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStaffSchoolAssociationMutationVariables,
  APITypes.CreateStaffSchoolAssociationMutation
>;
export const createStudent = /* GraphQL */ `mutation CreateStudent(
  $condition: ModelStudentConditionInput
  $input: CreateStudentInput!
) {
  createStudent(condition: $condition, input: $input) {
    admissionDate
    applicationDate
    birthCity
    birthCountry
    birthDate
    birthStateAbbreviation
    createdAt
    firstName
    generationCodeSuffix
    hispanicLatinoEthnicity
    id
    lastSurname
    maidenName
    middleName
    personalTitlePrefix
    races
    sex
    studentApplicationStatus
    studentUSI
    studentUniqueId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateStudentMutationVariables, APITypes.CreateStudentMutation>;
export const createStudentDocument = /* GraphQL */ `mutation CreateStudentDocument(
  $condition: ModelStudentDocumentConditionInput
  $input: CreateStudentDocumentInput!
) {
  createStudentDocument(condition: $condition, input: $input) {
    createdAt
    documentCategoryId
    documentDescription
    documentHash
    documentTitle
    expirationDate
    fileName
    fileSize
    id
    isConfidential
    mimeType
    reviewComments
    reviewDate
    reviewStatus
    reviewedByStaffUSI
    storageLocation
    studentUSI
    submittedByParentUSI
    submittedDate
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStudentDocumentMutationVariables,
  APITypes.CreateStudentDocumentMutation
>;
export const createStudentEducationOrganizationResponsibleContactPerson =
  /* GraphQL */ `mutation CreateStudentEducationOrganizationResponsibleContactPerson(
  $condition: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput
  $input: CreateStudentEducationOrganizationResponsibleContactPersonInput!
) {
  createStudentEducationOrganizationResponsibleContactPerson(
    condition: $condition
    input: $input
  ) {
    contactAddress
    contactEmailAddress
    contactTelephones
    contactTitle
    createdAt
    educationOrganizationId
    emergencyContactStatus
    firstName
    id
    lastSurname
    primaryContactStatus
    relation
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateStudentEducationOrganizationResponsibleContactPersonMutationVariables,
    APITypes.CreateStudentEducationOrganizationResponsibleContactPersonMutation
  >;
export const createStudentParentAssociation =
  /* GraphQL */ `mutation CreateStudentParentAssociation(
  $condition: ModelStudentParentAssociationConditionInput
  $input: CreateStudentParentAssociationInput!
) {
  createStudentParentAssociation(condition: $condition, input: $input) {
    contactPriority
    contactRestrictions
    createdAt
    custodyStatus
    emergencyContactStatus
    id
    legalGuardian
    livesWith
    parentUSI
    primaryContactStatus
    relation
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateStudentParentAssociationMutationVariables,
    APITypes.CreateStudentParentAssociationMutation
  >;
export const createStudentSchoolAssociation =
  /* GraphQL */ `mutation CreateStudentSchoolAssociation(
  $condition: ModelStudentSchoolAssociationConditionInput
  $input: CreateStudentSchoolAssociationInput!
) {
  createStudentSchoolAssociation(condition: $condition, input: $input) {
    admissionStatus
    applicationStatus
    classOfSchoolYear
    createdAt
    entryDate
    entryGradeLevel
    entryType
    exitWithdrawDate
    exitWithdrawType
    id
    repeatGradeIndicator
    schoolId
    schoolYear
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateStudentSchoolAssociationMutationVariables,
    APITypes.CreateStudentSchoolAssociationMutation
  >;
export const createTuitionSetting = /* GraphQL */ `mutation CreateTuitionSetting(
  $condition: ModelTuitionSettingConditionInput
  $input: CreateTuitionSettingInput!
) {
  createTuitionSetting(condition: $condition, input: $input) {
    allowPaymentPlans
    coachEmail
    coachId
    createdAt
    currency
    defaultDeposit
    defaultTuition
    id
    marketplaceEnabled
    owner
    paymentPlanOptions
    platformFeePercent
    stripeConnectAccountId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTuitionSettingMutationVariables,
  APITypes.CreateTuitionSettingMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
    amplifyUserId
    createdAt
    email
    firstName
    id
    lastLoginAt
    lastName
    parentUSI
    phone
    role
    staffUSI
    status
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateUserMutationVariables, APITypes.CreateUserMutation>;
export const deleteAnalyticsEvent = /* GraphQL */ `mutation DeleteAnalyticsEvent(
  $condition: ModelAnalyticsEventConditionInput
  $input: DeleteAnalyticsEventInput!
) {
  deleteAnalyticsEvent(condition: $condition, input: $input) {
    createdAt
    eventName
    id
    ipAddress
    properties
    referrer
    sessionId
    timestamp
    updatedAt
    userAgent
    userId
    utmCampaign
    utmContent
    utmMedium
    utmSource
    utmTerm
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAnalyticsEventMutationVariables,
  APITypes.DeleteAnalyticsEventMutation
>;
export const deleteApiKey = /* GraphQL */ `mutation DeleteApiKey(
  $condition: ModelApiKeyConditionInput
  $input: DeleteApiKeyInput!
) {
  deleteApiKey(condition: $condition, input: $input) {
    createdAt
    createdBy
    description
    expiresAt
    id
    ipWhitelist
    isActive
    keyHash
    keyPrefix
    lastRotatedAt
    lastSecurityIncident
    lastUsedAt
    metadata
    name
    permissions
    rateLimitDaily
    rateLimitMinute
    securityIncidents
    updatedAt
    usageCount
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteApiKeyMutationVariables, APITypes.DeleteApiKeyMutation>;
export const deleteApiKeyRotation = /* GraphQL */ `mutation DeleteApiKeyRotation(
  $condition: ModelApiKeyRotationConditionInput
  $input: DeleteApiKeyRotationInput!
) {
  deleteApiKeyRotation(condition: $condition, input: $input) {
    createdAt
    gracePeriodEnd
    id
    newKeyId
    oldKeyDeactivated
    oldKeyId
    reason
    rotatedBy
    rotationType
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteApiKeyRotationMutationVariables,
  APITypes.DeleteApiKeyRotationMutation
>;
export const deleteApiKeyUsage = /* GraphQL */ `mutation DeleteApiKeyUsage(
  $condition: ModelApiKeyUsageConditionInput
  $input: DeleteApiKeyUsageInput!
) {
  deleteApiKeyUsage(condition: $condition, input: $input) {
    createdAt
    endpoint
    id
    ipAddress
    keyId
    keyPrefix
    metadata
    method
    permissions
    rateLimitHit
    requestSize
    responseSize
    responseStatus
    responseTime
    securityViolation
    timestamp
    updatedAt
    userAgent
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteApiKeyUsageMutationVariables,
  APITypes.DeleteApiKeyUsageMutation
>;
export const deleteAuditLog = /* GraphQL */ `mutation DeleteAuditLog(
  $condition: ModelAuditLogConditionInput
  $input: DeleteAuditLogInput!
) {
  deleteAuditLog(condition: $condition, input: $input) {
    action
    changes
    createdAt
    id
    ipAddress
    metadata
    resource
    resourceId
    timestamp
    updatedAt
    userAgent
    userId
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteAuditLogMutationVariables, APITypes.DeleteAuditLogMutation>;
export const deleteCoachPayout = /* GraphQL */ `mutation DeleteCoachPayout(
  $condition: ModelCoachPayoutConditionInput
  $input: DeleteCoachPayoutInput!
) {
  deleteCoachPayout(condition: $condition, input: $input) {
    coachEmail
    createdAt
    description
    id
    metadata
    owner
    payoutAmount
    payoutDate
    payoutStatus
    payoutType
    stripeConnectAccountId
    stripePayout
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCoachPayoutMutationVariables,
  APITypes.DeleteCoachPayoutMutation
>;
export const deleteDescriptor = /* GraphQL */ `mutation DeleteDescriptor(
  $condition: ModelDescriptorConditionInput
  $input: DeleteDescriptorInput!
) {
  deleteDescriptor(condition: $condition, input: $input) {
    codeValue
    createdAt
    description
    descriptorId
    effectiveBeginDate
    effectiveEndDate
    id
    namespace
    priorDescriptorId
    shortDescription
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDescriptorMutationVariables,
  APITypes.DeleteDescriptorMutation
>;
export const deleteDocumentCategory = /* GraphQL */ `mutation DeleteDocumentCategory(
  $condition: ModelDocumentCategoryConditionInput
  $input: DeleteDocumentCategoryInput!
) {
  deleteDocumentCategory(condition: $condition, input: $input) {
    categoryDescription
    categoryName
    createdAt
    documentCategoryId
    id
    isActive
    isRequired
    sortOrder
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDocumentCategoryMutationVariables,
  APITypes.DeleteDocumentCategoryMutation
>;
export const deleteEducationOrganization = /* GraphQL */ `mutation DeleteEducationOrganization(
  $condition: ModelEducationOrganizationConditionInput
  $input: DeleteEducationOrganizationInput!
) {
  deleteEducationOrganization(condition: $condition, input: $input) {
    addresses
    createdAt
    educationOrganizationId
    etag
    id
    lastModifiedDate
    nameOfInstitution
    operationalStatus
    shortNameOfInstitution
    telephones
    updatedAt
    webSite
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEducationOrganizationMutationVariables,
  APITypes.DeleteEducationOrganizationMutation
>;
export const deleteEnrollment = /* GraphQL */ `mutation DeleteEnrollment(
  $condition: ModelEnrollmentConditionInput
  $input: DeleteEnrollmentInput!
) {
  deleteEnrollment(condition: $condition, input: $input) {
    academicYear
    applicationData
    coachName
    createdAt
    currentStep
    documents
    enrollmentType
    id
    parentId
    schoolPreferences
    sportInterest
    startDate
    status
    studentAge
    studentGrade
    studentName
    timelineStatus
    timelineSteps
    totalSteps
    tuitionPlan
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEnrollmentMutationVariables,
  APITypes.DeleteEnrollmentMutation
>;
export const deleteEvent = /* GraphQL */ `mutation DeleteEvent(
  $condition: ModelEventConditionInput
  $input: DeleteEventInput!
) {
  deleteEvent(condition: $condition, input: $input) {
    address
    ageGroups
    capacity
    coachId
    coachName
    createdAt
    currency
    description
    endDate
    equipment
    eventType
    googleCalendarEventId
    googleCalendarLastSynced
    googleCalendarSyncEnabled
    googleMeetUrl
    id
    images
    isOnline
    isPublic
    location
    meetingUrl
    owner
    price
    registeredCount
    registrationDeadline
    requirements
    shortDescription
    skillLevel
    startDate
    status
    tags
    timezone
    title
    updatedAt
    venue
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteEventMutationVariables, APITypes.DeleteEventMutation>;
export const deleteEventRegistration = /* GraphQL */ `mutation DeleteEventRegistration(
  $condition: ModelEventRegistrationConditionInput
  $input: DeleteEventRegistrationInput!
) {
  deleteEventRegistration(condition: $condition, input: $input) {
    attendanceStatus
    createdAt
    eventId
    id
    notes
    owner
    paymentStatus
    registrationData
    registrationStatus
    studentName
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEventRegistrationMutationVariables,
  APITypes.DeleteEventRegistrationMutation
>;
export const deleteInvitation = /* GraphQL */ `mutation DeleteInvitation(
  $condition: ModelInvitationConditionInput
  $input: DeleteInvitationInput!
) {
  deleteInvitation(condition: $condition, input: $input) {
    acceptedAt
    bio
    city
    createdAt
    email
    expiresAt
    firstName
    id
    invitationType
    invitedBy
    lastName
    lastSentAt
    message
    phone
    schoolName
    schoolType
    sport
    state
    status
    token
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInvitationMutationVariables,
  APITypes.DeleteInvitationMutation
>;
export const deleteLLCIncorporation = /* GraphQL */ `mutation DeleteLLCIncorporation(
  $condition: ModelLLCIncorporationConditionInput
  $input: DeleteLLCIncorporationInput!
) {
  deleteLLCIncorporation(condition: $condition, input: $input) {
    businessName
    businessType
    coachId
    completedAt
    cost
    createdAt
    documents
    filedAt
    filingData
    id
    owner
    state
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLLCIncorporationMutationVariables,
  APITypes.DeleteLLCIncorporationMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $condition: ModelMessageConditionInput
  $input: DeleteMessageInput!
) {
  deleteMessage(condition: $condition, input: $input) {
    attachments
    content
    createdAt
    id
    messageType
    metadata
    owner
    priority
    readAt
    recipientId
    senderId
    sentAt
    status
    subject
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteMessageMutationVariables, APITypes.DeleteMessageMutation>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $condition: ModelNotificationConditionInput
  $input: DeleteNotificationInput!
) {
  deleteNotification(condition: $condition, input: $input) {
    content
    createdAt
    deliveryChannels
    id
    metadata
    notificationType
    owner
    priority
    scheduledFor
    sentAt
    status
    title
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const deleteOnboardingProgress = /* GraphQL */ `mutation DeleteOnboardingProgress(
  $condition: ModelOnboardingProgressConditionInput
  $input: DeleteOnboardingProgressInput!
) {
  deleteOnboardingProgress(condition: $condition, input: $input) {
    completedSteps
    createdAt
    currentStep
    email
    id
    invitationBased
    invitationId
    lastUpdated
    stepData
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteOnboardingProgressMutationVariables,
  APITypes.DeleteOnboardingProgressMutation
>;
export const deleteParent = /* GraphQL */ `mutation DeleteParent(
  $condition: ModelParentConditionInput
  $input: DeleteParentInput!
) {
  deleteParent(condition: $condition, input: $input) {
    backgroundInformation
    createdAt
    employerName
    firstName
    generationCodeSuffix
    hispanicLatinoEthnicity
    id
    isActive
    lastSurname
    loginId
    maidenName
    middleName
    owner
    parentUSI
    parentUniqueId
    personalEmailAddress
    personalTitlePrefix
    professionDescriptor
    races
    sex
    updatedAt
    workEmailAddress
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteParentMutationVariables, APITypes.DeleteParentMutation>;
export const deletePaymentRecord = /* GraphQL */ `mutation DeletePaymentRecord(
  $condition: ModelPaymentRecordConditionInput
  $input: DeletePaymentRecordInput!
) {
  deletePaymentRecord(condition: $condition, input: $input) {
    applicationId
    coachEmail
    coachPayoutAmount
    createdAt
    depositAmount
    id
    isMarketplacePayment
    lastPaymentDate
    nextPaymentDue
    owner
    parentEmail
    paymentHistory
    paymentPlan
    paymentStatus
    platformFeeAmount
    stripeConnectAccountId
    stripeCustomerId
    stripePaymentIntentId
    stripePaymentLinkId
    studentId
    studentName
    totalPaid
    tuitionAmount
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePaymentRecordMutationVariables,
  APITypes.DeletePaymentRecordMutation
>;
export const deleteProfile = /* GraphQL */ `mutation DeleteProfile(
  $condition: ModelProfileConditionInput
  $input: DeleteProfileInput!
) {
  deleteProfile(condition: $condition, input: $input) {
    address
    backgroundCheckDate
    backgroundCheckStatus
    bio
    certifications
    createdAt
    emergencyContact
    experience
    id
    marketingProgress
    onboardingComplete
    preferences
    profileType
    specialties
    updatedAt
    userId
    wizardProgress
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteProfileMutationVariables, APITypes.DeleteProfileMutation>;
export const deleteQuiz = /* GraphQL */ `mutation DeleteQuiz(
  $condition: ModelQuizConditionInput
  $input: DeleteQuizInput!
) {
  deleteQuiz(condition: $condition, input: $input) {
    category
    createdAt
    createdBy
    description
    difficulty
    id
    isActive
    passingScore
    questions
    timeLimit
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteQuizMutationVariables, APITypes.DeleteQuizMutation>;
export const deleteQuizAttempt = /* GraphQL */ `mutation DeleteQuizAttempt(
  $condition: ModelQuizAttemptConditionInput
  $input: DeleteQuizAttemptInput!
) {
  deleteQuizAttempt(condition: $condition, input: $input) {
    answers
    completedAt
    createdAt
    id
    metadata
    owner
    passed
    quizId
    score
    startedAt
    timeSpent
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteQuizAttemptMutationVariables,
  APITypes.DeleteQuizAttemptMutation
>;
export const deleteSchool = /* GraphQL */ `mutation DeleteSchool(
  $condition: ModelSchoolConditionInput
  $input: DeleteSchoolInput!
) {
  deleteSchool(condition: $condition, input: $input) {
    administrativeFundingControl
    charterStatus
    createdAt
    etag
    gradeLevels
    id
    lastModifiedDate
    localEducationAgencyId
    magnetSpecialProgramEmphasisSchool
    schoolCategories
    schoolId
    schoolType
    titleIPartASchoolDesignation
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteSchoolMutationVariables, APITypes.DeleteSchoolMutation>;
export const deleteSession = /* GraphQL */ `mutation DeleteSession(
  $condition: ModelSessionConditionInput
  $input: DeleteSessionInput!
) {
  deleteSession(condition: $condition, input: $input) {
    coachId
    createdAt
    duration
    eventId
    feedback
    id
    location
    notes
    owner
    participants
    scheduledDate
    sessionType
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteSessionMutationVariables, APITypes.DeleteSessionMutation>;
export const deleteStaff = /* GraphQL */ `mutation DeleteStaff(
  $condition: ModelStaffConditionInput
  $input: DeleteStaffInput!
) {
  deleteStaff(condition: $condition, input: $input) {
    birthDate
    createdAt
    firstName
    generationCodeSuffix
    highestCompletedLevelOfEducation
    hispanicLatinoEthnicity
    id
    isActive
    lastSurname
    loginId
    maidenName
    middleName
    owner
    personalEmailAddress
    personalTitlePrefix
    races
    sex
    staffUSI
    staffUniqueId
    updatedAt
    workEmailAddress
    yearsOfPriorProfessionalExperience
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteStaffMutationVariables, APITypes.DeleteStaffMutation>;
export const deleteStaffSchoolAssociation = /* GraphQL */ `mutation DeleteStaffSchoolAssociation(
  $condition: ModelStaffSchoolAssociationConditionInput
  $input: DeleteStaffSchoolAssociationInput!
) {
  deleteStaffSchoolAssociation(condition: $condition, input: $input) {
    createdAt
    employmentStatus
    endDate
    hireDate
    id
    programAssignment
    schoolId
    schoolYear
    staffUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStaffSchoolAssociationMutationVariables,
  APITypes.DeleteStaffSchoolAssociationMutation
>;
export const deleteStudent = /* GraphQL */ `mutation DeleteStudent(
  $condition: ModelStudentConditionInput
  $input: DeleteStudentInput!
) {
  deleteStudent(condition: $condition, input: $input) {
    admissionDate
    applicationDate
    birthCity
    birthCountry
    birthDate
    birthStateAbbreviation
    createdAt
    firstName
    generationCodeSuffix
    hispanicLatinoEthnicity
    id
    lastSurname
    maidenName
    middleName
    personalTitlePrefix
    races
    sex
    studentApplicationStatus
    studentUSI
    studentUniqueId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteStudentMutationVariables, APITypes.DeleteStudentMutation>;
export const deleteStudentDocument = /* GraphQL */ `mutation DeleteStudentDocument(
  $condition: ModelStudentDocumentConditionInput
  $input: DeleteStudentDocumentInput!
) {
  deleteStudentDocument(condition: $condition, input: $input) {
    createdAt
    documentCategoryId
    documentDescription
    documentHash
    documentTitle
    expirationDate
    fileName
    fileSize
    id
    isConfidential
    mimeType
    reviewComments
    reviewDate
    reviewStatus
    reviewedByStaffUSI
    storageLocation
    studentUSI
    submittedByParentUSI
    submittedDate
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStudentDocumentMutationVariables,
  APITypes.DeleteStudentDocumentMutation
>;
export const deleteStudentEducationOrganizationResponsibleContactPerson =
  /* GraphQL */ `mutation DeleteStudentEducationOrganizationResponsibleContactPerson(
  $condition: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput
  $input: DeleteStudentEducationOrganizationResponsibleContactPersonInput!
) {
  deleteStudentEducationOrganizationResponsibleContactPerson(
    condition: $condition
    input: $input
  ) {
    contactAddress
    contactEmailAddress
    contactTelephones
    contactTitle
    createdAt
    educationOrganizationId
    emergencyContactStatus
    firstName
    id
    lastSurname
    primaryContactStatus
    relation
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteStudentEducationOrganizationResponsibleContactPersonMutationVariables,
    APITypes.DeleteStudentEducationOrganizationResponsibleContactPersonMutation
  >;
export const deleteStudentParentAssociation =
  /* GraphQL */ `mutation DeleteStudentParentAssociation(
  $condition: ModelStudentParentAssociationConditionInput
  $input: DeleteStudentParentAssociationInput!
) {
  deleteStudentParentAssociation(condition: $condition, input: $input) {
    contactPriority
    contactRestrictions
    createdAt
    custodyStatus
    emergencyContactStatus
    id
    legalGuardian
    livesWith
    parentUSI
    primaryContactStatus
    relation
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteStudentParentAssociationMutationVariables,
    APITypes.DeleteStudentParentAssociationMutation
  >;
export const deleteStudentSchoolAssociation =
  /* GraphQL */ `mutation DeleteStudentSchoolAssociation(
  $condition: ModelStudentSchoolAssociationConditionInput
  $input: DeleteStudentSchoolAssociationInput!
) {
  deleteStudentSchoolAssociation(condition: $condition, input: $input) {
    admissionStatus
    applicationStatus
    classOfSchoolYear
    createdAt
    entryDate
    entryGradeLevel
    entryType
    exitWithdrawDate
    exitWithdrawType
    id
    repeatGradeIndicator
    schoolId
    schoolYear
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteStudentSchoolAssociationMutationVariables,
    APITypes.DeleteStudentSchoolAssociationMutation
  >;
export const deleteTuitionSetting = /* GraphQL */ `mutation DeleteTuitionSetting(
  $condition: ModelTuitionSettingConditionInput
  $input: DeleteTuitionSettingInput!
) {
  deleteTuitionSetting(condition: $condition, input: $input) {
    allowPaymentPlans
    coachEmail
    coachId
    createdAt
    currency
    defaultDeposit
    defaultTuition
    id
    marketplaceEnabled
    owner
    paymentPlanOptions
    platformFeePercent
    stripeConnectAccountId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTuitionSettingMutationVariables,
  APITypes.DeleteTuitionSettingMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
    amplifyUserId
    createdAt
    email
    firstName
    id
    lastLoginAt
    lastName
    parentUSI
    phone
    role
    staffUSI
    status
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteUserMutationVariables, APITypes.DeleteUserMutation>;
export const parentApplication = /* GraphQL */ `mutation ParentApplication(
  $academicYear: String
  $address: AWSJSON
  $coachName: String
  $emergencyContact: AWSJSON
  $enrollmentType: ParentApplicationEnrollmentType
  $medicalInformation: String
  $parentEmail: String!
  $parentFirstName: String
  $parentLastName: String
  $parentPhone: String
  $preferredCoachId: String
  $schoolPreferences: AWSJSON
  $specialNotes: String
  $sportInterest: String!
  $startDate: String
  $studentAge: Int
  $studentDateOfBirth: String
  $studentGrade: String
  $studentName: String!
) {
  parentApplication(
    academicYear: $academicYear
    address: $address
    coachName: $coachName
    emergencyContact: $emergencyContact
    enrollmentType: $enrollmentType
    medicalInformation: $medicalInformation
    parentEmail: $parentEmail
    parentFirstName: $parentFirstName
    parentLastName: $parentLastName
    parentPhone: $parentPhone
    preferredCoachId: $preferredCoachId
    schoolPreferences: $schoolPreferences
    specialNotes: $specialNotes
    sportInterest: $sportInterest
    startDate: $startDate
    studentAge: $studentAge
    studentDateOfBirth: $studentDateOfBirth
    studentGrade: $studentGrade
    studentName: $studentName
  )
}
` as GeneratedMutation<
  APITypes.ParentApplicationMutationVariables,
  APITypes.ParentApplicationMutation
>;
export const updateAnalyticsEvent = /* GraphQL */ `mutation UpdateAnalyticsEvent(
  $condition: ModelAnalyticsEventConditionInput
  $input: UpdateAnalyticsEventInput!
) {
  updateAnalyticsEvent(condition: $condition, input: $input) {
    createdAt
    eventName
    id
    ipAddress
    properties
    referrer
    sessionId
    timestamp
    updatedAt
    userAgent
    userId
    utmCampaign
    utmContent
    utmMedium
    utmSource
    utmTerm
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAnalyticsEventMutationVariables,
  APITypes.UpdateAnalyticsEventMutation
>;
export const updateApiKey = /* GraphQL */ `mutation UpdateApiKey(
  $condition: ModelApiKeyConditionInput
  $input: UpdateApiKeyInput!
) {
  updateApiKey(condition: $condition, input: $input) {
    createdAt
    createdBy
    description
    expiresAt
    id
    ipWhitelist
    isActive
    keyHash
    keyPrefix
    lastRotatedAt
    lastSecurityIncident
    lastUsedAt
    metadata
    name
    permissions
    rateLimitDaily
    rateLimitMinute
    securityIncidents
    updatedAt
    usageCount
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateApiKeyMutationVariables, APITypes.UpdateApiKeyMutation>;
export const updateApiKeyRotation = /* GraphQL */ `mutation UpdateApiKeyRotation(
  $condition: ModelApiKeyRotationConditionInput
  $input: UpdateApiKeyRotationInput!
) {
  updateApiKeyRotation(condition: $condition, input: $input) {
    createdAt
    gracePeriodEnd
    id
    newKeyId
    oldKeyDeactivated
    oldKeyId
    reason
    rotatedBy
    rotationType
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateApiKeyRotationMutationVariables,
  APITypes.UpdateApiKeyRotationMutation
>;
export const updateApiKeyUsage = /* GraphQL */ `mutation UpdateApiKeyUsage(
  $condition: ModelApiKeyUsageConditionInput
  $input: UpdateApiKeyUsageInput!
) {
  updateApiKeyUsage(condition: $condition, input: $input) {
    createdAt
    endpoint
    id
    ipAddress
    keyId
    keyPrefix
    metadata
    method
    permissions
    rateLimitHit
    requestSize
    responseSize
    responseStatus
    responseTime
    securityViolation
    timestamp
    updatedAt
    userAgent
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateApiKeyUsageMutationVariables,
  APITypes.UpdateApiKeyUsageMutation
>;
export const updateAuditLog = /* GraphQL */ `mutation UpdateAuditLog(
  $condition: ModelAuditLogConditionInput
  $input: UpdateAuditLogInput!
) {
  updateAuditLog(condition: $condition, input: $input) {
    action
    changes
    createdAt
    id
    ipAddress
    metadata
    resource
    resourceId
    timestamp
    updatedAt
    userAgent
    userId
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateAuditLogMutationVariables, APITypes.UpdateAuditLogMutation>;
export const updateCoachPayout = /* GraphQL */ `mutation UpdateCoachPayout(
  $condition: ModelCoachPayoutConditionInput
  $input: UpdateCoachPayoutInput!
) {
  updateCoachPayout(condition: $condition, input: $input) {
    coachEmail
    createdAt
    description
    id
    metadata
    owner
    payoutAmount
    payoutDate
    payoutStatus
    payoutType
    stripeConnectAccountId
    stripePayout
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCoachPayoutMutationVariables,
  APITypes.UpdateCoachPayoutMutation
>;
export const updateDescriptor = /* GraphQL */ `mutation UpdateDescriptor(
  $condition: ModelDescriptorConditionInput
  $input: UpdateDescriptorInput!
) {
  updateDescriptor(condition: $condition, input: $input) {
    codeValue
    createdAt
    description
    descriptorId
    effectiveBeginDate
    effectiveEndDate
    id
    namespace
    priorDescriptorId
    shortDescription
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDescriptorMutationVariables,
  APITypes.UpdateDescriptorMutation
>;
export const updateDocumentCategory = /* GraphQL */ `mutation UpdateDocumentCategory(
  $condition: ModelDocumentCategoryConditionInput
  $input: UpdateDocumentCategoryInput!
) {
  updateDocumentCategory(condition: $condition, input: $input) {
    categoryDescription
    categoryName
    createdAt
    documentCategoryId
    id
    isActive
    isRequired
    sortOrder
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDocumentCategoryMutationVariables,
  APITypes.UpdateDocumentCategoryMutation
>;
export const updateEducationOrganization = /* GraphQL */ `mutation UpdateEducationOrganization(
  $condition: ModelEducationOrganizationConditionInput
  $input: UpdateEducationOrganizationInput!
) {
  updateEducationOrganization(condition: $condition, input: $input) {
    addresses
    createdAt
    educationOrganizationId
    etag
    id
    lastModifiedDate
    nameOfInstitution
    operationalStatus
    shortNameOfInstitution
    telephones
    updatedAt
    webSite
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEducationOrganizationMutationVariables,
  APITypes.UpdateEducationOrganizationMutation
>;
export const updateEnrollment = /* GraphQL */ `mutation UpdateEnrollment(
  $condition: ModelEnrollmentConditionInput
  $input: UpdateEnrollmentInput!
) {
  updateEnrollment(condition: $condition, input: $input) {
    academicYear
    applicationData
    coachName
    createdAt
    currentStep
    documents
    enrollmentType
    id
    parentId
    schoolPreferences
    sportInterest
    startDate
    status
    studentAge
    studentGrade
    studentName
    timelineStatus
    timelineSteps
    totalSteps
    tuitionPlan
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEnrollmentMutationVariables,
  APITypes.UpdateEnrollmentMutation
>;
export const updateEvent = /* GraphQL */ `mutation UpdateEvent(
  $condition: ModelEventConditionInput
  $input: UpdateEventInput!
) {
  updateEvent(condition: $condition, input: $input) {
    address
    ageGroups
    capacity
    coachId
    coachName
    createdAt
    currency
    description
    endDate
    equipment
    eventType
    googleCalendarEventId
    googleCalendarLastSynced
    googleCalendarSyncEnabled
    googleMeetUrl
    id
    images
    isOnline
    isPublic
    location
    meetingUrl
    owner
    price
    registeredCount
    registrationDeadline
    requirements
    shortDescription
    skillLevel
    startDate
    status
    tags
    timezone
    title
    updatedAt
    venue
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateEventMutationVariables, APITypes.UpdateEventMutation>;
export const updateEventRegistration = /* GraphQL */ `mutation UpdateEventRegistration(
  $condition: ModelEventRegistrationConditionInput
  $input: UpdateEventRegistrationInput!
) {
  updateEventRegistration(condition: $condition, input: $input) {
    attendanceStatus
    createdAt
    eventId
    id
    notes
    owner
    paymentStatus
    registrationData
    registrationStatus
    studentName
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEventRegistrationMutationVariables,
  APITypes.UpdateEventRegistrationMutation
>;
export const updateInvitation = /* GraphQL */ `mutation UpdateInvitation(
  $condition: ModelInvitationConditionInput
  $input: UpdateInvitationInput!
) {
  updateInvitation(condition: $condition, input: $input) {
    acceptedAt
    bio
    city
    createdAt
    email
    expiresAt
    firstName
    id
    invitationType
    invitedBy
    lastName
    lastSentAt
    message
    phone
    schoolName
    schoolType
    sport
    state
    status
    token
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInvitationMutationVariables,
  APITypes.UpdateInvitationMutation
>;
export const updateLLCIncorporation = /* GraphQL */ `mutation UpdateLLCIncorporation(
  $condition: ModelLLCIncorporationConditionInput
  $input: UpdateLLCIncorporationInput!
) {
  updateLLCIncorporation(condition: $condition, input: $input) {
    businessName
    businessType
    coachId
    completedAt
    cost
    createdAt
    documents
    filedAt
    filingData
    id
    owner
    state
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLLCIncorporationMutationVariables,
  APITypes.UpdateLLCIncorporationMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $condition: ModelMessageConditionInput
  $input: UpdateMessageInput!
) {
  updateMessage(condition: $condition, input: $input) {
    attachments
    content
    createdAt
    id
    messageType
    metadata
    owner
    priority
    readAt
    recipientId
    senderId
    sentAt
    status
    subject
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateMessageMutationVariables, APITypes.UpdateMessageMutation>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $condition: ModelNotificationConditionInput
  $input: UpdateNotificationInput!
) {
  updateNotification(condition: $condition, input: $input) {
    content
    createdAt
    deliveryChannels
    id
    metadata
    notificationType
    owner
    priority
    scheduledFor
    sentAt
    status
    title
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const updateOnboardingProgress = /* GraphQL */ `mutation UpdateOnboardingProgress(
  $condition: ModelOnboardingProgressConditionInput
  $input: UpdateOnboardingProgressInput!
) {
  updateOnboardingProgress(condition: $condition, input: $input) {
    completedSteps
    createdAt
    currentStep
    email
    id
    invitationBased
    invitationId
    lastUpdated
    stepData
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateOnboardingProgressMutationVariables,
  APITypes.UpdateOnboardingProgressMutation
>;
export const updateParent = /* GraphQL */ `mutation UpdateParent(
  $condition: ModelParentConditionInput
  $input: UpdateParentInput!
) {
  updateParent(condition: $condition, input: $input) {
    backgroundInformation
    createdAt
    employerName
    firstName
    generationCodeSuffix
    hispanicLatinoEthnicity
    id
    isActive
    lastSurname
    loginId
    maidenName
    middleName
    owner
    parentUSI
    parentUniqueId
    personalEmailAddress
    personalTitlePrefix
    professionDescriptor
    races
    sex
    updatedAt
    workEmailAddress
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateParentMutationVariables, APITypes.UpdateParentMutation>;
export const updatePaymentRecord = /* GraphQL */ `mutation UpdatePaymentRecord(
  $condition: ModelPaymentRecordConditionInput
  $input: UpdatePaymentRecordInput!
) {
  updatePaymentRecord(condition: $condition, input: $input) {
    applicationId
    coachEmail
    coachPayoutAmount
    createdAt
    depositAmount
    id
    isMarketplacePayment
    lastPaymentDate
    nextPaymentDue
    owner
    parentEmail
    paymentHistory
    paymentPlan
    paymentStatus
    platformFeeAmount
    stripeConnectAccountId
    stripeCustomerId
    stripePaymentIntentId
    stripePaymentLinkId
    studentId
    studentName
    totalPaid
    tuitionAmount
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePaymentRecordMutationVariables,
  APITypes.UpdatePaymentRecordMutation
>;
export const updateProfile = /* GraphQL */ `mutation UpdateProfile(
  $condition: ModelProfileConditionInput
  $input: UpdateProfileInput!
) {
  updateProfile(condition: $condition, input: $input) {
    address
    backgroundCheckDate
    backgroundCheckStatus
    bio
    certifications
    createdAt
    emergencyContact
    experience
    id
    marketingProgress
    onboardingComplete
    preferences
    profileType
    specialties
    updatedAt
    userId
    wizardProgress
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateProfileMutationVariables, APITypes.UpdateProfileMutation>;
export const updateQuiz = /* GraphQL */ `mutation UpdateQuiz(
  $condition: ModelQuizConditionInput
  $input: UpdateQuizInput!
) {
  updateQuiz(condition: $condition, input: $input) {
    category
    createdAt
    createdBy
    description
    difficulty
    id
    isActive
    passingScore
    questions
    timeLimit
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateQuizMutationVariables, APITypes.UpdateQuizMutation>;
export const updateQuizAttempt = /* GraphQL */ `mutation UpdateQuizAttempt(
  $condition: ModelQuizAttemptConditionInput
  $input: UpdateQuizAttemptInput!
) {
  updateQuizAttempt(condition: $condition, input: $input) {
    answers
    completedAt
    createdAt
    id
    metadata
    owner
    passed
    quizId
    score
    startedAt
    timeSpent
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateQuizAttemptMutationVariables,
  APITypes.UpdateQuizAttemptMutation
>;
export const updateSchool = /* GraphQL */ `mutation UpdateSchool(
  $condition: ModelSchoolConditionInput
  $input: UpdateSchoolInput!
) {
  updateSchool(condition: $condition, input: $input) {
    administrativeFundingControl
    charterStatus
    createdAt
    etag
    gradeLevels
    id
    lastModifiedDate
    localEducationAgencyId
    magnetSpecialProgramEmphasisSchool
    schoolCategories
    schoolId
    schoolType
    titleIPartASchoolDesignation
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateSchoolMutationVariables, APITypes.UpdateSchoolMutation>;
export const updateSession = /* GraphQL */ `mutation UpdateSession(
  $condition: ModelSessionConditionInput
  $input: UpdateSessionInput!
) {
  updateSession(condition: $condition, input: $input) {
    coachId
    createdAt
    duration
    eventId
    feedback
    id
    location
    notes
    owner
    participants
    scheduledDate
    sessionType
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateSessionMutationVariables, APITypes.UpdateSessionMutation>;
export const updateStaff = /* GraphQL */ `mutation UpdateStaff(
  $condition: ModelStaffConditionInput
  $input: UpdateStaffInput!
) {
  updateStaff(condition: $condition, input: $input) {
    birthDate
    createdAt
    firstName
    generationCodeSuffix
    highestCompletedLevelOfEducation
    hispanicLatinoEthnicity
    id
    isActive
    lastSurname
    loginId
    maidenName
    middleName
    owner
    personalEmailAddress
    personalTitlePrefix
    races
    sex
    staffUSI
    staffUniqueId
    updatedAt
    workEmailAddress
    yearsOfPriorProfessionalExperience
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateStaffMutationVariables, APITypes.UpdateStaffMutation>;
export const updateStaffSchoolAssociation = /* GraphQL */ `mutation UpdateStaffSchoolAssociation(
  $condition: ModelStaffSchoolAssociationConditionInput
  $input: UpdateStaffSchoolAssociationInput!
) {
  updateStaffSchoolAssociation(condition: $condition, input: $input) {
    createdAt
    employmentStatus
    endDate
    hireDate
    id
    programAssignment
    schoolId
    schoolYear
    staffUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStaffSchoolAssociationMutationVariables,
  APITypes.UpdateStaffSchoolAssociationMutation
>;
export const updateStudent = /* GraphQL */ `mutation UpdateStudent(
  $condition: ModelStudentConditionInput
  $input: UpdateStudentInput!
) {
  updateStudent(condition: $condition, input: $input) {
    admissionDate
    applicationDate
    birthCity
    birthCountry
    birthDate
    birthStateAbbreviation
    createdAt
    firstName
    generationCodeSuffix
    hispanicLatinoEthnicity
    id
    lastSurname
    maidenName
    middleName
    personalTitlePrefix
    races
    sex
    studentApplicationStatus
    studentUSI
    studentUniqueId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateStudentMutationVariables, APITypes.UpdateStudentMutation>;
export const updateStudentDocument = /* GraphQL */ `mutation UpdateStudentDocument(
  $condition: ModelStudentDocumentConditionInput
  $input: UpdateStudentDocumentInput!
) {
  updateStudentDocument(condition: $condition, input: $input) {
    createdAt
    documentCategoryId
    documentDescription
    documentHash
    documentTitle
    expirationDate
    fileName
    fileSize
    id
    isConfidential
    mimeType
    reviewComments
    reviewDate
    reviewStatus
    reviewedByStaffUSI
    storageLocation
    studentUSI
    submittedByParentUSI
    submittedDate
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStudentDocumentMutationVariables,
  APITypes.UpdateStudentDocumentMutation
>;
export const updateStudentEducationOrganizationResponsibleContactPerson =
  /* GraphQL */ `mutation UpdateStudentEducationOrganizationResponsibleContactPerson(
  $condition: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput
  $input: UpdateStudentEducationOrganizationResponsibleContactPersonInput!
) {
  updateStudentEducationOrganizationResponsibleContactPerson(
    condition: $condition
    input: $input
  ) {
    contactAddress
    contactEmailAddress
    contactTelephones
    contactTitle
    createdAt
    educationOrganizationId
    emergencyContactStatus
    firstName
    id
    lastSurname
    primaryContactStatus
    relation
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateStudentEducationOrganizationResponsibleContactPersonMutationVariables,
    APITypes.UpdateStudentEducationOrganizationResponsibleContactPersonMutation
  >;
export const updateStudentParentAssociation =
  /* GraphQL */ `mutation UpdateStudentParentAssociation(
  $condition: ModelStudentParentAssociationConditionInput
  $input: UpdateStudentParentAssociationInput!
) {
  updateStudentParentAssociation(condition: $condition, input: $input) {
    contactPriority
    contactRestrictions
    createdAt
    custodyStatus
    emergencyContactStatus
    id
    legalGuardian
    livesWith
    parentUSI
    primaryContactStatus
    relation
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateStudentParentAssociationMutationVariables,
    APITypes.UpdateStudentParentAssociationMutation
  >;
export const updateStudentSchoolAssociation =
  /* GraphQL */ `mutation UpdateStudentSchoolAssociation(
  $condition: ModelStudentSchoolAssociationConditionInput
  $input: UpdateStudentSchoolAssociationInput!
) {
  updateStudentSchoolAssociation(condition: $condition, input: $input) {
    admissionStatus
    applicationStatus
    classOfSchoolYear
    createdAt
    entryDate
    entryGradeLevel
    entryType
    exitWithdrawDate
    exitWithdrawType
    id
    repeatGradeIndicator
    schoolId
    schoolYear
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateStudentSchoolAssociationMutationVariables,
    APITypes.UpdateStudentSchoolAssociationMutation
  >;
export const updateTuitionSetting = /* GraphQL */ `mutation UpdateTuitionSetting(
  $condition: ModelTuitionSettingConditionInput
  $input: UpdateTuitionSettingInput!
) {
  updateTuitionSetting(condition: $condition, input: $input) {
    allowPaymentPlans
    coachEmail
    coachId
    createdAt
    currency
    defaultDeposit
    defaultTuition
    id
    marketplaceEnabled
    owner
    paymentPlanOptions
    platformFeePercent
    stripeConnectAccountId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTuitionSettingMutationVariables,
  APITypes.UpdateTuitionSettingMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
    amplifyUserId
    createdAt
    email
    firstName
    id
    lastLoginAt
    lastName
    parentUSI
    phone
    role
    staffUSI
    status
    studentUSI
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateUserMutationVariables, APITypes.UpdateUserMutation>;
