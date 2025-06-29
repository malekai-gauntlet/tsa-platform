/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAnalyticsEvent = /* GraphQL */ `query GetAnalyticsEvent($id: ID!) {
  getAnalyticsEvent(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAnalyticsEventQueryVariables,
  APITypes.GetAnalyticsEventQuery
>;
export const getApiKey = /* GraphQL */ `query GetApiKey($id: ID!) {
  getApiKey(id: $id) {
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
` as GeneratedQuery<APITypes.GetApiKeyQueryVariables, APITypes.GetApiKeyQuery>;
export const getApiKeyRotation = /* GraphQL */ `query GetApiKeyRotation($id: ID!) {
  getApiKeyRotation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetApiKeyRotationQueryVariables,
  APITypes.GetApiKeyRotationQuery
>;
export const getApiKeyUsage = /* GraphQL */ `query GetApiKeyUsage($id: ID!) {
  getApiKeyUsage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetApiKeyUsageQueryVariables,
  APITypes.GetApiKeyUsageQuery
>;
export const getAuditLog = /* GraphQL */ `query GetAuditLog($id: ID!) {
  getAuditLog(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAuditLogQueryVariables,
  APITypes.GetAuditLogQuery
>;
export const getCoachPayout = /* GraphQL */ `query GetCoachPayout($id: ID!) {
  getCoachPayout(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCoachPayoutQueryVariables,
  APITypes.GetCoachPayoutQuery
>;
export const getDescriptor = /* GraphQL */ `query GetDescriptor($id: ID!) {
  getDescriptor(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetDescriptorQueryVariables,
  APITypes.GetDescriptorQuery
>;
export const getDocumentCategory = /* GraphQL */ `query GetDocumentCategory($id: ID!) {
  getDocumentCategory(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetDocumentCategoryQueryVariables,
  APITypes.GetDocumentCategoryQuery
>;
export const getEducationOrganization = /* GraphQL */ `query GetEducationOrganization($id: ID!) {
  getEducationOrganization(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetEducationOrganizationQueryVariables,
  APITypes.GetEducationOrganizationQuery
>;
export const getEnrollment = /* GraphQL */ `query GetEnrollment($id: ID!) {
  getEnrollment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetEnrollmentQueryVariables,
  APITypes.GetEnrollmentQuery
>;
export const getEvent = /* GraphQL */ `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
` as GeneratedQuery<APITypes.GetEventQueryVariables, APITypes.GetEventQuery>;
export const getEventRegistration = /* GraphQL */ `query GetEventRegistration($id: ID!) {
  getEventRegistration(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetEventRegistrationQueryVariables,
  APITypes.GetEventRegistrationQuery
>;
export const getInvitation = /* GraphQL */ `query GetInvitation($id: ID!) {
  getInvitation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInvitationQueryVariables,
  APITypes.GetInvitationQuery
>;
export const getLLCIncorporation = /* GraphQL */ `query GetLLCIncorporation($id: ID!) {
  getLLCIncorporation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLLCIncorporationQueryVariables,
  APITypes.GetLLCIncorporationQuery
>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const getOnboardingProgress = /* GraphQL */ `query GetOnboardingProgress($id: ID!) {
  getOnboardingProgress(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetOnboardingProgressQueryVariables,
  APITypes.GetOnboardingProgressQuery
>;
export const getParent = /* GraphQL */ `query GetParent($id: ID!) {
  getParent(id: $id) {
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
` as GeneratedQuery<APITypes.GetParentQueryVariables, APITypes.GetParentQuery>;
export const getPaymentRecord = /* GraphQL */ `query GetPaymentRecord($id: ID!) {
  getPaymentRecord(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPaymentRecordQueryVariables,
  APITypes.GetPaymentRecordQuery
>;
export const getProfile = /* GraphQL */ `query GetProfile($id: ID!) {
  getProfile(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProfileQueryVariables,
  APITypes.GetProfileQuery
>;
export const getQuiz = /* GraphQL */ `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
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
` as GeneratedQuery<APITypes.GetQuizQueryVariables, APITypes.GetQuizQuery>;
export const getQuizAttempt = /* GraphQL */ `query GetQuizAttempt($id: ID!) {
  getQuizAttempt(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetQuizAttemptQueryVariables,
  APITypes.GetQuizAttemptQuery
>;
export const getSchool = /* GraphQL */ `query GetSchool($id: ID!) {
  getSchool(id: $id) {
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
` as GeneratedQuery<APITypes.GetSchoolQueryVariables, APITypes.GetSchoolQuery>;
export const getSession = /* GraphQL */ `query GetSession($id: ID!) {
  getSession(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSessionQueryVariables,
  APITypes.GetSessionQuery
>;
export const getStaff = /* GraphQL */ `query GetStaff($id: ID!) {
  getStaff(id: $id) {
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
` as GeneratedQuery<APITypes.GetStaffQueryVariables, APITypes.GetStaffQuery>;
export const getStaffSchoolAssociation = /* GraphQL */ `query GetStaffSchoolAssociation($id: ID!) {
  getStaffSchoolAssociation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStaffSchoolAssociationQueryVariables,
  APITypes.GetStaffSchoolAssociationQuery
>;
export const getStudent = /* GraphQL */ `query GetStudent($id: ID!) {
  getStudent(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentQueryVariables,
  APITypes.GetStudentQuery
>;
export const getStudentDocument = /* GraphQL */ `query GetStudentDocument($id: ID!) {
  getStudentDocument(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentDocumentQueryVariables,
  APITypes.GetStudentDocumentQuery
>;
export const getStudentEducationOrganizationResponsibleContactPerson = /* GraphQL */ `query GetStudentEducationOrganizationResponsibleContactPerson($id: ID!) {
  getStudentEducationOrganizationResponsibleContactPerson(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentEducationOrganizationResponsibleContactPersonQueryVariables,
  APITypes.GetStudentEducationOrganizationResponsibleContactPersonQuery
>;
export const getStudentParentAssociation = /* GraphQL */ `query GetStudentParentAssociation($id: ID!) {
  getStudentParentAssociation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentParentAssociationQueryVariables,
  APITypes.GetStudentParentAssociationQuery
>;
export const getStudentSchoolAssociation = /* GraphQL */ `query GetStudentSchoolAssociation($id: ID!) {
  getStudentSchoolAssociation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentSchoolAssociationQueryVariables,
  APITypes.GetStudentSchoolAssociationQuery
>;
export const getTuitionSetting = /* GraphQL */ `query GetTuitionSetting($id: ID!) {
  getTuitionSetting(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTuitionSettingQueryVariables,
  APITypes.GetTuitionSettingQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listAnalyticsEvents = /* GraphQL */ `query ListAnalyticsEvents(
  $filter: ModelAnalyticsEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnalyticsEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAnalyticsEventsQueryVariables,
  APITypes.ListAnalyticsEventsQuery
>;
export const listApiKeyRotations = /* GraphQL */ `query ListApiKeyRotations(
  $filter: ModelApiKeyRotationFilterInput
  $limit: Int
  $nextToken: String
) {
  listApiKeyRotations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApiKeyRotationsQueryVariables,
  APITypes.ListApiKeyRotationsQuery
>;
export const listApiKeyUsages = /* GraphQL */ `query ListApiKeyUsages(
  $filter: ModelApiKeyUsageFilterInput
  $limit: Int
  $nextToken: String
) {
  listApiKeyUsages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApiKeyUsagesQueryVariables,
  APITypes.ListApiKeyUsagesQuery
>;
export const listApiKeys = /* GraphQL */ `query ListApiKeys(
  $filter: ModelApiKeyFilterInput
  $limit: Int
  $nextToken: String
) {
  listApiKeys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApiKeysQueryVariables,
  APITypes.ListApiKeysQuery
>;
export const listAuditLogs = /* GraphQL */ `query ListAuditLogs(
  $filter: ModelAuditLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listAuditLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAuditLogsQueryVariables,
  APITypes.ListAuditLogsQuery
>;
export const listCoachPayouts = /* GraphQL */ `query ListCoachPayouts(
  $filter: ModelCoachPayoutFilterInput
  $limit: Int
  $nextToken: String
) {
  listCoachPayouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoachPayoutsQueryVariables,
  APITypes.ListCoachPayoutsQuery
>;
export const listDescriptors = /* GraphQL */ `query ListDescriptors(
  $filter: ModelDescriptorFilterInput
  $limit: Int
  $nextToken: String
) {
  listDescriptors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDescriptorsQueryVariables,
  APITypes.ListDescriptorsQuery
>;
export const listDocumentCategories = /* GraphQL */ `query ListDocumentCategories(
  $filter: ModelDocumentCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocumentCategories(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDocumentCategoriesQueryVariables,
  APITypes.ListDocumentCategoriesQuery
>;
export const listEducationOrganizations = /* GraphQL */ `query ListEducationOrganizations(
  $filter: ModelEducationOrganizationFilterInput
  $limit: Int
  $nextToken: String
) {
  listEducationOrganizations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEducationOrganizationsQueryVariables,
  APITypes.ListEducationOrganizationsQuery
>;
export const listEnrollments = /* GraphQL */ `query ListEnrollments(
  $filter: ModelEnrollmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listEnrollments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEnrollmentsQueryVariables,
  APITypes.ListEnrollmentsQuery
>;
export const listEventRegistrations = /* GraphQL */ `query ListEventRegistrations(
  $filter: ModelEventRegistrationFilterInput
  $limit: Int
  $nextToken: String
) {
  listEventRegistrations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEventRegistrationsQueryVariables,
  APITypes.ListEventRegistrationsQuery
>;
export const listEvents = /* GraphQL */ `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEventsQueryVariables,
  APITypes.ListEventsQuery
>;
export const listInvitations = /* GraphQL */ `query ListInvitations(
  $filter: ModelInvitationFilterInput
  $limit: Int
  $nextToken: String
) {
  listInvitations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInvitationsQueryVariables,
  APITypes.ListInvitationsQuery
>;
export const listLLCIncorporations = /* GraphQL */ `query ListLLCIncorporations(
  $filter: ModelLLCIncorporationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLLCIncorporations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLLCIncorporationsQueryVariables,
  APITypes.ListLLCIncorporationsQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const listOnboardingProgresses = /* GraphQL */ `query ListOnboardingProgresses(
  $filter: ModelOnboardingProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  listOnboardingProgresses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOnboardingProgressesQueryVariables,
  APITypes.ListOnboardingProgressesQuery
>;
export const listParents = /* GraphQL */ `query ListParents(
  $filter: ModelParentFilterInput
  $limit: Int
  $nextToken: String
) {
  listParents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListParentsQueryVariables,
  APITypes.ListParentsQuery
>;
export const listPaymentRecords = /* GraphQL */ `query ListPaymentRecords(
  $filter: ModelPaymentRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listPaymentRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentRecordsQueryVariables,
  APITypes.ListPaymentRecordsQuery
>;
export const listProfiles = /* GraphQL */ `query ListProfiles(
  $filter: ModelProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfilesQueryVariables,
  APITypes.ListProfilesQuery
>;
export const listQuizAttempts = /* GraphQL */ `query ListQuizAttempts(
  $filter: ModelQuizAttemptFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizAttempts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuizAttemptsQueryVariables,
  APITypes.ListQuizAttemptsQuery
>;
export const listQuizzes = /* GraphQL */ `query ListQuizzes(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizzes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuizzesQueryVariables,
  APITypes.ListQuizzesQuery
>;
export const listSchools = /* GraphQL */ `query ListSchools(
  $filter: ModelSchoolFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSchoolsQueryVariables,
  APITypes.ListSchoolsQuery
>;
export const listSessions = /* GraphQL */ `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionsQueryVariables,
  APITypes.ListSessionsQuery
>;
export const listStaff = /* GraphQL */ `query ListStaff(
  $filter: ModelStaffFilterInput
  $limit: Int
  $nextToken: String
) {
  listStaff(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListStaffQueryVariables, APITypes.ListStaffQuery>;
export const listStaffSchoolAssociations = /* GraphQL */ `query ListStaffSchoolAssociations(
  $filter: ModelStaffSchoolAssociationFilterInput
  $limit: Int
  $nextToken: String
) {
  listStaffSchoolAssociations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStaffSchoolAssociationsQueryVariables,
  APITypes.ListStaffSchoolAssociationsQuery
>;
export const listStudentDocuments = /* GraphQL */ `query ListStudentDocuments(
  $filter: ModelStudentDocumentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudentDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentDocumentsQueryVariables,
  APITypes.ListStudentDocumentsQuery
>;
export const listStudentEducationOrganizationResponsibleContactPeople = /* GraphQL */ `query ListStudentEducationOrganizationResponsibleContactPeople(
  $filter: ModelStudentEducationOrganizationResponsibleContactPersonFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudentEducationOrganizationResponsibleContactPeople(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentEducationOrganizationResponsibleContactPeopleQueryVariables,
  APITypes.ListStudentEducationOrganizationResponsibleContactPeopleQuery
>;
export const listStudentParentAssociations = /* GraphQL */ `query ListStudentParentAssociations(
  $filter: ModelStudentParentAssociationFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudentParentAssociations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentParentAssociationsQueryVariables,
  APITypes.ListStudentParentAssociationsQuery
>;
export const listStudentSchoolAssociations = /* GraphQL */ `query ListStudentSchoolAssociations(
  $filter: ModelStudentSchoolAssociationFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudentSchoolAssociations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentSchoolAssociationsQueryVariables,
  APITypes.ListStudentSchoolAssociationsQuery
>;
export const listStudents = /* GraphQL */ `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentsQueryVariables,
  APITypes.ListStudentsQuery
>;
export const listTuitionSettings = /* GraphQL */ `query ListTuitionSettings(
  $filter: ModelTuitionSettingFilterInput
  $limit: Int
  $nextToken: String
) {
  listTuitionSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTuitionSettingsQueryVariables,
  APITypes.ListTuitionSettingsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
