/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from './API';
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAnalyticsEvent = /* GraphQL */ `subscription OnCreateAnalyticsEvent(
  $filter: ModelSubscriptionAnalyticsEventFilterInput
) {
  onCreateAnalyticsEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAnalyticsEventSubscriptionVariables,
  APITypes.OnCreateAnalyticsEventSubscription
>;
export const onCreateApiKey =
  /* GraphQL */ `subscription OnCreateApiKey($filter: ModelSubscriptionApiKeyFilterInput) {
  onCreateApiKey(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateApiKeySubscriptionVariables,
    APITypes.OnCreateApiKeySubscription
  >;
export const onCreateApiKeyRotation = /* GraphQL */ `subscription OnCreateApiKeyRotation(
  $filter: ModelSubscriptionApiKeyRotationFilterInput
) {
  onCreateApiKeyRotation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApiKeyRotationSubscriptionVariables,
  APITypes.OnCreateApiKeyRotationSubscription
>;
export const onCreateApiKeyUsage = /* GraphQL */ `subscription OnCreateApiKeyUsage(
  $filter: ModelSubscriptionApiKeyUsageFilterInput
) {
  onCreateApiKeyUsage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApiKeyUsageSubscriptionVariables,
  APITypes.OnCreateApiKeyUsageSubscription
>;
export const onCreateAuditLog =
  /* GraphQL */ `subscription OnCreateAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
  onCreateAuditLog(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateAuditLogSubscriptionVariables,
    APITypes.OnCreateAuditLogSubscription
  >;
export const onCreateCoachPayout = /* GraphQL */ `subscription OnCreateCoachPayout(
  $filter: ModelSubscriptionCoachPayoutFilterInput
  $owner: String
) {
  onCreateCoachPayout(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCoachPayoutSubscriptionVariables,
  APITypes.OnCreateCoachPayoutSubscription
>;
export const onCreateDescriptor = /* GraphQL */ `subscription OnCreateDescriptor(
  $filter: ModelSubscriptionDescriptorFilterInput
) {
  onCreateDescriptor(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDescriptorSubscriptionVariables,
  APITypes.OnCreateDescriptorSubscription
>;
export const onCreateDocumentCategory = /* GraphQL */ `subscription OnCreateDocumentCategory(
  $filter: ModelSubscriptionDocumentCategoryFilterInput
) {
  onCreateDocumentCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDocumentCategorySubscriptionVariables,
  APITypes.OnCreateDocumentCategorySubscription
>;
export const onCreateEducationOrganization =
  /* GraphQL */ `subscription OnCreateEducationOrganization(
  $filter: ModelSubscriptionEducationOrganizationFilterInput
) {
  onCreateEducationOrganization(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateEducationOrganizationSubscriptionVariables,
    APITypes.OnCreateEducationOrganizationSubscription
  >;
export const onCreateEnrollment = /* GraphQL */ `subscription OnCreateEnrollment(
  $filter: ModelSubscriptionEnrollmentFilterInput
) {
  onCreateEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEnrollmentSubscriptionVariables,
  APITypes.OnCreateEnrollmentSubscription
>;
export const onCreateEvent = /* GraphQL */ `subscription OnCreateEvent(
  $filter: ModelSubscriptionEventFilterInput
  $owner: String
) {
  onCreateEvent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEventSubscriptionVariables,
  APITypes.OnCreateEventSubscription
>;
export const onCreateEventRegistration = /* GraphQL */ `subscription OnCreateEventRegistration(
  $filter: ModelSubscriptionEventRegistrationFilterInput
  $owner: String
) {
  onCreateEventRegistration(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEventRegistrationSubscriptionVariables,
  APITypes.OnCreateEventRegistrationSubscription
>;
export const onCreateInvitation = /* GraphQL */ `subscription OnCreateInvitation(
  $filter: ModelSubscriptionInvitationFilterInput
) {
  onCreateInvitation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInvitationSubscriptionVariables,
  APITypes.OnCreateInvitationSubscription
>;
export const onCreateLLCIncorporation = /* GraphQL */ `subscription OnCreateLLCIncorporation(
  $filter: ModelSubscriptionLLCIncorporationFilterInput
  $owner: String
) {
  onCreateLLCIncorporation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLLCIncorporationSubscriptionVariables,
  APITypes.OnCreateLLCIncorporationSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onCreateMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onCreateNotification(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onCreateOnboardingProgress = /* GraphQL */ `subscription OnCreateOnboardingProgress(
  $filter: ModelSubscriptionOnboardingProgressFilterInput
) {
  onCreateOnboardingProgress(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateOnboardingProgressSubscriptionVariables,
  APITypes.OnCreateOnboardingProgressSubscription
>;
export const onCreateParent = /* GraphQL */ `subscription OnCreateParent(
  $filter: ModelSubscriptionParentFilterInput
  $owner: String
) {
  onCreateParent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateParentSubscriptionVariables,
  APITypes.OnCreateParentSubscription
>;
export const onCreatePaymentRecord = /* GraphQL */ `subscription OnCreatePaymentRecord(
  $filter: ModelSubscriptionPaymentRecordFilterInput
  $owner: String
) {
  onCreatePaymentRecord(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePaymentRecordSubscriptionVariables,
  APITypes.OnCreatePaymentRecordSubscription
>;
export const onCreateProfile =
  /* GraphQL */ `subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
  onCreateProfile(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateProfileSubscriptionVariables,
    APITypes.OnCreateProfileSubscription
  >;
export const onCreateQuiz =
  /* GraphQL */ `subscription OnCreateQuiz($filter: ModelSubscriptionQuizFilterInput) {
  onCreateQuiz(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateQuizSubscriptionVariables,
    APITypes.OnCreateQuizSubscription
  >;
export const onCreateQuizAttempt = /* GraphQL */ `subscription OnCreateQuizAttempt(
  $filter: ModelSubscriptionQuizAttemptFilterInput
  $owner: String
) {
  onCreateQuizAttempt(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuizAttemptSubscriptionVariables,
  APITypes.OnCreateQuizAttemptSubscription
>;
export const onCreateSchool =
  /* GraphQL */ `subscription OnCreateSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onCreateSchool(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateSchoolSubscriptionVariables,
    APITypes.OnCreateSchoolSubscription
  >;
export const onCreateSession = /* GraphQL */ `subscription OnCreateSession(
  $filter: ModelSubscriptionSessionFilterInput
  $owner: String
) {
  onCreateSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSessionSubscriptionVariables,
  APITypes.OnCreateSessionSubscription
>;
export const onCreateStaff = /* GraphQL */ `subscription OnCreateStaff(
  $filter: ModelSubscriptionStaffFilterInput
  $owner: String
) {
  onCreateStaff(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStaffSubscriptionVariables,
  APITypes.OnCreateStaffSubscription
>;
export const onCreateStaffSchoolAssociation =
  /* GraphQL */ `subscription OnCreateStaffSchoolAssociation(
  $filter: ModelSubscriptionStaffSchoolAssociationFilterInput
) {
  onCreateStaffSchoolAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateStaffSchoolAssociationSubscriptionVariables,
    APITypes.OnCreateStaffSchoolAssociationSubscription
  >;
export const onCreateStudent =
  /* GraphQL */ `subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onCreateStudent(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateStudentSubscriptionVariables,
    APITypes.OnCreateStudentSubscription
  >;
export const onCreateStudentDocument = /* GraphQL */ `subscription OnCreateStudentDocument(
  $filter: ModelSubscriptionStudentDocumentFilterInput
) {
  onCreateStudentDocument(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStudentDocumentSubscriptionVariables,
  APITypes.OnCreateStudentDocumentSubscription
>;
export const onCreateStudentEducationOrganizationResponsib1252c =
  /* GraphQL */ `subscription OnCreateStudentEducationOrganizationResponsib1252c(
  $filter: ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput
) {
  onCreateStudentEducationOrganizationResponsib1252c(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateStudentEducationOrganizationResponsib1252cSubscriptionVariables,
    APITypes.OnCreateStudentEducationOrganizationResponsib1252cSubscription
  >;
export const onCreateStudentParentAssociation =
  /* GraphQL */ `subscription OnCreateStudentParentAssociation(
  $filter: ModelSubscriptionStudentParentAssociationFilterInput
) {
  onCreateStudentParentAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateStudentParentAssociationSubscriptionVariables,
    APITypes.OnCreateStudentParentAssociationSubscription
  >;
export const onCreateStudentSchoolAssociation =
  /* GraphQL */ `subscription OnCreateStudentSchoolAssociation(
  $filter: ModelSubscriptionStudentSchoolAssociationFilterInput
) {
  onCreateStudentSchoolAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateStudentSchoolAssociationSubscriptionVariables,
    APITypes.OnCreateStudentSchoolAssociationSubscription
  >;
export const onCreateTuitionSetting = /* GraphQL */ `subscription OnCreateTuitionSetting(
  $filter: ModelSubscriptionTuitionSettingFilterInput
  $owner: String
) {
  onCreateTuitionSetting(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTuitionSettingSubscriptionVariables,
  APITypes.OnCreateTuitionSettingSubscription
>;
export const onCreateUser =
  /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateUserSubscriptionVariables,
    APITypes.OnCreateUserSubscription
  >;
export const onDeleteAnalyticsEvent = /* GraphQL */ `subscription OnDeleteAnalyticsEvent(
  $filter: ModelSubscriptionAnalyticsEventFilterInput
) {
  onDeleteAnalyticsEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAnalyticsEventSubscriptionVariables,
  APITypes.OnDeleteAnalyticsEventSubscription
>;
export const onDeleteApiKey =
  /* GraphQL */ `subscription OnDeleteApiKey($filter: ModelSubscriptionApiKeyFilterInput) {
  onDeleteApiKey(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteApiKeySubscriptionVariables,
    APITypes.OnDeleteApiKeySubscription
  >;
export const onDeleteApiKeyRotation = /* GraphQL */ `subscription OnDeleteApiKeyRotation(
  $filter: ModelSubscriptionApiKeyRotationFilterInput
) {
  onDeleteApiKeyRotation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApiKeyRotationSubscriptionVariables,
  APITypes.OnDeleteApiKeyRotationSubscription
>;
export const onDeleteApiKeyUsage = /* GraphQL */ `subscription OnDeleteApiKeyUsage(
  $filter: ModelSubscriptionApiKeyUsageFilterInput
) {
  onDeleteApiKeyUsage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApiKeyUsageSubscriptionVariables,
  APITypes.OnDeleteApiKeyUsageSubscription
>;
export const onDeleteAuditLog =
  /* GraphQL */ `subscription OnDeleteAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
  onDeleteAuditLog(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteAuditLogSubscriptionVariables,
    APITypes.OnDeleteAuditLogSubscription
  >;
export const onDeleteCoachPayout = /* GraphQL */ `subscription OnDeleteCoachPayout(
  $filter: ModelSubscriptionCoachPayoutFilterInput
  $owner: String
) {
  onDeleteCoachPayout(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCoachPayoutSubscriptionVariables,
  APITypes.OnDeleteCoachPayoutSubscription
>;
export const onDeleteDescriptor = /* GraphQL */ `subscription OnDeleteDescriptor(
  $filter: ModelSubscriptionDescriptorFilterInput
) {
  onDeleteDescriptor(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDescriptorSubscriptionVariables,
  APITypes.OnDeleteDescriptorSubscription
>;
export const onDeleteDocumentCategory = /* GraphQL */ `subscription OnDeleteDocumentCategory(
  $filter: ModelSubscriptionDocumentCategoryFilterInput
) {
  onDeleteDocumentCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDocumentCategorySubscriptionVariables,
  APITypes.OnDeleteDocumentCategorySubscription
>;
export const onDeleteEducationOrganization =
  /* GraphQL */ `subscription OnDeleteEducationOrganization(
  $filter: ModelSubscriptionEducationOrganizationFilterInput
) {
  onDeleteEducationOrganization(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteEducationOrganizationSubscriptionVariables,
    APITypes.OnDeleteEducationOrganizationSubscription
  >;
export const onDeleteEnrollment = /* GraphQL */ `subscription OnDeleteEnrollment(
  $filter: ModelSubscriptionEnrollmentFilterInput
) {
  onDeleteEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEnrollmentSubscriptionVariables,
  APITypes.OnDeleteEnrollmentSubscription
>;
export const onDeleteEvent = /* GraphQL */ `subscription OnDeleteEvent(
  $filter: ModelSubscriptionEventFilterInput
  $owner: String
) {
  onDeleteEvent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEventSubscriptionVariables,
  APITypes.OnDeleteEventSubscription
>;
export const onDeleteEventRegistration = /* GraphQL */ `subscription OnDeleteEventRegistration(
  $filter: ModelSubscriptionEventRegistrationFilterInput
  $owner: String
) {
  onDeleteEventRegistration(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEventRegistrationSubscriptionVariables,
  APITypes.OnDeleteEventRegistrationSubscription
>;
export const onDeleteInvitation = /* GraphQL */ `subscription OnDeleteInvitation(
  $filter: ModelSubscriptionInvitationFilterInput
) {
  onDeleteInvitation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInvitationSubscriptionVariables,
  APITypes.OnDeleteInvitationSubscription
>;
export const onDeleteLLCIncorporation = /* GraphQL */ `subscription OnDeleteLLCIncorporation(
  $filter: ModelSubscriptionLLCIncorporationFilterInput
  $owner: String
) {
  onDeleteLLCIncorporation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLLCIncorporationSubscriptionVariables,
  APITypes.OnDeleteLLCIncorporationSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onDeleteMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onDeleteNotification(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onDeleteOnboardingProgress = /* GraphQL */ `subscription OnDeleteOnboardingProgress(
  $filter: ModelSubscriptionOnboardingProgressFilterInput
) {
  onDeleteOnboardingProgress(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOnboardingProgressSubscriptionVariables,
  APITypes.OnDeleteOnboardingProgressSubscription
>;
export const onDeleteParent = /* GraphQL */ `subscription OnDeleteParent(
  $filter: ModelSubscriptionParentFilterInput
  $owner: String
) {
  onDeleteParent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteParentSubscriptionVariables,
  APITypes.OnDeleteParentSubscription
>;
export const onDeletePaymentRecord = /* GraphQL */ `subscription OnDeletePaymentRecord(
  $filter: ModelSubscriptionPaymentRecordFilterInput
  $owner: String
) {
  onDeletePaymentRecord(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePaymentRecordSubscriptionVariables,
  APITypes.OnDeletePaymentRecordSubscription
>;
export const onDeleteProfile =
  /* GraphQL */ `subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
  onDeleteProfile(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteProfileSubscriptionVariables,
    APITypes.OnDeleteProfileSubscription
  >;
export const onDeleteQuiz =
  /* GraphQL */ `subscription OnDeleteQuiz($filter: ModelSubscriptionQuizFilterInput) {
  onDeleteQuiz(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteQuizSubscriptionVariables,
    APITypes.OnDeleteQuizSubscription
  >;
export const onDeleteQuizAttempt = /* GraphQL */ `subscription OnDeleteQuizAttempt(
  $filter: ModelSubscriptionQuizAttemptFilterInput
  $owner: String
) {
  onDeleteQuizAttempt(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuizAttemptSubscriptionVariables,
  APITypes.OnDeleteQuizAttemptSubscription
>;
export const onDeleteSchool =
  /* GraphQL */ `subscription OnDeleteSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onDeleteSchool(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteSchoolSubscriptionVariables,
    APITypes.OnDeleteSchoolSubscription
  >;
export const onDeleteSession = /* GraphQL */ `subscription OnDeleteSession(
  $filter: ModelSubscriptionSessionFilterInput
  $owner: String
) {
  onDeleteSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSessionSubscriptionVariables,
  APITypes.OnDeleteSessionSubscription
>;
export const onDeleteStaff = /* GraphQL */ `subscription OnDeleteStaff(
  $filter: ModelSubscriptionStaffFilterInput
  $owner: String
) {
  onDeleteStaff(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStaffSubscriptionVariables,
  APITypes.OnDeleteStaffSubscription
>;
export const onDeleteStaffSchoolAssociation =
  /* GraphQL */ `subscription OnDeleteStaffSchoolAssociation(
  $filter: ModelSubscriptionStaffSchoolAssociationFilterInput
) {
  onDeleteStaffSchoolAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteStaffSchoolAssociationSubscriptionVariables,
    APITypes.OnDeleteStaffSchoolAssociationSubscription
  >;
export const onDeleteStudent =
  /* GraphQL */ `subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
  onDeleteStudent(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteStudentSubscriptionVariables,
    APITypes.OnDeleteStudentSubscription
  >;
export const onDeleteStudentDocument = /* GraphQL */ `subscription OnDeleteStudentDocument(
  $filter: ModelSubscriptionStudentDocumentFilterInput
) {
  onDeleteStudentDocument(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStudentDocumentSubscriptionVariables,
  APITypes.OnDeleteStudentDocumentSubscription
>;
export const onDeleteStudentEducationOrganizationResponsib192cd =
  /* GraphQL */ `subscription OnDeleteStudentEducationOrganizationResponsib192cd(
  $filter: ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput
) {
  onDeleteStudentEducationOrganizationResponsib192cd(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteStudentEducationOrganizationResponsib192cdSubscriptionVariables,
    APITypes.OnDeleteStudentEducationOrganizationResponsib192cdSubscription
  >;
export const onDeleteStudentParentAssociation =
  /* GraphQL */ `subscription OnDeleteStudentParentAssociation(
  $filter: ModelSubscriptionStudentParentAssociationFilterInput
) {
  onDeleteStudentParentAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteStudentParentAssociationSubscriptionVariables,
    APITypes.OnDeleteStudentParentAssociationSubscription
  >;
export const onDeleteStudentSchoolAssociation =
  /* GraphQL */ `subscription OnDeleteStudentSchoolAssociation(
  $filter: ModelSubscriptionStudentSchoolAssociationFilterInput
) {
  onDeleteStudentSchoolAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteStudentSchoolAssociationSubscriptionVariables,
    APITypes.OnDeleteStudentSchoolAssociationSubscription
  >;
export const onDeleteTuitionSetting = /* GraphQL */ `subscription OnDeleteTuitionSetting(
  $filter: ModelSubscriptionTuitionSettingFilterInput
  $owner: String
) {
  onDeleteTuitionSetting(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTuitionSettingSubscriptionVariables,
  APITypes.OnDeleteTuitionSettingSubscription
>;
export const onDeleteUser =
  /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteUserSubscriptionVariables,
    APITypes.OnDeleteUserSubscription
  >;
export const onUpdateAnalyticsEvent = /* GraphQL */ `subscription OnUpdateAnalyticsEvent(
  $filter: ModelSubscriptionAnalyticsEventFilterInput
) {
  onUpdateAnalyticsEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAnalyticsEventSubscriptionVariables,
  APITypes.OnUpdateAnalyticsEventSubscription
>;
export const onUpdateApiKey =
  /* GraphQL */ `subscription OnUpdateApiKey($filter: ModelSubscriptionApiKeyFilterInput) {
  onUpdateApiKey(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateApiKeySubscriptionVariables,
    APITypes.OnUpdateApiKeySubscription
  >;
export const onUpdateApiKeyRotation = /* GraphQL */ `subscription OnUpdateApiKeyRotation(
  $filter: ModelSubscriptionApiKeyRotationFilterInput
) {
  onUpdateApiKeyRotation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApiKeyRotationSubscriptionVariables,
  APITypes.OnUpdateApiKeyRotationSubscription
>;
export const onUpdateApiKeyUsage = /* GraphQL */ `subscription OnUpdateApiKeyUsage(
  $filter: ModelSubscriptionApiKeyUsageFilterInput
) {
  onUpdateApiKeyUsage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApiKeyUsageSubscriptionVariables,
  APITypes.OnUpdateApiKeyUsageSubscription
>;
export const onUpdateAuditLog =
  /* GraphQL */ `subscription OnUpdateAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
  onUpdateAuditLog(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateAuditLogSubscriptionVariables,
    APITypes.OnUpdateAuditLogSubscription
  >;
export const onUpdateCoachPayout = /* GraphQL */ `subscription OnUpdateCoachPayout(
  $filter: ModelSubscriptionCoachPayoutFilterInput
  $owner: String
) {
  onUpdateCoachPayout(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCoachPayoutSubscriptionVariables,
  APITypes.OnUpdateCoachPayoutSubscription
>;
export const onUpdateDescriptor = /* GraphQL */ `subscription OnUpdateDescriptor(
  $filter: ModelSubscriptionDescriptorFilterInput
) {
  onUpdateDescriptor(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDescriptorSubscriptionVariables,
  APITypes.OnUpdateDescriptorSubscription
>;
export const onUpdateDocumentCategory = /* GraphQL */ `subscription OnUpdateDocumentCategory(
  $filter: ModelSubscriptionDocumentCategoryFilterInput
) {
  onUpdateDocumentCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDocumentCategorySubscriptionVariables,
  APITypes.OnUpdateDocumentCategorySubscription
>;
export const onUpdateEducationOrganization =
  /* GraphQL */ `subscription OnUpdateEducationOrganization(
  $filter: ModelSubscriptionEducationOrganizationFilterInput
) {
  onUpdateEducationOrganization(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateEducationOrganizationSubscriptionVariables,
    APITypes.OnUpdateEducationOrganizationSubscription
  >;
export const onUpdateEnrollment = /* GraphQL */ `subscription OnUpdateEnrollment(
  $filter: ModelSubscriptionEnrollmentFilterInput
) {
  onUpdateEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEnrollmentSubscriptionVariables,
  APITypes.OnUpdateEnrollmentSubscription
>;
export const onUpdateEvent = /* GraphQL */ `subscription OnUpdateEvent(
  $filter: ModelSubscriptionEventFilterInput
  $owner: String
) {
  onUpdateEvent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEventSubscriptionVariables,
  APITypes.OnUpdateEventSubscription
>;
export const onUpdateEventRegistration = /* GraphQL */ `subscription OnUpdateEventRegistration(
  $filter: ModelSubscriptionEventRegistrationFilterInput
  $owner: String
) {
  onUpdateEventRegistration(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEventRegistrationSubscriptionVariables,
  APITypes.OnUpdateEventRegistrationSubscription
>;
export const onUpdateInvitation = /* GraphQL */ `subscription OnUpdateInvitation(
  $filter: ModelSubscriptionInvitationFilterInput
) {
  onUpdateInvitation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInvitationSubscriptionVariables,
  APITypes.OnUpdateInvitationSubscription
>;
export const onUpdateLLCIncorporation = /* GraphQL */ `subscription OnUpdateLLCIncorporation(
  $filter: ModelSubscriptionLLCIncorporationFilterInput
  $owner: String
) {
  onUpdateLLCIncorporation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLLCIncorporationSubscriptionVariables,
  APITypes.OnUpdateLLCIncorporationSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onUpdateMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onUpdateNotification(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onUpdateOnboardingProgress = /* GraphQL */ `subscription OnUpdateOnboardingProgress(
  $filter: ModelSubscriptionOnboardingProgressFilterInput
) {
  onUpdateOnboardingProgress(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOnboardingProgressSubscriptionVariables,
  APITypes.OnUpdateOnboardingProgressSubscription
>;
export const onUpdateParent = /* GraphQL */ `subscription OnUpdateParent(
  $filter: ModelSubscriptionParentFilterInput
  $owner: String
) {
  onUpdateParent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateParentSubscriptionVariables,
  APITypes.OnUpdateParentSubscription
>;
export const onUpdatePaymentRecord = /* GraphQL */ `subscription OnUpdatePaymentRecord(
  $filter: ModelSubscriptionPaymentRecordFilterInput
  $owner: String
) {
  onUpdatePaymentRecord(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePaymentRecordSubscriptionVariables,
  APITypes.OnUpdatePaymentRecordSubscription
>;
export const onUpdateProfile =
  /* GraphQL */ `subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
  onUpdateProfile(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateProfileSubscriptionVariables,
    APITypes.OnUpdateProfileSubscription
  >;
export const onUpdateQuiz =
  /* GraphQL */ `subscription OnUpdateQuiz($filter: ModelSubscriptionQuizFilterInput) {
  onUpdateQuiz(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateQuizSubscriptionVariables,
    APITypes.OnUpdateQuizSubscription
  >;
export const onUpdateQuizAttempt = /* GraphQL */ `subscription OnUpdateQuizAttempt(
  $filter: ModelSubscriptionQuizAttemptFilterInput
  $owner: String
) {
  onUpdateQuizAttempt(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuizAttemptSubscriptionVariables,
  APITypes.OnUpdateQuizAttemptSubscription
>;
export const onUpdateSchool =
  /* GraphQL */ `subscription OnUpdateSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onUpdateSchool(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateSchoolSubscriptionVariables,
    APITypes.OnUpdateSchoolSubscription
  >;
export const onUpdateSession = /* GraphQL */ `subscription OnUpdateSession(
  $filter: ModelSubscriptionSessionFilterInput
  $owner: String
) {
  onUpdateSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSessionSubscriptionVariables,
  APITypes.OnUpdateSessionSubscription
>;
export const onUpdateStaff = /* GraphQL */ `subscription OnUpdateStaff(
  $filter: ModelSubscriptionStaffFilterInput
  $owner: String
) {
  onUpdateStaff(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStaffSubscriptionVariables,
  APITypes.OnUpdateStaffSubscription
>;
export const onUpdateStaffSchoolAssociation =
  /* GraphQL */ `subscription OnUpdateStaffSchoolAssociation(
  $filter: ModelSubscriptionStaffSchoolAssociationFilterInput
) {
  onUpdateStaffSchoolAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateStaffSchoolAssociationSubscriptionVariables,
    APITypes.OnUpdateStaffSchoolAssociationSubscription
  >;
export const onUpdateStudent =
  /* GraphQL */ `subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onUpdateStudent(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateStudentSubscriptionVariables,
    APITypes.OnUpdateStudentSubscription
  >;
export const onUpdateStudentDocument = /* GraphQL */ `subscription OnUpdateStudentDocument(
  $filter: ModelSubscriptionStudentDocumentFilterInput
) {
  onUpdateStudentDocument(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStudentDocumentSubscriptionVariables,
  APITypes.OnUpdateStudentDocumentSubscription
>;
export const onUpdateStudentEducationOrganizationResponsib1c1df =
  /* GraphQL */ `subscription OnUpdateStudentEducationOrganizationResponsib1c1df(
  $filter: ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput
) {
  onUpdateStudentEducationOrganizationResponsib1c1df(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateStudentEducationOrganizationResponsib1c1dfSubscriptionVariables,
    APITypes.OnUpdateStudentEducationOrganizationResponsib1c1dfSubscription
  >;
export const onUpdateStudentParentAssociation =
  /* GraphQL */ `subscription OnUpdateStudentParentAssociation(
  $filter: ModelSubscriptionStudentParentAssociationFilterInput
) {
  onUpdateStudentParentAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateStudentParentAssociationSubscriptionVariables,
    APITypes.OnUpdateStudentParentAssociationSubscription
  >;
export const onUpdateStudentSchoolAssociation =
  /* GraphQL */ `subscription OnUpdateStudentSchoolAssociation(
  $filter: ModelSubscriptionStudentSchoolAssociationFilterInput
) {
  onUpdateStudentSchoolAssociation(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateStudentSchoolAssociationSubscriptionVariables,
    APITypes.OnUpdateStudentSchoolAssociationSubscription
  >;
export const onUpdateTuitionSetting = /* GraphQL */ `subscription OnUpdateTuitionSetting(
  $filter: ModelSubscriptionTuitionSettingFilterInput
  $owner: String
) {
  onUpdateTuitionSetting(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTuitionSettingSubscriptionVariables,
  APITypes.OnUpdateTuitionSettingSubscription
>;
export const onUpdateUser =
  /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateUserSubscriptionVariables,
    APITypes.OnUpdateUserSubscription
  >;
