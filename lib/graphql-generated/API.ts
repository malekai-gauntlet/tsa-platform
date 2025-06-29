/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AnalyticsEvent = {
  __typename: "AnalyticsEvent",
  createdAt?: string | null,
  eventName: string,
  id: string,
  ipAddress?: string | null,
  properties?: string | null,
  referrer?: string | null,
  sessionId?: string | null,
  timestamp: string,
  updatedAt: string,
  userAgent?: string | null,
  userId?: string | null,
  utmCampaign?: string | null,
  utmContent?: string | null,
  utmMedium?: string | null,
  utmSource?: string | null,
  utmTerm?: string | null,
};

export type ApiKey = {
  __typename: "ApiKey",
  createdAt?: string | null,
  createdBy: string,
  description?: string | null,
  expiresAt?: string | null,
  id: string,
  ipWhitelist?: Array< string | null > | null,
  isActive?: boolean | null,
  keyHash: string,
  keyPrefix: string,
  lastRotatedAt?: string | null,
  lastSecurityIncident?: string | null,
  lastUsedAt?: string | null,
  metadata?: string | null,
  name: string,
  permissions?: Array< string | null > | null,
  rateLimitDaily?: number | null,
  rateLimitMinute?: number | null,
  securityIncidents?: number | null,
  updatedAt?: string | null,
  usageCount?: number | null,
};

export type ApiKeyRotation = {
  __typename: "ApiKeyRotation",
  createdAt?: string | null,
  gracePeriodEnd?: string | null,
  id: string,
  newKeyId: string,
  oldKeyDeactivated?: boolean | null,
  oldKeyId: string,
  reason?: string | null,
  rotatedBy: string,
  rotationType?: ApiKeyRotationRotationType | null,
  updatedAt: string,
};

export enum ApiKeyRotationRotationType {
  MANUAL = "MANUAL",
  SCHEDULED = "SCHEDULED",
  SECURITY_INCIDENT = "SECURITY_INCIDENT",
}


export type ApiKeyUsage = {
  __typename: "ApiKeyUsage",
  createdAt?: string | null,
  endpoint: string,
  id: string,
  ipAddress?: string | null,
  keyId: string,
  keyPrefix: string,
  metadata?: string | null,
  method?: string | null,
  permissions?: Array< string | null > | null,
  rateLimitHit?: boolean | null,
  requestSize?: number | null,
  responseSize?: number | null,
  responseStatus?: number | null,
  responseTime?: number | null,
  securityViolation?: string | null,
  timestamp: string,
  updatedAt: string,
  userAgent?: string | null,
};

export type AuditLog = {
  __typename: "AuditLog",
  action: string,
  changes?: string | null,
  createdAt: string,
  id: string,
  ipAddress?: string | null,
  metadata?: string | null,
  resource: string,
  resourceId?: string | null,
  timestamp: string,
  updatedAt: string,
  userAgent?: string | null,
  userId?: string | null,
};

export type CoachPayout = {
  __typename: "CoachPayout",
  coachEmail: string,
  createdAt?: string | null,
  description?: string | null,
  id: string,
  metadata?: string | null,
  owner?: string | null,
  payoutAmount: number,
  payoutDate?: string | null,
  payoutStatus?: CoachPayoutPayoutStatus | null,
  payoutType?: CoachPayoutPayoutType | null,
  stripeConnectAccountId: string,
  stripePayout?: string | null,
  updatedAt?: string | null,
};

export enum CoachPayoutPayoutStatus {
  failed = "failed",
  paid = "paid",
  pending = "pending",
  processing = "processing",
}


export enum CoachPayoutPayoutType {
  automated = "automated",
  manual = "manual",
  monthly = "monthly",
}


export type Descriptor = {
  __typename: "Descriptor",
  codeValue: string,
  createdAt?: string | null,
  description?: string | null,
  descriptorId: number,
  effectiveBeginDate?: string | null,
  effectiveEndDate?: string | null,
  id: string,
  namespace: string,
  priorDescriptorId?: number | null,
  shortDescription: string,
  updatedAt?: string | null,
};

export type DocumentCategory = {
  __typename: "DocumentCategory",
  categoryDescription?: string | null,
  categoryName: string,
  createdAt?: string | null,
  documentCategoryId: number,
  id: string,
  isActive?: boolean | null,
  isRequired?: boolean | null,
  sortOrder?: number | null,
  updatedAt?: string | null,
};

export type EducationOrganization = {
  __typename: "EducationOrganization",
  addresses?: string | null,
  createdAt?: string | null,
  educationOrganizationId: number,
  etag?: string | null,
  id: string,
  lastModifiedDate?: string | null,
  nameOfInstitution: string,
  operationalStatus?: string | null,
  shortNameOfInstitution?: string | null,
  telephones?: string | null,
  updatedAt?: string | null,
  webSite?: string | null,
};

export type Enrollment = {
  __typename: "Enrollment",
  academicYear?: string | null,
  applicationData?: string | null,
  coachName?: string | null,
  createdAt?: string | null,
  currentStep?: number | null,
  documents?: string | null,
  enrollmentType?: EnrollmentEnrollmentType | null,
  id: string,
  parentId: string,
  schoolPreferences?: string | null,
  sportInterest?: string | null,
  startDate?: string | null,
  status?: EnrollmentStatus | null,
  studentAge?: number | null,
  studentGrade?: string | null,
  studentName: string,
  timelineStatus?: EnrollmentTimelineStatus | null,
  timelineSteps?: string | null,
  totalSteps?: number | null,
  tuitionPlan?: string | null,
  updatedAt?: string | null,
};

export enum EnrollmentEnrollmentType {
  AFTER_SCHOOL = "AFTER_SCHOOL",
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
}


export enum EnrollmentStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  WAITLIST = "WAITLIST",
}


export enum EnrollmentTimelineStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
}


export type Event = {
  __typename: "Event",
  address?: string | null,
  ageGroups?: Array< string | null > | null,
  capacity?: number | null,
  coachId: string,
  coachName?: string | null,
  createdAt?: string | null,
  currency?: string | null,
  description?: string | null,
  endDate: string,
  equipment?: Array< string | null > | null,
  eventType?: EventEventType | null,
  googleCalendarEventId?: string | null,
  googleCalendarLastSynced?: string | null,
  googleCalendarSyncEnabled?: boolean | null,
  googleMeetUrl?: string | null,
  id: string,
  images?: Array< string | null > | null,
  isOnline?: boolean | null,
  isPublic?: boolean | null,
  location?: string | null,
  meetingUrl?: string | null,
  owner?: string | null,
  price?: number | null,
  registeredCount?: number | null,
  registrationDeadline?: string | null,
  requirements?: Array< string | null > | null,
  shortDescription?: string | null,
  skillLevel?: EventSkillLevel | null,
  startDate: string,
  status?: EventStatus | null,
  tags?: Array< string | null > | null,
  timezone?: string | null,
  title: string,
  updatedAt?: string | null,
  venue?: string | null,
};

export enum EventEventType {
  BOOTCAMP = "BOOTCAMP",
  CAMP = "CAMP",
  COMPETITION = "COMPETITION",
  TOURNAMENT = "TOURNAMENT",
  TRAINING = "TRAINING",
  WORKSHOP = "WORKSHOP",
}


export enum EventSkillLevel {
  ADVANCED = "ADVANCED",
  ALL_LEVELS = "ALL_LEVELS",
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
}


export enum EventStatus {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}


export type EventRegistration = {
  __typename: "EventRegistration",
  attendanceStatus?: EventRegistrationAttendanceStatus | null,
  createdAt?: string | null,
  eventId: string,
  id: string,
  notes?: string | null,
  owner?: string | null,
  paymentStatus?: EventRegistrationPaymentStatus | null,
  registrationData?: string | null,
  registrationStatus?: EventRegistrationRegistrationStatus | null,
  studentName?: string | null,
  updatedAt?: string | null,
  userId: string,
};

export enum EventRegistrationAttendanceStatus {
  ATTENDED = "ATTENDED",
  NO_SHOW = "NO_SHOW",
  REGISTERED = "REGISTERED",
}


export enum EventRegistrationPaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
  REFUNDED = "REFUNDED",
}


export enum EventRegistrationRegistrationStatus {
  CANCELLED = "CANCELLED",
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  WAITLIST = "WAITLIST",
}


export type Invitation = {
  __typename: "Invitation",
  acceptedAt?: string | null,
  bio?: string | null,
  city?: string | null,
  createdAt?: string | null,
  email: string,
  expiresAt: string,
  firstName?: string | null,
  id: string,
  invitationType?: InvitationInvitationType | null,
  invitedBy: string,
  lastName?: string | null,
  lastSentAt?: string | null,
  message?: string | null,
  phone?: string | null,
  schoolName?: string | null,
  schoolType?: string | null,
  sport?: string | null,
  state?: string | null,
  status?: InvitationStatus | null,
  token: string,
  updatedAt?: string | null,
};

export enum InvitationInvitationType {
  COACH = "COACH",
  PARENT = "PARENT",
}


export enum InvitationStatus {
  ACCEPTED = "ACCEPTED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
  REVOKED = "REVOKED",
}


export type LLCIncorporation = {
  __typename: "LLCIncorporation",
  businessName: string,
  businessType?: LLCIncorporationBusinessType | null,
  coachId: string,
  completedAt?: string | null,
  cost?: number | null,
  createdAt?: string | null,
  documents?: string | null,
  filedAt?: string | null,
  filingData?: string | null,
  id: string,
  owner?: string | null,
  state: string,
  status?: LLCIncorporationStatus | null,
  updatedAt?: string | null,
};

export enum LLCIncorporationBusinessType {
  CORPORATION = "CORPORATION",
  LLC = "LLC",
  PARTNERSHIP = "PARTNERSHIP",
}


export enum LLCIncorporationStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
}


export type Message = {
  __typename: "Message",
  attachments?: string | null,
  content: string,
  createdAt?: string | null,
  id: string,
  messageType?: MessageMessageType | null,
  metadata?: string | null,
  owner?: string | null,
  priority?: MessagePriority | null,
  readAt?: string | null,
  recipientId: string,
  senderId: string,
  sentAt?: string | null,
  status?: MessageStatus | null,
  subject?: string | null,
  updatedAt: string,
};

export enum MessageMessageType {
  BROADCAST = "BROADCAST",
  DIRECT = "DIRECT",
  SYSTEM = "SYSTEM",
}


export enum MessagePriority {
  HIGH = "HIGH",
  LOW = "LOW",
  NORMAL = "NORMAL",
  URGENT = "URGENT",
}


export enum MessageStatus {
  DELIVERED = "DELIVERED",
  DRAFT = "DRAFT",
  READ = "READ",
  SENT = "SENT",
}


export type Notification = {
  __typename: "Notification",
  content: string,
  createdAt?: string | null,
  deliveryChannels?: string | null,
  id: string,
  metadata?: string | null,
  notificationType?: NotificationNotificationType | null,
  owner?: string | null,
  priority?: NotificationPriority | null,
  scheduledFor?: string | null,
  sentAt?: string | null,
  status?: NotificationStatus | null,
  title: string,
  updatedAt: string,
  userId: string,
};

export enum NotificationNotificationType {
  EMAIL = "EMAIL",
  IN_APP = "IN_APP",
  PUSH = "PUSH",
  SMS = "SMS",
}


export enum NotificationPriority {
  HIGH = "HIGH",
  LOW = "LOW",
  NORMAL = "NORMAL",
}


export enum NotificationStatus {
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  SENT = "SENT",
}


export type OnboardingProgress = {
  __typename: "OnboardingProgress",
  completedSteps?: Array< string | null > | null,
  createdAt?: string | null,
  currentStep?: OnboardingProgressCurrentStep | null,
  email: string,
  id: string,
  invitationBased?: boolean | null,
  invitationId?: string | null,
  lastUpdated?: string | null,
  stepData?: string | null,
  updatedAt?: string | null,
  userId: string,
};

export enum OnboardingProgressCurrentStep {
  AGREEMENTS = "AGREEMENTS",
  COMPLETE = "COMPLETE",
  FINALIZE = "FINALIZE",
  PERSONAL_INFO = "PERSONAL_INFO",
  ROLE_EXPERIENCE = "ROLE_EXPERIENCE",
  SCHOOL_FOCUS = "SCHOOL_FOCUS",
  SCHOOL_NAME = "SCHOOL_NAME",
  SCHOOL_SETUP = "SCHOOL_SETUP",
  STUDENTS = "STUDENTS",
  STUDENT_PLANNING = "STUDENT_PLANNING",
}


export type Parent = {
  __typename: "Parent",
  backgroundInformation?: string | null,
  createdAt?: string | null,
  employerName?: string | null,
  firstName: string,
  generationCodeSuffix?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id: string,
  isActive?: boolean | null,
  lastSurname: string,
  loginId?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  owner?: string | null,
  parentUSI: number,
  parentUniqueId: string,
  personalEmailAddress?: string | null,
  personalTitlePrefix?: string | null,
  professionDescriptor?: string | null,
  races?: string | null,
  sex?: string | null,
  updatedAt?: string | null,
  workEmailAddress?: string | null,
};

export type PaymentRecord = {
  __typename: "PaymentRecord",
  applicationId: string,
  coachEmail: string,
  coachPayoutAmount?: number | null,
  createdAt?: string | null,
  depositAmount: number,
  id: string,
  isMarketplacePayment?: boolean | null,
  lastPaymentDate?: string | null,
  nextPaymentDue?: string | null,
  owner?: string | null,
  parentEmail: string,
  paymentHistory?: string | null,
  paymentPlan?: PaymentRecordPaymentPlan | null,
  paymentStatus?: PaymentRecordPaymentStatus | null,
  platformFeeAmount?: number | null,
  stripeConnectAccountId?: string | null,
  stripeCustomerId?: string | null,
  stripePaymentIntentId?: string | null,
  stripePaymentLinkId?: string | null,
  studentId: string,
  studentName: string,
  totalPaid?: number | null,
  tuitionAmount: number,
  updatedAt?: string | null,
};

export enum PaymentRecordPaymentPlan {
  deposit_only = "deposit_only",
  full = "full",
  monthly = "monthly",
  quarterly = "quarterly",
}


export enum PaymentRecordPaymentStatus {
  deposit_paid = "deposit_paid",
  fully_paid = "fully_paid",
  overdue = "overdue",
  pending = "pending",
}


export type Profile = {
  __typename: "Profile",
  address?: string | null,
  backgroundCheckDate?: string | null,
  backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
  bio?: string | null,
  certifications?: Array< string | null > | null,
  createdAt?: string | null,
  emergencyContact?: string | null,
  experience?: string | null,
  id: string,
  marketingProgress?: string | null,
  onboardingComplete?: boolean | null,
  preferences?: string | null,
  profileType?: ProfileProfileType | null,
  specialties?: Array< string | null > | null,
  updatedAt?: string | null,
  userId: string,
  wizardProgress?: string | null,
};

export enum ProfileBackgroundCheckStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}


export enum ProfileProfileType {
  COACH = "COACH",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
}


export type Quiz = {
  __typename: "Quiz",
  category?: string | null,
  createdAt?: string | null,
  createdBy?: string | null,
  description?: string | null,
  difficulty?: QuizDifficulty | null,
  id: string,
  isActive?: boolean | null,
  passingScore?: number | null,
  questions: string,
  timeLimit?: number | null,
  title: string,
  updatedAt?: string | null,
};

export enum QuizDifficulty {
  ADVANCED = "ADVANCED",
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
}


export type QuizAttempt = {
  __typename: "QuizAttempt",
  answers: string,
  completedAt?: string | null,
  createdAt: string,
  id: string,
  metadata?: string | null,
  owner?: string | null,
  passed?: boolean | null,
  quizId: string,
  score?: number | null,
  startedAt: string,
  timeSpent?: number | null,
  updatedAt: string,
  userId: string,
};

export type School = {
  __typename: "School",
  administrativeFundingControl?: string | null,
  charterStatus?: string | null,
  createdAt?: string | null,
  etag?: string | null,
  gradeLevels?: string | null,
  id: string,
  lastModifiedDate?: string | null,
  localEducationAgencyId?: number | null,
  magnetSpecialProgramEmphasisSchool?: string | null,
  schoolCategories?: string | null,
  schoolId: number,
  schoolType?: string | null,
  titleIPartASchoolDesignation?: string | null,
  updatedAt?: string | null,
};

export type Session = {
  __typename: "Session",
  coachId: string,
  createdAt?: string | null,
  duration?: number | null,
  eventId?: string | null,
  feedback?: string | null,
  id: string,
  location?: string | null,
  notes?: string | null,
  owner?: string | null,
  participants?: string | null,
  scheduledDate: string,
  sessionType?: SessionSessionType | null,
  status?: SessionStatus | null,
  updatedAt?: string | null,
};

export enum SessionSessionType {
  ASSESSMENT = "ASSESSMENT",
  GROUP = "GROUP",
  INDIVIDUAL = "INDIVIDUAL",
}


export enum SessionStatus {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  SCHEDULED = "SCHEDULED",
}


export type Staff = {
  __typename: "Staff",
  birthDate?: string | null,
  createdAt?: string | null,
  firstName: string,
  generationCodeSuffix?: string | null,
  highestCompletedLevelOfEducation?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id: string,
  isActive?: boolean | null,
  lastSurname: string,
  loginId?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  owner?: string | null,
  personalEmailAddress?: string | null,
  personalTitlePrefix?: string | null,
  races?: string | null,
  sex?: string | null,
  staffUSI: number,
  staffUniqueId: string,
  updatedAt?: string | null,
  workEmailAddress?: string | null,
  yearsOfPriorProfessionalExperience?: number | null,
};

export type StaffSchoolAssociation = {
  __typename: "StaffSchoolAssociation",
  createdAt?: string | null,
  employmentStatus?: string | null,
  endDate?: string | null,
  hireDate?: string | null,
  id: string,
  programAssignment: string,
  schoolId: number,
  schoolYear?: number | null,
  staffUSI: number,
  updatedAt?: string | null,
};

export type Student = {
  __typename: "Student",
  admissionDate?: string | null,
  applicationDate?: string | null,
  birthCity?: string | null,
  birthCountry?: string | null,
  birthDate?: string | null,
  birthStateAbbreviation?: string | null,
  createdAt?: string | null,
  firstName: string,
  generationCodeSuffix?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id: string,
  lastSurname: string,
  maidenName?: string | null,
  middleName?: string | null,
  personalTitlePrefix?: string | null,
  races?: string | null,
  sex?: string | null,
  studentApplicationStatus?: StudentStudentApplicationStatus | null,
  studentUSI: number,
  studentUniqueId: string,
  updatedAt?: string | null,
};

export enum StudentStudentApplicationStatus {
  ADMITTED = "ADMITTED",
  APPLIED = "APPLIED",
  ENROLLED = "ENROLLED",
  INQUIRY = "INQUIRY",
}


export type StudentDocument = {
  __typename: "StudentDocument",
  createdAt?: string | null,
  documentCategoryId: number,
  documentDescription?: string | null,
  documentHash?: string | null,
  documentTitle: string,
  expirationDate?: string | null,
  fileName?: string | null,
  fileSize?: number | null,
  id: string,
  isConfidential?: boolean | null,
  mimeType?: string | null,
  reviewComments?: string | null,
  reviewDate?: string | null,
  reviewStatus?: StudentDocumentReviewStatus | null,
  reviewedByStaffUSI?: number | null,
  storageLocation?: string | null,
  studentUSI: number,
  submittedByParentUSI?: number | null,
  submittedDate?: string | null,
  updatedAt?: string | null,
};

export enum StudentDocumentReviewStatus {
  APPROVED = "APPROVED",
  NEEDS_REVISION = "NEEDS_REVISION",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}


export type StudentEducationOrganizationResponsibleContactPerson = {
  __typename: "StudentEducationOrganizationResponsibleContactPerson",
  contactAddress?: string | null,
  contactEmailAddress?: string | null,
  contactTelephones?: string | null,
  contactTitle?: string | null,
  createdAt?: string | null,
  educationOrganizationId: number,
  emergencyContactStatus?: boolean | null,
  firstName: string,
  id: string,
  lastSurname: string,
  primaryContactStatus?: boolean | null,
  relation?: string | null,
  studentUSI: number,
  updatedAt?: string | null,
};

export type StudentParentAssociation = {
  __typename: "StudentParentAssociation",
  contactPriority?: number | null,
  contactRestrictions?: string | null,
  createdAt?: string | null,
  custodyStatus?: StudentParentAssociationCustodyStatus | null,
  emergencyContactStatus?: boolean | null,
  id: string,
  legalGuardian?: boolean | null,
  livesWith?: boolean | null,
  parentUSI: number,
  primaryContactStatus?: boolean | null,
  relation?: StudentParentAssociationRelation | null,
  studentUSI: number,
  updatedAt?: string | null,
};

export enum StudentParentAssociationCustodyStatus {
  FULL = "FULL",
  NONE = "NONE",
  PARTIAL = "PARTIAL",
}


export enum StudentParentAssociationRelation {
  Father = "Father",
  Grandfather = "Grandfather",
  Grandmother = "Grandmother",
  Guardian = "Guardian",
  Mother = "Mother",
  Other = "Other",
  Stepfather = "Stepfather",
  Stepmother = "Stepmother",
}


export type StudentSchoolAssociation = {
  __typename: "StudentSchoolAssociation",
  admissionStatus?: string | null,
  applicationStatus?: string | null,
  classOfSchoolYear?: number | null,
  createdAt?: string | null,
  entryDate: string,
  entryGradeLevel?: string | null,
  entryType?: string | null,
  exitWithdrawDate?: string | null,
  exitWithdrawType?: string | null,
  id: string,
  repeatGradeIndicator?: boolean | null,
  schoolId: number,
  schoolYear: number,
  studentUSI: number,
  updatedAt?: string | null,
};

export type TuitionSetting = {
  __typename: "TuitionSetting",
  allowPaymentPlans?: boolean | null,
  coachEmail: string,
  coachId: string,
  createdAt?: string | null,
  currency?: string | null,
  defaultDeposit: number,
  defaultTuition: number,
  id: string,
  marketplaceEnabled?: boolean | null,
  owner?: string | null,
  paymentPlanOptions: string,
  platformFeePercent?: number | null,
  stripeConnectAccountId?: string | null,
  updatedAt?: string | null,
};

export type User = {
  __typename: "User",
  amplifyUserId?: string | null,
  createdAt?: string | null,
  email: string,
  firstName?: string | null,
  id: string,
  lastLoginAt?: string | null,
  lastName?: string | null,
  parentUSI?: number | null,
  phone?: string | null,
  role?: UserRole | null,
  staffUSI?: number | null,
  status?: UserStatus | null,
  studentUSI?: number | null,
  updatedAt?: string | null,
};

export enum UserRole {
  ADMIN = "ADMIN",
  COACH = "COACH",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
}


export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}


export type ModelAnalyticsEventFilterInput = {
  and?: Array< ModelAnalyticsEventFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  eventName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  ipAddress?: ModelStringInput | null,
  not?: ModelAnalyticsEventFilterInput | null,
  or?: Array< ModelAnalyticsEventFilterInput | null > | null,
  properties?: ModelStringInput | null,
  referrer?: ModelStringInput | null,
  sessionId?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAgent?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  utmCampaign?: ModelStringInput | null,
  utmContent?: ModelStringInput | null,
  utmMedium?: ModelStringInput | null,
  utmSource?: ModelStringInput | null,
  utmTerm?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelAnalyticsEventConnection = {
  __typename: "ModelAnalyticsEventConnection",
  items:  Array<AnalyticsEvent | null >,
  nextToken?: string | null,
};

export type ModelApiKeyRotationFilterInput = {
  and?: Array< ModelApiKeyRotationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  gracePeriodEnd?: ModelStringInput | null,
  id?: ModelIDInput | null,
  newKeyId?: ModelIDInput | null,
  not?: ModelApiKeyRotationFilterInput | null,
  oldKeyDeactivated?: ModelBooleanInput | null,
  oldKeyId?: ModelIDInput | null,
  or?: Array< ModelApiKeyRotationFilterInput | null > | null,
  reason?: ModelStringInput | null,
  rotatedBy?: ModelIDInput | null,
  rotationType?: ModelApiKeyRotationRotationTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelApiKeyRotationRotationTypeInput = {
  eq?: ApiKeyRotationRotationType | null,
  ne?: ApiKeyRotationRotationType | null,
};

export type ModelApiKeyRotationConnection = {
  __typename: "ModelApiKeyRotationConnection",
  items:  Array<ApiKeyRotation | null >,
  nextToken?: string | null,
};

export type ModelApiKeyUsageFilterInput = {
  and?: Array< ModelApiKeyUsageFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  endpoint?: ModelStringInput | null,
  id?: ModelIDInput | null,
  ipAddress?: ModelStringInput | null,
  keyId?: ModelIDInput | null,
  keyPrefix?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  method?: ModelStringInput | null,
  not?: ModelApiKeyUsageFilterInput | null,
  or?: Array< ModelApiKeyUsageFilterInput | null > | null,
  permissions?: ModelStringInput | null,
  rateLimitHit?: ModelBooleanInput | null,
  requestSize?: ModelIntInput | null,
  responseSize?: ModelIntInput | null,
  responseStatus?: ModelIntInput | null,
  responseTime?: ModelIntInput | null,
  securityViolation?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAgent?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelApiKeyUsageConnection = {
  __typename: "ModelApiKeyUsageConnection",
  items:  Array<ApiKeyUsage | null >,
  nextToken?: string | null,
};

export type ModelApiKeyFilterInput = {
  and?: Array< ModelApiKeyFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelIDInput | null,
  description?: ModelStringInput | null,
  expiresAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  ipWhitelist?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  keyHash?: ModelStringInput | null,
  keyPrefix?: ModelStringInput | null,
  lastRotatedAt?: ModelStringInput | null,
  lastSecurityIncident?: ModelStringInput | null,
  lastUsedAt?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelApiKeyFilterInput | null,
  or?: Array< ModelApiKeyFilterInput | null > | null,
  permissions?: ModelStringInput | null,
  rateLimitDaily?: ModelIntInput | null,
  rateLimitMinute?: ModelIntInput | null,
  securityIncidents?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  usageCount?: ModelIntInput | null,
};

export type ModelApiKeyConnection = {
  __typename: "ModelApiKeyConnection",
  items:  Array<ApiKey | null >,
  nextToken?: string | null,
};

export type ModelAuditLogFilterInput = {
  action?: ModelStringInput | null,
  and?: Array< ModelAuditLogFilterInput | null > | null,
  changes?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  ipAddress?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelAuditLogFilterInput | null,
  or?: Array< ModelAuditLogFilterInput | null > | null,
  resource?: ModelStringInput | null,
  resourceId?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAgent?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelAuditLogConnection = {
  __typename: "ModelAuditLogConnection",
  items:  Array<AuditLog | null >,
  nextToken?: string | null,
};

export type ModelCoachPayoutFilterInput = {
  and?: Array< ModelCoachPayoutFilterInput | null > | null,
  coachEmail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelCoachPayoutFilterInput | null,
  or?: Array< ModelCoachPayoutFilterInput | null > | null,
  owner?: ModelStringInput | null,
  payoutAmount?: ModelFloatInput | null,
  payoutDate?: ModelStringInput | null,
  payoutStatus?: ModelCoachPayoutPayoutStatusInput | null,
  payoutType?: ModelCoachPayoutPayoutTypeInput | null,
  stripeConnectAccountId?: ModelStringInput | null,
  stripePayout?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelCoachPayoutPayoutStatusInput = {
  eq?: CoachPayoutPayoutStatus | null,
  ne?: CoachPayoutPayoutStatus | null,
};

export type ModelCoachPayoutPayoutTypeInput = {
  eq?: CoachPayoutPayoutType | null,
  ne?: CoachPayoutPayoutType | null,
};

export type ModelCoachPayoutConnection = {
  __typename: "ModelCoachPayoutConnection",
  items:  Array<CoachPayout | null >,
  nextToken?: string | null,
};

export type ModelDescriptorFilterInput = {
  and?: Array< ModelDescriptorFilterInput | null > | null,
  codeValue?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  descriptorId?: ModelIntInput | null,
  effectiveBeginDate?: ModelStringInput | null,
  effectiveEndDate?: ModelStringInput | null,
  id?: ModelIDInput | null,
  namespace?: ModelStringInput | null,
  not?: ModelDescriptorFilterInput | null,
  or?: Array< ModelDescriptorFilterInput | null > | null,
  priorDescriptorId?: ModelIntInput | null,
  shortDescription?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelDescriptorConnection = {
  __typename: "ModelDescriptorConnection",
  items:  Array<Descriptor | null >,
  nextToken?: string | null,
};

export type ModelDocumentCategoryFilterInput = {
  and?: Array< ModelDocumentCategoryFilterInput | null > | null,
  categoryDescription?: ModelStringInput | null,
  categoryName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  documentCategoryId?: ModelIntInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  isRequired?: ModelBooleanInput | null,
  not?: ModelDocumentCategoryFilterInput | null,
  or?: Array< ModelDocumentCategoryFilterInput | null > | null,
  sortOrder?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelDocumentCategoryConnection = {
  __typename: "ModelDocumentCategoryConnection",
  items:  Array<DocumentCategory | null >,
  nextToken?: string | null,
};

export type ModelEducationOrganizationFilterInput = {
  addresses?: ModelStringInput | null,
  and?: Array< ModelEducationOrganizationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  educationOrganizationId?: ModelIntInput | null,
  etag?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastModifiedDate?: ModelStringInput | null,
  nameOfInstitution?: ModelStringInput | null,
  not?: ModelEducationOrganizationFilterInput | null,
  operationalStatus?: ModelStringInput | null,
  or?: Array< ModelEducationOrganizationFilterInput | null > | null,
  shortNameOfInstitution?: ModelStringInput | null,
  telephones?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  webSite?: ModelStringInput | null,
};

export type ModelEducationOrganizationConnection = {
  __typename: "ModelEducationOrganizationConnection",
  items:  Array<EducationOrganization | null >,
  nextToken?: string | null,
};

export type ModelEnrollmentFilterInput = {
  academicYear?: ModelStringInput | null,
  and?: Array< ModelEnrollmentFilterInput | null > | null,
  applicationData?: ModelStringInput | null,
  coachName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currentStep?: ModelIntInput | null,
  documents?: ModelStringInput | null,
  enrollmentType?: ModelEnrollmentEnrollmentTypeInput | null,
  id?: ModelIDInput | null,
  not?: ModelEnrollmentFilterInput | null,
  or?: Array< ModelEnrollmentFilterInput | null > | null,
  parentId?: ModelIDInput | null,
  schoolPreferences?: ModelStringInput | null,
  sportInterest?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  status?: ModelEnrollmentStatusInput | null,
  studentAge?: ModelIntInput | null,
  studentGrade?: ModelStringInput | null,
  studentName?: ModelStringInput | null,
  timelineStatus?: ModelEnrollmentTimelineStatusInput | null,
  timelineSteps?: ModelStringInput | null,
  totalSteps?: ModelIntInput | null,
  tuitionPlan?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelEnrollmentEnrollmentTypeInput = {
  eq?: EnrollmentEnrollmentType | null,
  ne?: EnrollmentEnrollmentType | null,
};

export type ModelEnrollmentStatusInput = {
  eq?: EnrollmentStatus | null,
  ne?: EnrollmentStatus | null,
};

export type ModelEnrollmentTimelineStatusInput = {
  eq?: EnrollmentTimelineStatus | null,
  ne?: EnrollmentTimelineStatus | null,
};

export type ModelEnrollmentConnection = {
  __typename: "ModelEnrollmentConnection",
  items:  Array<Enrollment | null >,
  nextToken?: string | null,
};

export type ModelEventRegistrationFilterInput = {
  and?: Array< ModelEventRegistrationFilterInput | null > | null,
  attendanceStatus?: ModelEventRegistrationAttendanceStatusInput | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelEventRegistrationFilterInput | null,
  notes?: ModelStringInput | null,
  or?: Array< ModelEventRegistrationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  paymentStatus?: ModelEventRegistrationPaymentStatusInput | null,
  registrationData?: ModelStringInput | null,
  registrationStatus?: ModelEventRegistrationRegistrationStatusInput | null,
  studentName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelEventRegistrationAttendanceStatusInput = {
  eq?: EventRegistrationAttendanceStatus | null,
  ne?: EventRegistrationAttendanceStatus | null,
};

export type ModelEventRegistrationPaymentStatusInput = {
  eq?: EventRegistrationPaymentStatus | null,
  ne?: EventRegistrationPaymentStatus | null,
};

export type ModelEventRegistrationRegistrationStatusInput = {
  eq?: EventRegistrationRegistrationStatus | null,
  ne?: EventRegistrationRegistrationStatus | null,
};

export type ModelEventRegistrationConnection = {
  __typename: "ModelEventRegistrationConnection",
  items:  Array<EventRegistration | null >,
  nextToken?: string | null,
};

export type ModelEventFilterInput = {
  address?: ModelStringInput | null,
  ageGroups?: ModelStringInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  capacity?: ModelIntInput | null,
  coachId?: ModelIDInput | null,
  coachName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currency?: ModelStringInput | null,
  description?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  equipment?: ModelStringInput | null,
  eventType?: ModelEventEventTypeInput | null,
  googleCalendarEventId?: ModelStringInput | null,
  googleCalendarLastSynced?: ModelStringInput | null,
  googleCalendarSyncEnabled?: ModelBooleanInput | null,
  googleMeetUrl?: ModelStringInput | null,
  id?: ModelIDInput | null,
  images?: ModelStringInput | null,
  isOnline?: ModelBooleanInput | null,
  isPublic?: ModelBooleanInput | null,
  location?: ModelStringInput | null,
  meetingUrl?: ModelStringInput | null,
  not?: ModelEventFilterInput | null,
  or?: Array< ModelEventFilterInput | null > | null,
  owner?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  registeredCount?: ModelIntInput | null,
  registrationDeadline?: ModelStringInput | null,
  requirements?: ModelStringInput | null,
  shortDescription?: ModelStringInput | null,
  skillLevel?: ModelEventSkillLevelInput | null,
  startDate?: ModelStringInput | null,
  status?: ModelEventStatusInput | null,
  tags?: ModelStringInput | null,
  timezone?: ModelStringInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  venue?: ModelStringInput | null,
};

export type ModelEventEventTypeInput = {
  eq?: EventEventType | null,
  ne?: EventEventType | null,
};

export type ModelEventSkillLevelInput = {
  eq?: EventSkillLevel | null,
  ne?: EventSkillLevel | null,
};

export type ModelEventStatusInput = {
  eq?: EventStatus | null,
  ne?: EventStatus | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type ModelInvitationFilterInput = {
  acceptedAt?: ModelStringInput | null,
  and?: Array< ModelInvitationFilterInput | null > | null,
  bio?: ModelStringInput | null,
  city?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  expiresAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  invitationType?: ModelInvitationInvitationTypeInput | null,
  invitedBy?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  lastSentAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  not?: ModelInvitationFilterInput | null,
  or?: Array< ModelInvitationFilterInput | null > | null,
  phone?: ModelStringInput | null,
  schoolName?: ModelStringInput | null,
  schoolType?: ModelStringInput | null,
  sport?: ModelStringInput | null,
  state?: ModelStringInput | null,
  status?: ModelInvitationStatusInput | null,
  token?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelInvitationInvitationTypeInput = {
  eq?: InvitationInvitationType | null,
  ne?: InvitationInvitationType | null,
};

export type ModelInvitationStatusInput = {
  eq?: InvitationStatus | null,
  ne?: InvitationStatus | null,
};

export type ModelInvitationConnection = {
  __typename: "ModelInvitationConnection",
  items:  Array<Invitation | null >,
  nextToken?: string | null,
};

export type ModelLLCIncorporationFilterInput = {
  and?: Array< ModelLLCIncorporationFilterInput | null > | null,
  businessName?: ModelStringInput | null,
  businessType?: ModelLLCIncorporationBusinessTypeInput | null,
  coachId?: ModelIDInput | null,
  completedAt?: ModelStringInput | null,
  cost?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  documents?: ModelStringInput | null,
  filedAt?: ModelStringInput | null,
  filingData?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelLLCIncorporationFilterInput | null,
  or?: Array< ModelLLCIncorporationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  state?: ModelStringInput | null,
  status?: ModelLLCIncorporationStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelLLCIncorporationBusinessTypeInput = {
  eq?: LLCIncorporationBusinessType | null,
  ne?: LLCIncorporationBusinessType | null,
};

export type ModelLLCIncorporationStatusInput = {
  eq?: LLCIncorporationStatus | null,
  ne?: LLCIncorporationStatus | null,
};

export type ModelLLCIncorporationConnection = {
  __typename: "ModelLLCIncorporationConnection",
  items:  Array<LLCIncorporation | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  and?: Array< ModelMessageFilterInput | null > | null,
  attachments?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  messageType?: ModelMessageMessageTypeInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelMessageFilterInput | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelMessagePriorityInput | null,
  readAt?: ModelStringInput | null,
  recipientId?: ModelIDInput | null,
  senderId?: ModelIDInput | null,
  sentAt?: ModelStringInput | null,
  status?: ModelMessageStatusInput | null,
  subject?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMessageMessageTypeInput = {
  eq?: MessageMessageType | null,
  ne?: MessageMessageType | null,
};

export type ModelMessagePriorityInput = {
  eq?: MessagePriority | null,
  ne?: MessagePriority | null,
};

export type ModelMessageStatusInput = {
  eq?: MessageStatus | null,
  ne?: MessageStatus | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type ModelNotificationFilterInput = {
  and?: Array< ModelNotificationFilterInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deliveryChannels?: ModelStringInput | null,
  id?: ModelIDInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelNotificationFilterInput | null,
  notificationType?: ModelNotificationNotificationTypeInput | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelNotificationPriorityInput | null,
  scheduledFor?: ModelStringInput | null,
  sentAt?: ModelStringInput | null,
  status?: ModelNotificationStatusInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelNotificationNotificationTypeInput = {
  eq?: NotificationNotificationType | null,
  ne?: NotificationNotificationType | null,
};

export type ModelNotificationPriorityInput = {
  eq?: NotificationPriority | null,
  ne?: NotificationPriority | null,
};

export type ModelNotificationStatusInput = {
  eq?: NotificationStatus | null,
  ne?: NotificationStatus | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type ModelOnboardingProgressFilterInput = {
  and?: Array< ModelOnboardingProgressFilterInput | null > | null,
  completedSteps?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currentStep?: ModelOnboardingProgressCurrentStepInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  invitationBased?: ModelBooleanInput | null,
  invitationId?: ModelStringInput | null,
  lastUpdated?: ModelStringInput | null,
  not?: ModelOnboardingProgressFilterInput | null,
  or?: Array< ModelOnboardingProgressFilterInput | null > | null,
  stepData?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelOnboardingProgressCurrentStepInput = {
  eq?: OnboardingProgressCurrentStep | null,
  ne?: OnboardingProgressCurrentStep | null,
};

export type ModelOnboardingProgressConnection = {
  __typename: "ModelOnboardingProgressConnection",
  items:  Array<OnboardingProgress | null >,
  nextToken?: string | null,
};

export type ModelParentFilterInput = {
  and?: Array< ModelParentFilterInput | null > | null,
  backgroundInformation?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  employerName?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  generationCodeSuffix?: ModelStringInput | null,
  hispanicLatinoEthnicity?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  lastSurname?: ModelStringInput | null,
  loginId?: ModelStringInput | null,
  maidenName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  not?: ModelParentFilterInput | null,
  or?: Array< ModelParentFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentUSI?: ModelIntInput | null,
  parentUniqueId?: ModelStringInput | null,
  personalEmailAddress?: ModelStringInput | null,
  personalTitlePrefix?: ModelStringInput | null,
  professionDescriptor?: ModelStringInput | null,
  races?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  workEmailAddress?: ModelStringInput | null,
};

export type ModelParentConnection = {
  __typename: "ModelParentConnection",
  items:  Array<Parent | null >,
  nextToken?: string | null,
};

export type ModelPaymentRecordFilterInput = {
  and?: Array< ModelPaymentRecordFilterInput | null > | null,
  applicationId?: ModelStringInput | null,
  coachEmail?: ModelStringInput | null,
  coachPayoutAmount?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  depositAmount?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  isMarketplacePayment?: ModelBooleanInput | null,
  lastPaymentDate?: ModelStringInput | null,
  nextPaymentDue?: ModelStringInput | null,
  not?: ModelPaymentRecordFilterInput | null,
  or?: Array< ModelPaymentRecordFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentEmail?: ModelStringInput | null,
  paymentHistory?: ModelStringInput | null,
  paymentPlan?: ModelPaymentRecordPaymentPlanInput | null,
  paymentStatus?: ModelPaymentRecordPaymentStatusInput | null,
  platformFeeAmount?: ModelFloatInput | null,
  stripeConnectAccountId?: ModelStringInput | null,
  stripeCustomerId?: ModelStringInput | null,
  stripePaymentIntentId?: ModelStringInput | null,
  stripePaymentLinkId?: ModelStringInput | null,
  studentId?: ModelStringInput | null,
  studentName?: ModelStringInput | null,
  totalPaid?: ModelFloatInput | null,
  tuitionAmount?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPaymentRecordPaymentPlanInput = {
  eq?: PaymentRecordPaymentPlan | null,
  ne?: PaymentRecordPaymentPlan | null,
};

export type ModelPaymentRecordPaymentStatusInput = {
  eq?: PaymentRecordPaymentStatus | null,
  ne?: PaymentRecordPaymentStatus | null,
};

export type ModelPaymentRecordConnection = {
  __typename: "ModelPaymentRecordConnection",
  items:  Array<PaymentRecord | null >,
  nextToken?: string | null,
};

export type ModelProfileFilterInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelProfileFilterInput | null > | null,
  backgroundCheckDate?: ModelStringInput | null,
  backgroundCheckStatus?: ModelProfileBackgroundCheckStatusInput | null,
  bio?: ModelStringInput | null,
  certifications?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  emergencyContact?: ModelStringInput | null,
  experience?: ModelStringInput | null,
  id?: ModelIDInput | null,
  marketingProgress?: ModelStringInput | null,
  not?: ModelProfileFilterInput | null,
  onboardingComplete?: ModelBooleanInput | null,
  or?: Array< ModelProfileFilterInput | null > | null,
  preferences?: ModelStringInput | null,
  profileType?: ModelProfileProfileTypeInput | null,
  specialties?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  wizardProgress?: ModelStringInput | null,
};

export type ModelProfileBackgroundCheckStatusInput = {
  eq?: ProfileBackgroundCheckStatus | null,
  ne?: ProfileBackgroundCheckStatus | null,
};

export type ModelProfileProfileTypeInput = {
  eq?: ProfileProfileType | null,
  ne?: ProfileProfileType | null,
};

export type ModelProfileConnection = {
  __typename: "ModelProfileConnection",
  items:  Array<Profile | null >,
  nextToken?: string | null,
};

export type ModelQuizAttemptFilterInput = {
  and?: Array< ModelQuizAttemptFilterInput | null > | null,
  answers?: ModelStringInput | null,
  completedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelQuizAttemptFilterInput | null,
  or?: Array< ModelQuizAttemptFilterInput | null > | null,
  owner?: ModelStringInput | null,
  passed?: ModelBooleanInput | null,
  quizId?: ModelIDInput | null,
  score?: ModelIntInput | null,
  startedAt?: ModelStringInput | null,
  timeSpent?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelQuizAttemptConnection = {
  __typename: "ModelQuizAttemptConnection",
  items:  Array<QuizAttempt | null >,
  nextToken?: string | null,
};

export type ModelQuizFilterInput = {
  and?: Array< ModelQuizFilterInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelIDInput | null,
  description?: ModelStringInput | null,
  difficulty?: ModelQuizDifficultyInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  not?: ModelQuizFilterInput | null,
  or?: Array< ModelQuizFilterInput | null > | null,
  passingScore?: ModelIntInput | null,
  questions?: ModelStringInput | null,
  timeLimit?: ModelIntInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelQuizDifficultyInput = {
  eq?: QuizDifficulty | null,
  ne?: QuizDifficulty | null,
};

export type ModelQuizConnection = {
  __typename: "ModelQuizConnection",
  items:  Array<Quiz | null >,
  nextToken?: string | null,
};

export type ModelSchoolFilterInput = {
  administrativeFundingControl?: ModelStringInput | null,
  and?: Array< ModelSchoolFilterInput | null > | null,
  charterStatus?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  etag?: ModelStringInput | null,
  gradeLevels?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastModifiedDate?: ModelStringInput | null,
  localEducationAgencyId?: ModelIntInput | null,
  magnetSpecialProgramEmphasisSchool?: ModelStringInput | null,
  not?: ModelSchoolFilterInput | null,
  or?: Array< ModelSchoolFilterInput | null > | null,
  schoolCategories?: ModelStringInput | null,
  schoolId?: ModelIntInput | null,
  schoolType?: ModelStringInput | null,
  titleIPartASchoolDesignation?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSchoolConnection = {
  __typename: "ModelSchoolConnection",
  items:  Array<School | null >,
  nextToken?: string | null,
};

export type ModelSessionFilterInput = {
  and?: Array< ModelSessionFilterInput | null > | null,
  coachId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  eventId?: ModelIDInput | null,
  feedback?: ModelStringInput | null,
  id?: ModelIDInput | null,
  location?: ModelStringInput | null,
  not?: ModelSessionFilterInput | null,
  notes?: ModelStringInput | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  participants?: ModelStringInput | null,
  scheduledDate?: ModelStringInput | null,
  sessionType?: ModelSessionSessionTypeInput | null,
  status?: ModelSessionStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSessionSessionTypeInput = {
  eq?: SessionSessionType | null,
  ne?: SessionSessionType | null,
};

export type ModelSessionStatusInput = {
  eq?: SessionStatus | null,
  ne?: SessionStatus | null,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items:  Array<Session | null >,
  nextToken?: string | null,
};

export type ModelStaffFilterInput = {
  and?: Array< ModelStaffFilterInput | null > | null,
  birthDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  generationCodeSuffix?: ModelStringInput | null,
  highestCompletedLevelOfEducation?: ModelStringInput | null,
  hispanicLatinoEthnicity?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  lastSurname?: ModelStringInput | null,
  loginId?: ModelStringInput | null,
  maidenName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  not?: ModelStaffFilterInput | null,
  or?: Array< ModelStaffFilterInput | null > | null,
  owner?: ModelStringInput | null,
  personalEmailAddress?: ModelStringInput | null,
  personalTitlePrefix?: ModelStringInput | null,
  races?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  staffUSI?: ModelIntInput | null,
  staffUniqueId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  workEmailAddress?: ModelStringInput | null,
  yearsOfPriorProfessionalExperience?: ModelFloatInput | null,
};

export type ModelStaffConnection = {
  __typename: "ModelStaffConnection",
  items:  Array<Staff | null >,
  nextToken?: string | null,
};

export type ModelStaffSchoolAssociationFilterInput = {
  and?: Array< ModelStaffSchoolAssociationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  employmentStatus?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  hireDate?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelStaffSchoolAssociationFilterInput | null,
  or?: Array< ModelStaffSchoolAssociationFilterInput | null > | null,
  programAssignment?: ModelStringInput | null,
  schoolId?: ModelIntInput | null,
  schoolYear?: ModelIntInput | null,
  staffUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStaffSchoolAssociationConnection = {
  __typename: "ModelStaffSchoolAssociationConnection",
  items:  Array<StaffSchoolAssociation | null >,
  nextToken?: string | null,
};

export type ModelStudentDocumentFilterInput = {
  and?: Array< ModelStudentDocumentFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  documentCategoryId?: ModelIntInput | null,
  documentDescription?: ModelStringInput | null,
  documentHash?: ModelStringInput | null,
  documentTitle?: ModelStringInput | null,
  expirationDate?: ModelStringInput | null,
  fileName?: ModelStringInput | null,
  fileSize?: ModelIntInput | null,
  id?: ModelIDInput | null,
  isConfidential?: ModelBooleanInput | null,
  mimeType?: ModelStringInput | null,
  not?: ModelStudentDocumentFilterInput | null,
  or?: Array< ModelStudentDocumentFilterInput | null > | null,
  reviewComments?: ModelStringInput | null,
  reviewDate?: ModelStringInput | null,
  reviewStatus?: ModelStudentDocumentReviewStatusInput | null,
  reviewedByStaffUSI?: ModelIntInput | null,
  storageLocation?: ModelStringInput | null,
  studentUSI?: ModelIntInput | null,
  submittedByParentUSI?: ModelIntInput | null,
  submittedDate?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStudentDocumentReviewStatusInput = {
  eq?: StudentDocumentReviewStatus | null,
  ne?: StudentDocumentReviewStatus | null,
};

export type ModelStudentDocumentConnection = {
  __typename: "ModelStudentDocumentConnection",
  items:  Array<StudentDocument | null >,
  nextToken?: string | null,
};

export type ModelStudentEducationOrganizationResponsibleContactPersonFilterInput = {
  and?: Array< ModelStudentEducationOrganizationResponsibleContactPersonFilterInput | null > | null,
  contactAddress?: ModelStringInput | null,
  contactEmailAddress?: ModelStringInput | null,
  contactTelephones?: ModelStringInput | null,
  contactTitle?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  educationOrganizationId?: ModelIntInput | null,
  emergencyContactStatus?: ModelBooleanInput | null,
  firstName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastSurname?: ModelStringInput | null,
  not?: ModelStudentEducationOrganizationResponsibleContactPersonFilterInput | null,
  or?: Array< ModelStudentEducationOrganizationResponsibleContactPersonFilterInput | null > | null,
  primaryContactStatus?: ModelBooleanInput | null,
  relation?: ModelStringInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStudentEducationOrganizationResponsibleContactPersonConnection = {
  __typename: "ModelStudentEducationOrganizationResponsibleContactPersonConnection",
  items:  Array<StudentEducationOrganizationResponsibleContactPerson | null >,
  nextToken?: string | null,
};

export type ModelStudentParentAssociationFilterInput = {
  and?: Array< ModelStudentParentAssociationFilterInput | null > | null,
  contactPriority?: ModelIntInput | null,
  contactRestrictions?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  custodyStatus?: ModelStudentParentAssociationCustodyStatusInput | null,
  emergencyContactStatus?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  legalGuardian?: ModelBooleanInput | null,
  livesWith?: ModelBooleanInput | null,
  not?: ModelStudentParentAssociationFilterInput | null,
  or?: Array< ModelStudentParentAssociationFilterInput | null > | null,
  parentUSI?: ModelIntInput | null,
  primaryContactStatus?: ModelBooleanInput | null,
  relation?: ModelStudentParentAssociationRelationInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStudentParentAssociationCustodyStatusInput = {
  eq?: StudentParentAssociationCustodyStatus | null,
  ne?: StudentParentAssociationCustodyStatus | null,
};

export type ModelStudentParentAssociationRelationInput = {
  eq?: StudentParentAssociationRelation | null,
  ne?: StudentParentAssociationRelation | null,
};

export type ModelStudentParentAssociationConnection = {
  __typename: "ModelStudentParentAssociationConnection",
  items:  Array<StudentParentAssociation | null >,
  nextToken?: string | null,
};

export type ModelStudentSchoolAssociationFilterInput = {
  admissionStatus?: ModelStringInput | null,
  and?: Array< ModelStudentSchoolAssociationFilterInput | null > | null,
  applicationStatus?: ModelStringInput | null,
  classOfSchoolYear?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  entryDate?: ModelStringInput | null,
  entryGradeLevel?: ModelStringInput | null,
  entryType?: ModelStringInput | null,
  exitWithdrawDate?: ModelStringInput | null,
  exitWithdrawType?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelStudentSchoolAssociationFilterInput | null,
  or?: Array< ModelStudentSchoolAssociationFilterInput | null > | null,
  repeatGradeIndicator?: ModelBooleanInput | null,
  schoolId?: ModelIntInput | null,
  schoolYear?: ModelIntInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStudentSchoolAssociationConnection = {
  __typename: "ModelStudentSchoolAssociationConnection",
  items:  Array<StudentSchoolAssociation | null >,
  nextToken?: string | null,
};

export type ModelStudentFilterInput = {
  admissionDate?: ModelStringInput | null,
  and?: Array< ModelStudentFilterInput | null > | null,
  applicationDate?: ModelStringInput | null,
  birthCity?: ModelStringInput | null,
  birthCountry?: ModelStringInput | null,
  birthDate?: ModelStringInput | null,
  birthStateAbbreviation?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  generationCodeSuffix?: ModelStringInput | null,
  hispanicLatinoEthnicity?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  lastSurname?: ModelStringInput | null,
  maidenName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  not?: ModelStudentFilterInput | null,
  or?: Array< ModelStudentFilterInput | null > | null,
  personalTitlePrefix?: ModelStringInput | null,
  races?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  studentApplicationStatus?: ModelStudentStudentApplicationStatusInput | null,
  studentUSI?: ModelIntInput | null,
  studentUniqueId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStudentStudentApplicationStatusInput = {
  eq?: StudentStudentApplicationStatus | null,
  ne?: StudentStudentApplicationStatus | null,
};

export type ModelStudentConnection = {
  __typename: "ModelStudentConnection",
  items:  Array<Student | null >,
  nextToken?: string | null,
};

export type ModelTuitionSettingFilterInput = {
  allowPaymentPlans?: ModelBooleanInput | null,
  and?: Array< ModelTuitionSettingFilterInput | null > | null,
  coachEmail?: ModelStringInput | null,
  coachId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  currency?: ModelStringInput | null,
  defaultDeposit?: ModelFloatInput | null,
  defaultTuition?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  marketplaceEnabled?: ModelBooleanInput | null,
  not?: ModelTuitionSettingFilterInput | null,
  or?: Array< ModelTuitionSettingFilterInput | null > | null,
  owner?: ModelStringInput | null,
  paymentPlanOptions?: ModelStringInput | null,
  platformFeePercent?: ModelFloatInput | null,
  stripeConnectAccountId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTuitionSettingConnection = {
  __typename: "ModelTuitionSettingConnection",
  items:  Array<TuitionSetting | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  amplifyUserId?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastLoginAt?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  parentUSI?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  staffUSI?: ModelIntInput | null,
  status?: ModelUserStatusInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type ModelUserStatusInput = {
  eq?: UserStatus | null,
  ne?: UserStatus | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelAnalyticsEventConditionInput = {
  and?: Array< ModelAnalyticsEventConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  eventName?: ModelStringInput | null,
  ipAddress?: ModelStringInput | null,
  not?: ModelAnalyticsEventConditionInput | null,
  or?: Array< ModelAnalyticsEventConditionInput | null > | null,
  properties?: ModelStringInput | null,
  referrer?: ModelStringInput | null,
  sessionId?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAgent?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  utmCampaign?: ModelStringInput | null,
  utmContent?: ModelStringInput | null,
  utmMedium?: ModelStringInput | null,
  utmSource?: ModelStringInput | null,
  utmTerm?: ModelStringInput | null,
};

export type CreateAnalyticsEventInput = {
  createdAt?: string | null,
  eventName: string,
  id?: string | null,
  ipAddress?: string | null,
  properties?: string | null,
  referrer?: string | null,
  sessionId?: string | null,
  timestamp: string,
  userAgent?: string | null,
  userId?: string | null,
  utmCampaign?: string | null,
  utmContent?: string | null,
  utmMedium?: string | null,
  utmSource?: string | null,
  utmTerm?: string | null,
};

export type ModelApiKeyConditionInput = {
  and?: Array< ModelApiKeyConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelIDInput | null,
  description?: ModelStringInput | null,
  expiresAt?: ModelStringInput | null,
  ipWhitelist?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  keyHash?: ModelStringInput | null,
  keyPrefix?: ModelStringInput | null,
  lastRotatedAt?: ModelStringInput | null,
  lastSecurityIncident?: ModelStringInput | null,
  lastUsedAt?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelApiKeyConditionInput | null,
  or?: Array< ModelApiKeyConditionInput | null > | null,
  permissions?: ModelStringInput | null,
  rateLimitDaily?: ModelIntInput | null,
  rateLimitMinute?: ModelIntInput | null,
  securityIncidents?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  usageCount?: ModelIntInput | null,
};

export type CreateApiKeyInput = {
  createdAt?: string | null,
  createdBy: string,
  description?: string | null,
  expiresAt?: string | null,
  id?: string | null,
  ipWhitelist?: Array< string | null > | null,
  isActive?: boolean | null,
  keyHash: string,
  keyPrefix: string,
  lastRotatedAt?: string | null,
  lastSecurityIncident?: string | null,
  lastUsedAt?: string | null,
  metadata?: string | null,
  name: string,
  permissions?: Array< string | null > | null,
  rateLimitDaily?: number | null,
  rateLimitMinute?: number | null,
  securityIncidents?: number | null,
  updatedAt?: string | null,
  usageCount?: number | null,
};

export type ModelApiKeyRotationConditionInput = {
  and?: Array< ModelApiKeyRotationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  gracePeriodEnd?: ModelStringInput | null,
  newKeyId?: ModelIDInput | null,
  not?: ModelApiKeyRotationConditionInput | null,
  oldKeyDeactivated?: ModelBooleanInput | null,
  oldKeyId?: ModelIDInput | null,
  or?: Array< ModelApiKeyRotationConditionInput | null > | null,
  reason?: ModelStringInput | null,
  rotatedBy?: ModelIDInput | null,
  rotationType?: ModelApiKeyRotationRotationTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateApiKeyRotationInput = {
  createdAt?: string | null,
  gracePeriodEnd?: string | null,
  id?: string | null,
  newKeyId: string,
  oldKeyDeactivated?: boolean | null,
  oldKeyId: string,
  reason?: string | null,
  rotatedBy: string,
  rotationType?: ApiKeyRotationRotationType | null,
};

export type ModelApiKeyUsageConditionInput = {
  and?: Array< ModelApiKeyUsageConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  endpoint?: ModelStringInput | null,
  ipAddress?: ModelStringInput | null,
  keyId?: ModelIDInput | null,
  keyPrefix?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  method?: ModelStringInput | null,
  not?: ModelApiKeyUsageConditionInput | null,
  or?: Array< ModelApiKeyUsageConditionInput | null > | null,
  permissions?: ModelStringInput | null,
  rateLimitHit?: ModelBooleanInput | null,
  requestSize?: ModelIntInput | null,
  responseSize?: ModelIntInput | null,
  responseStatus?: ModelIntInput | null,
  responseTime?: ModelIntInput | null,
  securityViolation?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAgent?: ModelStringInput | null,
};

export type CreateApiKeyUsageInput = {
  createdAt?: string | null,
  endpoint: string,
  id?: string | null,
  ipAddress?: string | null,
  keyId: string,
  keyPrefix: string,
  metadata?: string | null,
  method?: string | null,
  permissions?: Array< string | null > | null,
  rateLimitHit?: boolean | null,
  requestSize?: number | null,
  responseSize?: number | null,
  responseStatus?: number | null,
  responseTime?: number | null,
  securityViolation?: string | null,
  timestamp: string,
  userAgent?: string | null,
};

export type ModelAuditLogConditionInput = {
  action?: ModelStringInput | null,
  and?: Array< ModelAuditLogConditionInput | null > | null,
  changes?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  ipAddress?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelAuditLogConditionInput | null,
  or?: Array< ModelAuditLogConditionInput | null > | null,
  resource?: ModelStringInput | null,
  resourceId?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAgent?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateAuditLogInput = {
  action: string,
  changes?: string | null,
  id?: string | null,
  ipAddress?: string | null,
  metadata?: string | null,
  resource: string,
  resourceId?: string | null,
  timestamp: string,
  userAgent?: string | null,
  userId?: string | null,
};

export type ModelCoachPayoutConditionInput = {
  and?: Array< ModelCoachPayoutConditionInput | null > | null,
  coachEmail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelCoachPayoutConditionInput | null,
  or?: Array< ModelCoachPayoutConditionInput | null > | null,
  owner?: ModelStringInput | null,
  payoutAmount?: ModelFloatInput | null,
  payoutDate?: ModelStringInput | null,
  payoutStatus?: ModelCoachPayoutPayoutStatusInput | null,
  payoutType?: ModelCoachPayoutPayoutTypeInput | null,
  stripeConnectAccountId?: ModelStringInput | null,
  stripePayout?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCoachPayoutInput = {
  coachEmail: string,
  createdAt?: string | null,
  description?: string | null,
  id?: string | null,
  metadata?: string | null,
  payoutAmount: number,
  payoutDate?: string | null,
  payoutStatus?: CoachPayoutPayoutStatus | null,
  payoutType?: CoachPayoutPayoutType | null,
  stripeConnectAccountId: string,
  stripePayout?: string | null,
  updatedAt?: string | null,
};

export type ModelDescriptorConditionInput = {
  and?: Array< ModelDescriptorConditionInput | null > | null,
  codeValue?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  descriptorId?: ModelIntInput | null,
  effectiveBeginDate?: ModelStringInput | null,
  effectiveEndDate?: ModelStringInput | null,
  namespace?: ModelStringInput | null,
  not?: ModelDescriptorConditionInput | null,
  or?: Array< ModelDescriptorConditionInput | null > | null,
  priorDescriptorId?: ModelIntInput | null,
  shortDescription?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDescriptorInput = {
  codeValue: string,
  createdAt?: string | null,
  description?: string | null,
  descriptorId: number,
  effectiveBeginDate?: string | null,
  effectiveEndDate?: string | null,
  id?: string | null,
  namespace: string,
  priorDescriptorId?: number | null,
  shortDescription: string,
  updatedAt?: string | null,
};

export type ModelDocumentCategoryConditionInput = {
  and?: Array< ModelDocumentCategoryConditionInput | null > | null,
  categoryDescription?: ModelStringInput | null,
  categoryName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  documentCategoryId?: ModelIntInput | null,
  isActive?: ModelBooleanInput | null,
  isRequired?: ModelBooleanInput | null,
  not?: ModelDocumentCategoryConditionInput | null,
  or?: Array< ModelDocumentCategoryConditionInput | null > | null,
  sortOrder?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDocumentCategoryInput = {
  categoryDescription?: string | null,
  categoryName: string,
  createdAt?: string | null,
  documentCategoryId: number,
  id?: string | null,
  isActive?: boolean | null,
  isRequired?: boolean | null,
  sortOrder?: number | null,
  updatedAt?: string | null,
};

export type ModelEducationOrganizationConditionInput = {
  addresses?: ModelStringInput | null,
  and?: Array< ModelEducationOrganizationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  educationOrganizationId?: ModelIntInput | null,
  etag?: ModelStringInput | null,
  lastModifiedDate?: ModelStringInput | null,
  nameOfInstitution?: ModelStringInput | null,
  not?: ModelEducationOrganizationConditionInput | null,
  operationalStatus?: ModelStringInput | null,
  or?: Array< ModelEducationOrganizationConditionInput | null > | null,
  shortNameOfInstitution?: ModelStringInput | null,
  telephones?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  webSite?: ModelStringInput | null,
};

export type CreateEducationOrganizationInput = {
  addresses?: string | null,
  createdAt?: string | null,
  educationOrganizationId: number,
  etag?: string | null,
  id?: string | null,
  lastModifiedDate?: string | null,
  nameOfInstitution: string,
  operationalStatus?: string | null,
  shortNameOfInstitution?: string | null,
  telephones?: string | null,
  updatedAt?: string | null,
  webSite?: string | null,
};

export type ModelEnrollmentConditionInput = {
  academicYear?: ModelStringInput | null,
  and?: Array< ModelEnrollmentConditionInput | null > | null,
  applicationData?: ModelStringInput | null,
  coachName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currentStep?: ModelIntInput | null,
  documents?: ModelStringInput | null,
  enrollmentType?: ModelEnrollmentEnrollmentTypeInput | null,
  not?: ModelEnrollmentConditionInput | null,
  or?: Array< ModelEnrollmentConditionInput | null > | null,
  parentId?: ModelIDInput | null,
  schoolPreferences?: ModelStringInput | null,
  sportInterest?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  status?: ModelEnrollmentStatusInput | null,
  studentAge?: ModelIntInput | null,
  studentGrade?: ModelStringInput | null,
  studentName?: ModelStringInput | null,
  timelineStatus?: ModelEnrollmentTimelineStatusInput | null,
  timelineSteps?: ModelStringInput | null,
  totalSteps?: ModelIntInput | null,
  tuitionPlan?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateEnrollmentInput = {
  academicYear?: string | null,
  applicationData?: string | null,
  coachName?: string | null,
  createdAt?: string | null,
  currentStep?: number | null,
  documents?: string | null,
  enrollmentType?: EnrollmentEnrollmentType | null,
  id?: string | null,
  parentId: string,
  schoolPreferences?: string | null,
  sportInterest?: string | null,
  startDate?: string | null,
  status?: EnrollmentStatus | null,
  studentAge?: number | null,
  studentGrade?: string | null,
  studentName: string,
  timelineStatus?: EnrollmentTimelineStatus | null,
  timelineSteps?: string | null,
  totalSteps?: number | null,
  tuitionPlan?: string | null,
  updatedAt?: string | null,
};

export type ModelEventConditionInput = {
  address?: ModelStringInput | null,
  ageGroups?: ModelStringInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  capacity?: ModelIntInput | null,
  coachId?: ModelIDInput | null,
  coachName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currency?: ModelStringInput | null,
  description?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  equipment?: ModelStringInput | null,
  eventType?: ModelEventEventTypeInput | null,
  googleCalendarEventId?: ModelStringInput | null,
  googleCalendarLastSynced?: ModelStringInput | null,
  googleCalendarSyncEnabled?: ModelBooleanInput | null,
  googleMeetUrl?: ModelStringInput | null,
  images?: ModelStringInput | null,
  isOnline?: ModelBooleanInput | null,
  isPublic?: ModelBooleanInput | null,
  location?: ModelStringInput | null,
  meetingUrl?: ModelStringInput | null,
  not?: ModelEventConditionInput | null,
  or?: Array< ModelEventConditionInput | null > | null,
  owner?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  registeredCount?: ModelIntInput | null,
  registrationDeadline?: ModelStringInput | null,
  requirements?: ModelStringInput | null,
  shortDescription?: ModelStringInput | null,
  skillLevel?: ModelEventSkillLevelInput | null,
  startDate?: ModelStringInput | null,
  status?: ModelEventStatusInput | null,
  tags?: ModelStringInput | null,
  timezone?: ModelStringInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  venue?: ModelStringInput | null,
};

export type CreateEventInput = {
  address?: string | null,
  ageGroups?: Array< string | null > | null,
  capacity?: number | null,
  coachId: string,
  coachName?: string | null,
  createdAt?: string | null,
  currency?: string | null,
  description?: string | null,
  endDate: string,
  equipment?: Array< string | null > | null,
  eventType?: EventEventType | null,
  googleCalendarEventId?: string | null,
  googleCalendarLastSynced?: string | null,
  googleCalendarSyncEnabled?: boolean | null,
  googleMeetUrl?: string | null,
  id?: string | null,
  images?: Array< string | null > | null,
  isOnline?: boolean | null,
  isPublic?: boolean | null,
  location?: string | null,
  meetingUrl?: string | null,
  price?: number | null,
  registeredCount?: number | null,
  registrationDeadline?: string | null,
  requirements?: Array< string | null > | null,
  shortDescription?: string | null,
  skillLevel?: EventSkillLevel | null,
  startDate: string,
  status?: EventStatus | null,
  tags?: Array< string | null > | null,
  timezone?: string | null,
  title: string,
  updatedAt?: string | null,
  venue?: string | null,
};

export type ModelEventRegistrationConditionInput = {
  and?: Array< ModelEventRegistrationConditionInput | null > | null,
  attendanceStatus?: ModelEventRegistrationAttendanceStatusInput | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelIDInput | null,
  not?: ModelEventRegistrationConditionInput | null,
  notes?: ModelStringInput | null,
  or?: Array< ModelEventRegistrationConditionInput | null > | null,
  owner?: ModelStringInput | null,
  paymentStatus?: ModelEventRegistrationPaymentStatusInput | null,
  registrationData?: ModelStringInput | null,
  registrationStatus?: ModelEventRegistrationRegistrationStatusInput | null,
  studentName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateEventRegistrationInput = {
  attendanceStatus?: EventRegistrationAttendanceStatus | null,
  createdAt?: string | null,
  eventId: string,
  id?: string | null,
  notes?: string | null,
  paymentStatus?: EventRegistrationPaymentStatus | null,
  registrationData?: string | null,
  registrationStatus?: EventRegistrationRegistrationStatus | null,
  studentName?: string | null,
  updatedAt?: string | null,
  userId: string,
};

export type ModelInvitationConditionInput = {
  acceptedAt?: ModelStringInput | null,
  and?: Array< ModelInvitationConditionInput | null > | null,
  bio?: ModelStringInput | null,
  city?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  expiresAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  invitationType?: ModelInvitationInvitationTypeInput | null,
  invitedBy?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  lastSentAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  not?: ModelInvitationConditionInput | null,
  or?: Array< ModelInvitationConditionInput | null > | null,
  phone?: ModelStringInput | null,
  schoolName?: ModelStringInput | null,
  schoolType?: ModelStringInput | null,
  sport?: ModelStringInput | null,
  state?: ModelStringInput | null,
  status?: ModelInvitationStatusInput | null,
  token?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateInvitationInput = {
  acceptedAt?: string | null,
  bio?: string | null,
  city?: string | null,
  createdAt?: string | null,
  email: string,
  expiresAt: string,
  firstName?: string | null,
  id?: string | null,
  invitationType?: InvitationInvitationType | null,
  invitedBy: string,
  lastName?: string | null,
  lastSentAt?: string | null,
  message?: string | null,
  phone?: string | null,
  schoolName?: string | null,
  schoolType?: string | null,
  sport?: string | null,
  state?: string | null,
  status?: InvitationStatus | null,
  token: string,
  updatedAt?: string | null,
};

export type ModelLLCIncorporationConditionInput = {
  and?: Array< ModelLLCIncorporationConditionInput | null > | null,
  businessName?: ModelStringInput | null,
  businessType?: ModelLLCIncorporationBusinessTypeInput | null,
  coachId?: ModelIDInput | null,
  completedAt?: ModelStringInput | null,
  cost?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  documents?: ModelStringInput | null,
  filedAt?: ModelStringInput | null,
  filingData?: ModelStringInput | null,
  not?: ModelLLCIncorporationConditionInput | null,
  or?: Array< ModelLLCIncorporationConditionInput | null > | null,
  owner?: ModelStringInput | null,
  state?: ModelStringInput | null,
  status?: ModelLLCIncorporationStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateLLCIncorporationInput = {
  businessName: string,
  businessType?: LLCIncorporationBusinessType | null,
  coachId: string,
  completedAt?: string | null,
  cost?: number | null,
  createdAt?: string | null,
  documents?: string | null,
  filedAt?: string | null,
  filingData?: string | null,
  id?: string | null,
  state: string,
  status?: LLCIncorporationStatus | null,
  updatedAt?: string | null,
};

export type ModelMessageConditionInput = {
  and?: Array< ModelMessageConditionInput | null > | null,
  attachments?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  messageType?: ModelMessageMessageTypeInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelMessageConditionInput | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelMessagePriorityInput | null,
  readAt?: ModelStringInput | null,
  recipientId?: ModelIDInput | null,
  senderId?: ModelIDInput | null,
  sentAt?: ModelStringInput | null,
  status?: ModelMessageStatusInput | null,
  subject?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMessageInput = {
  attachments?: string | null,
  content: string,
  createdAt?: string | null,
  id?: string | null,
  messageType?: MessageMessageType | null,
  metadata?: string | null,
  priority?: MessagePriority | null,
  readAt?: string | null,
  recipientId: string,
  senderId: string,
  sentAt?: string | null,
  status?: MessageStatus | null,
  subject?: string | null,
};

export type ModelNotificationConditionInput = {
  and?: Array< ModelNotificationConditionInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deliveryChannels?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelNotificationConditionInput | null,
  notificationType?: ModelNotificationNotificationTypeInput | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelNotificationPriorityInput | null,
  scheduledFor?: ModelStringInput | null,
  sentAt?: ModelStringInput | null,
  status?: ModelNotificationStatusInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateNotificationInput = {
  content: string,
  createdAt?: string | null,
  deliveryChannels?: string | null,
  id?: string | null,
  metadata?: string | null,
  notificationType?: NotificationNotificationType | null,
  priority?: NotificationPriority | null,
  scheduledFor?: string | null,
  sentAt?: string | null,
  status?: NotificationStatus | null,
  title: string,
  userId: string,
};

export type ModelOnboardingProgressConditionInput = {
  and?: Array< ModelOnboardingProgressConditionInput | null > | null,
  completedSteps?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currentStep?: ModelOnboardingProgressCurrentStepInput | null,
  email?: ModelStringInput | null,
  invitationBased?: ModelBooleanInput | null,
  invitationId?: ModelStringInput | null,
  lastUpdated?: ModelStringInput | null,
  not?: ModelOnboardingProgressConditionInput | null,
  or?: Array< ModelOnboardingProgressConditionInput | null > | null,
  stepData?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateOnboardingProgressInput = {
  completedSteps?: Array< string | null > | null,
  createdAt?: string | null,
  currentStep?: OnboardingProgressCurrentStep | null,
  email: string,
  id?: string | null,
  invitationBased?: boolean | null,
  invitationId?: string | null,
  lastUpdated?: string | null,
  stepData?: string | null,
  updatedAt?: string | null,
  userId: string,
};

export type ModelParentConditionInput = {
  and?: Array< ModelParentConditionInput | null > | null,
  backgroundInformation?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  employerName?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  generationCodeSuffix?: ModelStringInput | null,
  hispanicLatinoEthnicity?: ModelBooleanInput | null,
  isActive?: ModelBooleanInput | null,
  lastSurname?: ModelStringInput | null,
  loginId?: ModelStringInput | null,
  maidenName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  not?: ModelParentConditionInput | null,
  or?: Array< ModelParentConditionInput | null > | null,
  owner?: ModelStringInput | null,
  parentUSI?: ModelIntInput | null,
  parentUniqueId?: ModelStringInput | null,
  personalEmailAddress?: ModelStringInput | null,
  personalTitlePrefix?: ModelStringInput | null,
  professionDescriptor?: ModelStringInput | null,
  races?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  workEmailAddress?: ModelStringInput | null,
};

export type CreateParentInput = {
  backgroundInformation?: string | null,
  createdAt?: string | null,
  employerName?: string | null,
  firstName: string,
  generationCodeSuffix?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id?: string | null,
  isActive?: boolean | null,
  lastSurname: string,
  loginId?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  parentUSI: number,
  parentUniqueId: string,
  personalEmailAddress?: string | null,
  personalTitlePrefix?: string | null,
  professionDescriptor?: string | null,
  races?: string | null,
  sex?: string | null,
  updatedAt?: string | null,
  workEmailAddress?: string | null,
};

export type ModelPaymentRecordConditionInput = {
  and?: Array< ModelPaymentRecordConditionInput | null > | null,
  applicationId?: ModelStringInput | null,
  coachEmail?: ModelStringInput | null,
  coachPayoutAmount?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  depositAmount?: ModelFloatInput | null,
  isMarketplacePayment?: ModelBooleanInput | null,
  lastPaymentDate?: ModelStringInput | null,
  nextPaymentDue?: ModelStringInput | null,
  not?: ModelPaymentRecordConditionInput | null,
  or?: Array< ModelPaymentRecordConditionInput | null > | null,
  owner?: ModelStringInput | null,
  parentEmail?: ModelStringInput | null,
  paymentHistory?: ModelStringInput | null,
  paymentPlan?: ModelPaymentRecordPaymentPlanInput | null,
  paymentStatus?: ModelPaymentRecordPaymentStatusInput | null,
  platformFeeAmount?: ModelFloatInput | null,
  stripeConnectAccountId?: ModelStringInput | null,
  stripeCustomerId?: ModelStringInput | null,
  stripePaymentIntentId?: ModelStringInput | null,
  stripePaymentLinkId?: ModelStringInput | null,
  studentId?: ModelStringInput | null,
  studentName?: ModelStringInput | null,
  totalPaid?: ModelFloatInput | null,
  tuitionAmount?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePaymentRecordInput = {
  applicationId: string,
  coachEmail: string,
  coachPayoutAmount?: number | null,
  createdAt?: string | null,
  depositAmount: number,
  id?: string | null,
  isMarketplacePayment?: boolean | null,
  lastPaymentDate?: string | null,
  nextPaymentDue?: string | null,
  parentEmail: string,
  paymentHistory?: string | null,
  paymentPlan?: PaymentRecordPaymentPlan | null,
  paymentStatus?: PaymentRecordPaymentStatus | null,
  platformFeeAmount?: number | null,
  stripeConnectAccountId?: string | null,
  stripeCustomerId?: string | null,
  stripePaymentIntentId?: string | null,
  stripePaymentLinkId?: string | null,
  studentId: string,
  studentName: string,
  totalPaid?: number | null,
  tuitionAmount: number,
  updatedAt?: string | null,
};

export type ModelProfileConditionInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelProfileConditionInput | null > | null,
  backgroundCheckDate?: ModelStringInput | null,
  backgroundCheckStatus?: ModelProfileBackgroundCheckStatusInput | null,
  bio?: ModelStringInput | null,
  certifications?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  emergencyContact?: ModelStringInput | null,
  experience?: ModelStringInput | null,
  marketingProgress?: ModelStringInput | null,
  not?: ModelProfileConditionInput | null,
  onboardingComplete?: ModelBooleanInput | null,
  or?: Array< ModelProfileConditionInput | null > | null,
  preferences?: ModelStringInput | null,
  profileType?: ModelProfileProfileTypeInput | null,
  specialties?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  wizardProgress?: ModelStringInput | null,
};

export type CreateProfileInput = {
  address?: string | null,
  backgroundCheckDate?: string | null,
  backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
  bio?: string | null,
  certifications?: Array< string | null > | null,
  createdAt?: string | null,
  emergencyContact?: string | null,
  experience?: string | null,
  id?: string | null,
  marketingProgress?: string | null,
  onboardingComplete?: boolean | null,
  preferences?: string | null,
  profileType?: ProfileProfileType | null,
  specialties?: Array< string | null > | null,
  updatedAt?: string | null,
  userId: string,
  wizardProgress?: string | null,
};

export type ModelQuizConditionInput = {
  and?: Array< ModelQuizConditionInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelIDInput | null,
  description?: ModelStringInput | null,
  difficulty?: ModelQuizDifficultyInput | null,
  isActive?: ModelBooleanInput | null,
  not?: ModelQuizConditionInput | null,
  or?: Array< ModelQuizConditionInput | null > | null,
  passingScore?: ModelIntInput | null,
  questions?: ModelStringInput | null,
  timeLimit?: ModelIntInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateQuizInput = {
  category?: string | null,
  createdAt?: string | null,
  createdBy?: string | null,
  description?: string | null,
  difficulty?: QuizDifficulty | null,
  id?: string | null,
  isActive?: boolean | null,
  passingScore?: number | null,
  questions: string,
  timeLimit?: number | null,
  title: string,
  updatedAt?: string | null,
};

export type ModelQuizAttemptConditionInput = {
  and?: Array< ModelQuizAttemptConditionInput | null > | null,
  answers?: ModelStringInput | null,
  completedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelQuizAttemptConditionInput | null,
  or?: Array< ModelQuizAttemptConditionInput | null > | null,
  owner?: ModelStringInput | null,
  passed?: ModelBooleanInput | null,
  quizId?: ModelIDInput | null,
  score?: ModelIntInput | null,
  startedAt?: ModelStringInput | null,
  timeSpent?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateQuizAttemptInput = {
  answers: string,
  completedAt?: string | null,
  id?: string | null,
  metadata?: string | null,
  passed?: boolean | null,
  quizId: string,
  score?: number | null,
  startedAt: string,
  timeSpent?: number | null,
  userId: string,
};

export type ModelSchoolConditionInput = {
  administrativeFundingControl?: ModelStringInput | null,
  and?: Array< ModelSchoolConditionInput | null > | null,
  charterStatus?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  etag?: ModelStringInput | null,
  gradeLevels?: ModelStringInput | null,
  lastModifiedDate?: ModelStringInput | null,
  localEducationAgencyId?: ModelIntInput | null,
  magnetSpecialProgramEmphasisSchool?: ModelStringInput | null,
  not?: ModelSchoolConditionInput | null,
  or?: Array< ModelSchoolConditionInput | null > | null,
  schoolCategories?: ModelStringInput | null,
  schoolId?: ModelIntInput | null,
  schoolType?: ModelStringInput | null,
  titleIPartASchoolDesignation?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSchoolInput = {
  administrativeFundingControl?: string | null,
  charterStatus?: string | null,
  createdAt?: string | null,
  etag?: string | null,
  gradeLevels?: string | null,
  id?: string | null,
  lastModifiedDate?: string | null,
  localEducationAgencyId?: number | null,
  magnetSpecialProgramEmphasisSchool?: string | null,
  schoolCategories?: string | null,
  schoolId: number,
  schoolType?: string | null,
  titleIPartASchoolDesignation?: string | null,
  updatedAt?: string | null,
};

export type ModelSessionConditionInput = {
  and?: Array< ModelSessionConditionInput | null > | null,
  coachId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  eventId?: ModelIDInput | null,
  feedback?: ModelStringInput | null,
  location?: ModelStringInput | null,
  not?: ModelSessionConditionInput | null,
  notes?: ModelStringInput | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  participants?: ModelStringInput | null,
  scheduledDate?: ModelStringInput | null,
  sessionType?: ModelSessionSessionTypeInput | null,
  status?: ModelSessionStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSessionInput = {
  coachId: string,
  createdAt?: string | null,
  duration?: number | null,
  eventId?: string | null,
  feedback?: string | null,
  id?: string | null,
  location?: string | null,
  notes?: string | null,
  participants?: string | null,
  scheduledDate: string,
  sessionType?: SessionSessionType | null,
  status?: SessionStatus | null,
  updatedAt?: string | null,
};

export type ModelStaffConditionInput = {
  and?: Array< ModelStaffConditionInput | null > | null,
  birthDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  generationCodeSuffix?: ModelStringInput | null,
  highestCompletedLevelOfEducation?: ModelStringInput | null,
  hispanicLatinoEthnicity?: ModelBooleanInput | null,
  isActive?: ModelBooleanInput | null,
  lastSurname?: ModelStringInput | null,
  loginId?: ModelStringInput | null,
  maidenName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  not?: ModelStaffConditionInput | null,
  or?: Array< ModelStaffConditionInput | null > | null,
  owner?: ModelStringInput | null,
  personalEmailAddress?: ModelStringInput | null,
  personalTitlePrefix?: ModelStringInput | null,
  races?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  staffUSI?: ModelIntInput | null,
  staffUniqueId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  workEmailAddress?: ModelStringInput | null,
  yearsOfPriorProfessionalExperience?: ModelFloatInput | null,
};

export type CreateStaffInput = {
  birthDate?: string | null,
  createdAt?: string | null,
  firstName: string,
  generationCodeSuffix?: string | null,
  highestCompletedLevelOfEducation?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id?: string | null,
  isActive?: boolean | null,
  lastSurname: string,
  loginId?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  personalEmailAddress?: string | null,
  personalTitlePrefix?: string | null,
  races?: string | null,
  sex?: string | null,
  staffUSI: number,
  staffUniqueId: string,
  updatedAt?: string | null,
  workEmailAddress?: string | null,
  yearsOfPriorProfessionalExperience?: number | null,
};

export type ModelStaffSchoolAssociationConditionInput = {
  and?: Array< ModelStaffSchoolAssociationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  employmentStatus?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  hireDate?: ModelStringInput | null,
  not?: ModelStaffSchoolAssociationConditionInput | null,
  or?: Array< ModelStaffSchoolAssociationConditionInput | null > | null,
  programAssignment?: ModelStringInput | null,
  schoolId?: ModelIntInput | null,
  schoolYear?: ModelIntInput | null,
  staffUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStaffSchoolAssociationInput = {
  createdAt?: string | null,
  employmentStatus?: string | null,
  endDate?: string | null,
  hireDate?: string | null,
  id?: string | null,
  programAssignment: string,
  schoolId: number,
  schoolYear?: number | null,
  staffUSI: number,
  updatedAt?: string | null,
};

export type ModelStudentConditionInput = {
  admissionDate?: ModelStringInput | null,
  and?: Array< ModelStudentConditionInput | null > | null,
  applicationDate?: ModelStringInput | null,
  birthCity?: ModelStringInput | null,
  birthCountry?: ModelStringInput | null,
  birthDate?: ModelStringInput | null,
  birthStateAbbreviation?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  generationCodeSuffix?: ModelStringInput | null,
  hispanicLatinoEthnicity?: ModelBooleanInput | null,
  lastSurname?: ModelStringInput | null,
  maidenName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  not?: ModelStudentConditionInput | null,
  or?: Array< ModelStudentConditionInput | null > | null,
  personalTitlePrefix?: ModelStringInput | null,
  races?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  studentApplicationStatus?: ModelStudentStudentApplicationStatusInput | null,
  studentUSI?: ModelIntInput | null,
  studentUniqueId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStudentInput = {
  admissionDate?: string | null,
  applicationDate?: string | null,
  birthCity?: string | null,
  birthCountry?: string | null,
  birthDate?: string | null,
  birthStateAbbreviation?: string | null,
  createdAt?: string | null,
  firstName: string,
  generationCodeSuffix?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id?: string | null,
  lastSurname: string,
  maidenName?: string | null,
  middleName?: string | null,
  personalTitlePrefix?: string | null,
  races?: string | null,
  sex?: string | null,
  studentApplicationStatus?: StudentStudentApplicationStatus | null,
  studentUSI: number,
  studentUniqueId: string,
  updatedAt?: string | null,
};

export type ModelStudentDocumentConditionInput = {
  and?: Array< ModelStudentDocumentConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  documentCategoryId?: ModelIntInput | null,
  documentDescription?: ModelStringInput | null,
  documentHash?: ModelStringInput | null,
  documentTitle?: ModelStringInput | null,
  expirationDate?: ModelStringInput | null,
  fileName?: ModelStringInput | null,
  fileSize?: ModelIntInput | null,
  isConfidential?: ModelBooleanInput | null,
  mimeType?: ModelStringInput | null,
  not?: ModelStudentDocumentConditionInput | null,
  or?: Array< ModelStudentDocumentConditionInput | null > | null,
  reviewComments?: ModelStringInput | null,
  reviewDate?: ModelStringInput | null,
  reviewStatus?: ModelStudentDocumentReviewStatusInput | null,
  reviewedByStaffUSI?: ModelIntInput | null,
  storageLocation?: ModelStringInput | null,
  studentUSI?: ModelIntInput | null,
  submittedByParentUSI?: ModelIntInput | null,
  submittedDate?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStudentDocumentInput = {
  createdAt?: string | null,
  documentCategoryId: number,
  documentDescription?: string | null,
  documentHash?: string | null,
  documentTitle: string,
  expirationDate?: string | null,
  fileName?: string | null,
  fileSize?: number | null,
  id?: string | null,
  isConfidential?: boolean | null,
  mimeType?: string | null,
  reviewComments?: string | null,
  reviewDate?: string | null,
  reviewStatus?: StudentDocumentReviewStatus | null,
  reviewedByStaffUSI?: number | null,
  storageLocation?: string | null,
  studentUSI: number,
  submittedByParentUSI?: number | null,
  submittedDate?: string | null,
  updatedAt?: string | null,
};

export type ModelStudentEducationOrganizationResponsibleContactPersonConditionInput = {
  and?: Array< ModelStudentEducationOrganizationResponsibleContactPersonConditionInput | null > | null,
  contactAddress?: ModelStringInput | null,
  contactEmailAddress?: ModelStringInput | null,
  contactTelephones?: ModelStringInput | null,
  contactTitle?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  educationOrganizationId?: ModelIntInput | null,
  emergencyContactStatus?: ModelBooleanInput | null,
  firstName?: ModelStringInput | null,
  lastSurname?: ModelStringInput | null,
  not?: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput | null,
  or?: Array< ModelStudentEducationOrganizationResponsibleContactPersonConditionInput | null > | null,
  primaryContactStatus?: ModelBooleanInput | null,
  relation?: ModelStringInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStudentEducationOrganizationResponsibleContactPersonInput = {
  contactAddress?: string | null,
  contactEmailAddress?: string | null,
  contactTelephones?: string | null,
  contactTitle?: string | null,
  createdAt?: string | null,
  educationOrganizationId: number,
  emergencyContactStatus?: boolean | null,
  firstName: string,
  id?: string | null,
  lastSurname: string,
  primaryContactStatus?: boolean | null,
  relation?: string | null,
  studentUSI: number,
  updatedAt?: string | null,
};

export type ModelStudentParentAssociationConditionInput = {
  and?: Array< ModelStudentParentAssociationConditionInput | null > | null,
  contactPriority?: ModelIntInput | null,
  contactRestrictions?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  custodyStatus?: ModelStudentParentAssociationCustodyStatusInput | null,
  emergencyContactStatus?: ModelBooleanInput | null,
  legalGuardian?: ModelBooleanInput | null,
  livesWith?: ModelBooleanInput | null,
  not?: ModelStudentParentAssociationConditionInput | null,
  or?: Array< ModelStudentParentAssociationConditionInput | null > | null,
  parentUSI?: ModelIntInput | null,
  primaryContactStatus?: ModelBooleanInput | null,
  relation?: ModelStudentParentAssociationRelationInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStudentParentAssociationInput = {
  contactPriority?: number | null,
  contactRestrictions?: string | null,
  createdAt?: string | null,
  custodyStatus?: StudentParentAssociationCustodyStatus | null,
  emergencyContactStatus?: boolean | null,
  id?: string | null,
  legalGuardian?: boolean | null,
  livesWith?: boolean | null,
  parentUSI: number,
  primaryContactStatus?: boolean | null,
  relation?: StudentParentAssociationRelation | null,
  studentUSI: number,
  updatedAt?: string | null,
};

export type ModelStudentSchoolAssociationConditionInput = {
  admissionStatus?: ModelStringInput | null,
  and?: Array< ModelStudentSchoolAssociationConditionInput | null > | null,
  applicationStatus?: ModelStringInput | null,
  classOfSchoolYear?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  entryDate?: ModelStringInput | null,
  entryGradeLevel?: ModelStringInput | null,
  entryType?: ModelStringInput | null,
  exitWithdrawDate?: ModelStringInput | null,
  exitWithdrawType?: ModelStringInput | null,
  not?: ModelStudentSchoolAssociationConditionInput | null,
  or?: Array< ModelStudentSchoolAssociationConditionInput | null > | null,
  repeatGradeIndicator?: ModelBooleanInput | null,
  schoolId?: ModelIntInput | null,
  schoolYear?: ModelIntInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStudentSchoolAssociationInput = {
  admissionStatus?: string | null,
  applicationStatus?: string | null,
  classOfSchoolYear?: number | null,
  createdAt?: string | null,
  entryDate: string,
  entryGradeLevel?: string | null,
  entryType?: string | null,
  exitWithdrawDate?: string | null,
  exitWithdrawType?: string | null,
  id?: string | null,
  repeatGradeIndicator?: boolean | null,
  schoolId: number,
  schoolYear: number,
  studentUSI: number,
  updatedAt?: string | null,
};

export type ModelTuitionSettingConditionInput = {
  allowPaymentPlans?: ModelBooleanInput | null,
  and?: Array< ModelTuitionSettingConditionInput | null > | null,
  coachEmail?: ModelStringInput | null,
  coachId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  currency?: ModelStringInput | null,
  defaultDeposit?: ModelFloatInput | null,
  defaultTuition?: ModelFloatInput | null,
  marketplaceEnabled?: ModelBooleanInput | null,
  not?: ModelTuitionSettingConditionInput | null,
  or?: Array< ModelTuitionSettingConditionInput | null > | null,
  owner?: ModelStringInput | null,
  paymentPlanOptions?: ModelStringInput | null,
  platformFeePercent?: ModelFloatInput | null,
  stripeConnectAccountId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTuitionSettingInput = {
  allowPaymentPlans?: boolean | null,
  coachEmail: string,
  coachId: string,
  createdAt?: string | null,
  currency?: string | null,
  defaultDeposit: number,
  defaultTuition: number,
  id?: string | null,
  marketplaceEnabled?: boolean | null,
  paymentPlanOptions: string,
  platformFeePercent?: number | null,
  stripeConnectAccountId?: string | null,
  updatedAt?: string | null,
};

export type ModelUserConditionInput = {
  amplifyUserId?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastLoginAt?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  parentUSI?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  staffUSI?: ModelIntInput | null,
  status?: ModelUserStatusInput | null,
  studentUSI?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserInput = {
  amplifyUserId?: string | null,
  createdAt?: string | null,
  email: string,
  firstName?: string | null,
  id?: string | null,
  lastLoginAt?: string | null,
  lastName?: string | null,
  parentUSI?: number | null,
  phone?: string | null,
  role?: UserRole | null,
  staffUSI?: number | null,
  status?: UserStatus | null,
  studentUSI?: number | null,
  updatedAt?: string | null,
};

export type DeleteAnalyticsEventInput = {
  id: string,
};

export type DeleteApiKeyInput = {
  id: string,
};

export type DeleteApiKeyRotationInput = {
  id: string,
};

export type DeleteApiKeyUsageInput = {
  id: string,
};

export type DeleteAuditLogInput = {
  id: string,
};

export type DeleteCoachPayoutInput = {
  id: string,
};

export type DeleteDescriptorInput = {
  id: string,
};

export type DeleteDocumentCategoryInput = {
  id: string,
};

export type DeleteEducationOrganizationInput = {
  id: string,
};

export type DeleteEnrollmentInput = {
  id: string,
};

export type DeleteEventInput = {
  id: string,
};

export type DeleteEventRegistrationInput = {
  id: string,
};

export type DeleteInvitationInput = {
  id: string,
};

export type DeleteLLCIncorporationInput = {
  id: string,
};

export type DeleteMessageInput = {
  id: string,
};

export type DeleteNotificationInput = {
  id: string,
};

export type DeleteOnboardingProgressInput = {
  id: string,
};

export type DeleteParentInput = {
  id: string,
};

export type DeletePaymentRecordInput = {
  id: string,
};

export type DeleteProfileInput = {
  id: string,
};

export type DeleteQuizInput = {
  id: string,
};

export type DeleteQuizAttemptInput = {
  id: string,
};

export type DeleteSchoolInput = {
  id: string,
};

export type DeleteSessionInput = {
  id: string,
};

export type DeleteStaffInput = {
  id: string,
};

export type DeleteStaffSchoolAssociationInput = {
  id: string,
};

export type DeleteStudentInput = {
  id: string,
};

export type DeleteStudentDocumentInput = {
  id: string,
};

export type DeleteStudentEducationOrganizationResponsibleContactPersonInput = {
  id: string,
};

export type DeleteStudentParentAssociationInput = {
  id: string,
};

export type DeleteStudentSchoolAssociationInput = {
  id: string,
};

export type DeleteTuitionSettingInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateAnalyticsEventInput = {
  createdAt?: string | null,
  eventName?: string | null,
  id: string,
  ipAddress?: string | null,
  properties?: string | null,
  referrer?: string | null,
  sessionId?: string | null,
  timestamp?: string | null,
  userAgent?: string | null,
  userId?: string | null,
  utmCampaign?: string | null,
  utmContent?: string | null,
  utmMedium?: string | null,
  utmSource?: string | null,
  utmTerm?: string | null,
};

export type UpdateApiKeyInput = {
  createdAt?: string | null,
  createdBy?: string | null,
  description?: string | null,
  expiresAt?: string | null,
  id: string,
  ipWhitelist?: Array< string | null > | null,
  isActive?: boolean | null,
  keyHash?: string | null,
  keyPrefix?: string | null,
  lastRotatedAt?: string | null,
  lastSecurityIncident?: string | null,
  lastUsedAt?: string | null,
  metadata?: string | null,
  name?: string | null,
  permissions?: Array< string | null > | null,
  rateLimitDaily?: number | null,
  rateLimitMinute?: number | null,
  securityIncidents?: number | null,
  updatedAt?: string | null,
  usageCount?: number | null,
};

export type UpdateApiKeyRotationInput = {
  createdAt?: string | null,
  gracePeriodEnd?: string | null,
  id: string,
  newKeyId?: string | null,
  oldKeyDeactivated?: boolean | null,
  oldKeyId?: string | null,
  reason?: string | null,
  rotatedBy?: string | null,
  rotationType?: ApiKeyRotationRotationType | null,
};

export type UpdateApiKeyUsageInput = {
  createdAt?: string | null,
  endpoint?: string | null,
  id: string,
  ipAddress?: string | null,
  keyId?: string | null,
  keyPrefix?: string | null,
  metadata?: string | null,
  method?: string | null,
  permissions?: Array< string | null > | null,
  rateLimitHit?: boolean | null,
  requestSize?: number | null,
  responseSize?: number | null,
  responseStatus?: number | null,
  responseTime?: number | null,
  securityViolation?: string | null,
  timestamp?: string | null,
  userAgent?: string | null,
};

export type UpdateAuditLogInput = {
  action?: string | null,
  changes?: string | null,
  id: string,
  ipAddress?: string | null,
  metadata?: string | null,
  resource?: string | null,
  resourceId?: string | null,
  timestamp?: string | null,
  userAgent?: string | null,
  userId?: string | null,
};

export type UpdateCoachPayoutInput = {
  coachEmail?: string | null,
  createdAt?: string | null,
  description?: string | null,
  id: string,
  metadata?: string | null,
  payoutAmount?: number | null,
  payoutDate?: string | null,
  payoutStatus?: CoachPayoutPayoutStatus | null,
  payoutType?: CoachPayoutPayoutType | null,
  stripeConnectAccountId?: string | null,
  stripePayout?: string | null,
  updatedAt?: string | null,
};

export type UpdateDescriptorInput = {
  codeValue?: string | null,
  createdAt?: string | null,
  description?: string | null,
  descriptorId?: number | null,
  effectiveBeginDate?: string | null,
  effectiveEndDate?: string | null,
  id: string,
  namespace?: string | null,
  priorDescriptorId?: number | null,
  shortDescription?: string | null,
  updatedAt?: string | null,
};

export type UpdateDocumentCategoryInput = {
  categoryDescription?: string | null,
  categoryName?: string | null,
  createdAt?: string | null,
  documentCategoryId?: number | null,
  id: string,
  isActive?: boolean | null,
  isRequired?: boolean | null,
  sortOrder?: number | null,
  updatedAt?: string | null,
};

export type UpdateEducationOrganizationInput = {
  addresses?: string | null,
  createdAt?: string | null,
  educationOrganizationId?: number | null,
  etag?: string | null,
  id: string,
  lastModifiedDate?: string | null,
  nameOfInstitution?: string | null,
  operationalStatus?: string | null,
  shortNameOfInstitution?: string | null,
  telephones?: string | null,
  updatedAt?: string | null,
  webSite?: string | null,
};

export type UpdateEnrollmentInput = {
  academicYear?: string | null,
  applicationData?: string | null,
  coachName?: string | null,
  createdAt?: string | null,
  currentStep?: number | null,
  documents?: string | null,
  enrollmentType?: EnrollmentEnrollmentType | null,
  id: string,
  parentId?: string | null,
  schoolPreferences?: string | null,
  sportInterest?: string | null,
  startDate?: string | null,
  status?: EnrollmentStatus | null,
  studentAge?: number | null,
  studentGrade?: string | null,
  studentName?: string | null,
  timelineStatus?: EnrollmentTimelineStatus | null,
  timelineSteps?: string | null,
  totalSteps?: number | null,
  tuitionPlan?: string | null,
  updatedAt?: string | null,
};

export type UpdateEventInput = {
  address?: string | null,
  ageGroups?: Array< string | null > | null,
  capacity?: number | null,
  coachId?: string | null,
  coachName?: string | null,
  createdAt?: string | null,
  currency?: string | null,
  description?: string | null,
  endDate?: string | null,
  equipment?: Array< string | null > | null,
  eventType?: EventEventType | null,
  googleCalendarEventId?: string | null,
  googleCalendarLastSynced?: string | null,
  googleCalendarSyncEnabled?: boolean | null,
  googleMeetUrl?: string | null,
  id: string,
  images?: Array< string | null > | null,
  isOnline?: boolean | null,
  isPublic?: boolean | null,
  location?: string | null,
  meetingUrl?: string | null,
  price?: number | null,
  registeredCount?: number | null,
  registrationDeadline?: string | null,
  requirements?: Array< string | null > | null,
  shortDescription?: string | null,
  skillLevel?: EventSkillLevel | null,
  startDate?: string | null,
  status?: EventStatus | null,
  tags?: Array< string | null > | null,
  timezone?: string | null,
  title?: string | null,
  updatedAt?: string | null,
  venue?: string | null,
};

export type UpdateEventRegistrationInput = {
  attendanceStatus?: EventRegistrationAttendanceStatus | null,
  createdAt?: string | null,
  eventId?: string | null,
  id: string,
  notes?: string | null,
  paymentStatus?: EventRegistrationPaymentStatus | null,
  registrationData?: string | null,
  registrationStatus?: EventRegistrationRegistrationStatus | null,
  studentName?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
};

export type UpdateInvitationInput = {
  acceptedAt?: string | null,
  bio?: string | null,
  city?: string | null,
  createdAt?: string | null,
  email?: string | null,
  expiresAt?: string | null,
  firstName?: string | null,
  id: string,
  invitationType?: InvitationInvitationType | null,
  invitedBy?: string | null,
  lastName?: string | null,
  lastSentAt?: string | null,
  message?: string | null,
  phone?: string | null,
  schoolName?: string | null,
  schoolType?: string | null,
  sport?: string | null,
  state?: string | null,
  status?: InvitationStatus | null,
  token?: string | null,
  updatedAt?: string | null,
};

export type UpdateLLCIncorporationInput = {
  businessName?: string | null,
  businessType?: LLCIncorporationBusinessType | null,
  coachId?: string | null,
  completedAt?: string | null,
  cost?: number | null,
  createdAt?: string | null,
  documents?: string | null,
  filedAt?: string | null,
  filingData?: string | null,
  id: string,
  state?: string | null,
  status?: LLCIncorporationStatus | null,
  updatedAt?: string | null,
};

export type UpdateMessageInput = {
  attachments?: string | null,
  content?: string | null,
  createdAt?: string | null,
  id: string,
  messageType?: MessageMessageType | null,
  metadata?: string | null,
  priority?: MessagePriority | null,
  readAt?: string | null,
  recipientId?: string | null,
  senderId?: string | null,
  sentAt?: string | null,
  status?: MessageStatus | null,
  subject?: string | null,
};

export type UpdateNotificationInput = {
  content?: string | null,
  createdAt?: string | null,
  deliveryChannels?: string | null,
  id: string,
  metadata?: string | null,
  notificationType?: NotificationNotificationType | null,
  priority?: NotificationPriority | null,
  scheduledFor?: string | null,
  sentAt?: string | null,
  status?: NotificationStatus | null,
  title?: string | null,
  userId?: string | null,
};

export type UpdateOnboardingProgressInput = {
  completedSteps?: Array< string | null > | null,
  createdAt?: string | null,
  currentStep?: OnboardingProgressCurrentStep | null,
  email?: string | null,
  id: string,
  invitationBased?: boolean | null,
  invitationId?: string | null,
  lastUpdated?: string | null,
  stepData?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
};

export type UpdateParentInput = {
  backgroundInformation?: string | null,
  createdAt?: string | null,
  employerName?: string | null,
  firstName?: string | null,
  generationCodeSuffix?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id: string,
  isActive?: boolean | null,
  lastSurname?: string | null,
  loginId?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  parentUSI?: number | null,
  parentUniqueId?: string | null,
  personalEmailAddress?: string | null,
  personalTitlePrefix?: string | null,
  professionDescriptor?: string | null,
  races?: string | null,
  sex?: string | null,
  updatedAt?: string | null,
  workEmailAddress?: string | null,
};

export type UpdatePaymentRecordInput = {
  applicationId?: string | null,
  coachEmail?: string | null,
  coachPayoutAmount?: number | null,
  createdAt?: string | null,
  depositAmount?: number | null,
  id: string,
  isMarketplacePayment?: boolean | null,
  lastPaymentDate?: string | null,
  nextPaymentDue?: string | null,
  parentEmail?: string | null,
  paymentHistory?: string | null,
  paymentPlan?: PaymentRecordPaymentPlan | null,
  paymentStatus?: PaymentRecordPaymentStatus | null,
  platformFeeAmount?: number | null,
  stripeConnectAccountId?: string | null,
  stripeCustomerId?: string | null,
  stripePaymentIntentId?: string | null,
  stripePaymentLinkId?: string | null,
  studentId?: string | null,
  studentName?: string | null,
  totalPaid?: number | null,
  tuitionAmount?: number | null,
  updatedAt?: string | null,
};

export type UpdateProfileInput = {
  address?: string | null,
  backgroundCheckDate?: string | null,
  backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
  bio?: string | null,
  certifications?: Array< string | null > | null,
  createdAt?: string | null,
  emergencyContact?: string | null,
  experience?: string | null,
  id: string,
  marketingProgress?: string | null,
  onboardingComplete?: boolean | null,
  preferences?: string | null,
  profileType?: ProfileProfileType | null,
  specialties?: Array< string | null > | null,
  updatedAt?: string | null,
  userId?: string | null,
  wizardProgress?: string | null,
};

export type UpdateQuizInput = {
  category?: string | null,
  createdAt?: string | null,
  createdBy?: string | null,
  description?: string | null,
  difficulty?: QuizDifficulty | null,
  id: string,
  isActive?: boolean | null,
  passingScore?: number | null,
  questions?: string | null,
  timeLimit?: number | null,
  title?: string | null,
  updatedAt?: string | null,
};

export type UpdateQuizAttemptInput = {
  answers?: string | null,
  completedAt?: string | null,
  id: string,
  metadata?: string | null,
  passed?: boolean | null,
  quizId?: string | null,
  score?: number | null,
  startedAt?: string | null,
  timeSpent?: number | null,
  userId?: string | null,
};

export type UpdateSchoolInput = {
  administrativeFundingControl?: string | null,
  charterStatus?: string | null,
  createdAt?: string | null,
  etag?: string | null,
  gradeLevels?: string | null,
  id: string,
  lastModifiedDate?: string | null,
  localEducationAgencyId?: number | null,
  magnetSpecialProgramEmphasisSchool?: string | null,
  schoolCategories?: string | null,
  schoolId?: number | null,
  schoolType?: string | null,
  titleIPartASchoolDesignation?: string | null,
  updatedAt?: string | null,
};

export type UpdateSessionInput = {
  coachId?: string | null,
  createdAt?: string | null,
  duration?: number | null,
  eventId?: string | null,
  feedback?: string | null,
  id: string,
  location?: string | null,
  notes?: string | null,
  participants?: string | null,
  scheduledDate?: string | null,
  sessionType?: SessionSessionType | null,
  status?: SessionStatus | null,
  updatedAt?: string | null,
};

export type UpdateStaffInput = {
  birthDate?: string | null,
  createdAt?: string | null,
  firstName?: string | null,
  generationCodeSuffix?: string | null,
  highestCompletedLevelOfEducation?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id: string,
  isActive?: boolean | null,
  lastSurname?: string | null,
  loginId?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  personalEmailAddress?: string | null,
  personalTitlePrefix?: string | null,
  races?: string | null,
  sex?: string | null,
  staffUSI?: number | null,
  staffUniqueId?: string | null,
  updatedAt?: string | null,
  workEmailAddress?: string | null,
  yearsOfPriorProfessionalExperience?: number | null,
};

export type UpdateStaffSchoolAssociationInput = {
  createdAt?: string | null,
  employmentStatus?: string | null,
  endDate?: string | null,
  hireDate?: string | null,
  id: string,
  programAssignment?: string | null,
  schoolId?: number | null,
  schoolYear?: number | null,
  staffUSI?: number | null,
  updatedAt?: string | null,
};

export type UpdateStudentInput = {
  admissionDate?: string | null,
  applicationDate?: string | null,
  birthCity?: string | null,
  birthCountry?: string | null,
  birthDate?: string | null,
  birthStateAbbreviation?: string | null,
  createdAt?: string | null,
  firstName?: string | null,
  generationCodeSuffix?: string | null,
  hispanicLatinoEthnicity?: boolean | null,
  id: string,
  lastSurname?: string | null,
  maidenName?: string | null,
  middleName?: string | null,
  personalTitlePrefix?: string | null,
  races?: string | null,
  sex?: string | null,
  studentApplicationStatus?: StudentStudentApplicationStatus | null,
  studentUSI?: number | null,
  studentUniqueId?: string | null,
  updatedAt?: string | null,
};

export type UpdateStudentDocumentInput = {
  createdAt?: string | null,
  documentCategoryId?: number | null,
  documentDescription?: string | null,
  documentHash?: string | null,
  documentTitle?: string | null,
  expirationDate?: string | null,
  fileName?: string | null,
  fileSize?: number | null,
  id: string,
  isConfidential?: boolean | null,
  mimeType?: string | null,
  reviewComments?: string | null,
  reviewDate?: string | null,
  reviewStatus?: StudentDocumentReviewStatus | null,
  reviewedByStaffUSI?: number | null,
  storageLocation?: string | null,
  studentUSI?: number | null,
  submittedByParentUSI?: number | null,
  submittedDate?: string | null,
  updatedAt?: string | null,
};

export type UpdateStudentEducationOrganizationResponsibleContactPersonInput = {
  contactAddress?: string | null,
  contactEmailAddress?: string | null,
  contactTelephones?: string | null,
  contactTitle?: string | null,
  createdAt?: string | null,
  educationOrganizationId?: number | null,
  emergencyContactStatus?: boolean | null,
  firstName?: string | null,
  id: string,
  lastSurname?: string | null,
  primaryContactStatus?: boolean | null,
  relation?: string | null,
  studentUSI?: number | null,
  updatedAt?: string | null,
};

export type UpdateStudentParentAssociationInput = {
  contactPriority?: number | null,
  contactRestrictions?: string | null,
  createdAt?: string | null,
  custodyStatus?: StudentParentAssociationCustodyStatus | null,
  emergencyContactStatus?: boolean | null,
  id: string,
  legalGuardian?: boolean | null,
  livesWith?: boolean | null,
  parentUSI?: number | null,
  primaryContactStatus?: boolean | null,
  relation?: StudentParentAssociationRelation | null,
  studentUSI?: number | null,
  updatedAt?: string | null,
};

export type UpdateStudentSchoolAssociationInput = {
  admissionStatus?: string | null,
  applicationStatus?: string | null,
  classOfSchoolYear?: number | null,
  createdAt?: string | null,
  entryDate?: string | null,
  entryGradeLevel?: string | null,
  entryType?: string | null,
  exitWithdrawDate?: string | null,
  exitWithdrawType?: string | null,
  id: string,
  repeatGradeIndicator?: boolean | null,
  schoolId?: number | null,
  schoolYear?: number | null,
  studentUSI?: number | null,
  updatedAt?: string | null,
};

export type UpdateTuitionSettingInput = {
  allowPaymentPlans?: boolean | null,
  coachEmail?: string | null,
  coachId?: string | null,
  createdAt?: string | null,
  currency?: string | null,
  defaultDeposit?: number | null,
  defaultTuition?: number | null,
  id: string,
  marketplaceEnabled?: boolean | null,
  paymentPlanOptions?: string | null,
  platformFeePercent?: number | null,
  stripeConnectAccountId?: string | null,
  updatedAt?: string | null,
};

export type UpdateUserInput = {
  amplifyUserId?: string | null,
  createdAt?: string | null,
  email?: string | null,
  firstName?: string | null,
  id: string,
  lastLoginAt?: string | null,
  lastName?: string | null,
  parentUSI?: number | null,
  phone?: string | null,
  role?: UserRole | null,
  staffUSI?: number | null,
  status?: UserStatus | null,
  studentUSI?: number | null,
  updatedAt?: string | null,
};

export type ModelSubscriptionAnalyticsEventFilterInput = {
  and?: Array< ModelSubscriptionAnalyticsEventFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  eventName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  ipAddress?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionAnalyticsEventFilterInput | null > | null,
  properties?: ModelSubscriptionStringInput | null,
  referrer?: ModelSubscriptionStringInput | null,
  sessionId?: ModelSubscriptionStringInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userAgent?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  utmCampaign?: ModelSubscriptionStringInput | null,
  utmContent?: ModelSubscriptionStringInput | null,
  utmMedium?: ModelSubscriptionStringInput | null,
  utmSource?: ModelSubscriptionStringInput | null,
  utmTerm?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionApiKeyFilterInput = {
  and?: Array< ModelSubscriptionApiKeyFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  expiresAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  ipWhitelist?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  keyHash?: ModelSubscriptionStringInput | null,
  keyPrefix?: ModelSubscriptionStringInput | null,
  lastRotatedAt?: ModelSubscriptionStringInput | null,
  lastSecurityIncident?: ModelSubscriptionStringInput | null,
  lastUsedAt?: ModelSubscriptionStringInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionApiKeyFilterInput | null > | null,
  permissions?: ModelSubscriptionStringInput | null,
  rateLimitDaily?: ModelSubscriptionIntInput | null,
  rateLimitMinute?: ModelSubscriptionIntInput | null,
  securityIncidents?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  usageCount?: ModelSubscriptionIntInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionApiKeyRotationFilterInput = {
  and?: Array< ModelSubscriptionApiKeyRotationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gracePeriodEnd?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  newKeyId?: ModelSubscriptionIDInput | null,
  oldKeyDeactivated?: ModelSubscriptionBooleanInput | null,
  oldKeyId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionApiKeyRotationFilterInput | null > | null,
  reason?: ModelSubscriptionStringInput | null,
  rotatedBy?: ModelSubscriptionIDInput | null,
  rotationType?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionApiKeyUsageFilterInput = {
  and?: Array< ModelSubscriptionApiKeyUsageFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  endpoint?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  ipAddress?: ModelSubscriptionStringInput | null,
  keyId?: ModelSubscriptionIDInput | null,
  keyPrefix?: ModelSubscriptionStringInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  method?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionApiKeyUsageFilterInput | null > | null,
  permissions?: ModelSubscriptionStringInput | null,
  rateLimitHit?: ModelSubscriptionBooleanInput | null,
  requestSize?: ModelSubscriptionIntInput | null,
  responseSize?: ModelSubscriptionIntInput | null,
  responseStatus?: ModelSubscriptionIntInput | null,
  responseTime?: ModelSubscriptionIntInput | null,
  securityViolation?: ModelSubscriptionStringInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userAgent?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionAuditLogFilterInput = {
  action?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAuditLogFilterInput | null > | null,
  changes?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  ipAddress?: ModelSubscriptionStringInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionAuditLogFilterInput | null > | null,
  resource?: ModelSubscriptionStringInput | null,
  resourceId?: ModelSubscriptionStringInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userAgent?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionCoachPayoutFilterInput = {
  and?: Array< ModelSubscriptionCoachPayoutFilterInput | null > | null,
  coachEmail?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCoachPayoutFilterInput | null > | null,
  owner?: ModelStringInput | null,
  payoutAmount?: ModelSubscriptionFloatInput | null,
  payoutDate?: ModelSubscriptionStringInput | null,
  payoutStatus?: ModelSubscriptionStringInput | null,
  payoutType?: ModelSubscriptionStringInput | null,
  stripeConnectAccountId?: ModelSubscriptionStringInput | null,
  stripePayout?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionDescriptorFilterInput = {
  and?: Array< ModelSubscriptionDescriptorFilterInput | null > | null,
  codeValue?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  descriptorId?: ModelSubscriptionIntInput | null,
  effectiveBeginDate?: ModelSubscriptionStringInput | null,
  effectiveEndDate?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  namespace?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionDescriptorFilterInput | null > | null,
  priorDescriptorId?: ModelSubscriptionIntInput | null,
  shortDescription?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionDocumentCategoryFilterInput = {
  and?: Array< ModelSubscriptionDocumentCategoryFilterInput | null > | null,
  categoryDescription?: ModelSubscriptionStringInput | null,
  categoryName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  documentCategoryId?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  isRequired?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionDocumentCategoryFilterInput | null > | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionEducationOrganizationFilterInput = {
  addresses?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEducationOrganizationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  educationOrganizationId?: ModelSubscriptionIntInput | null,
  etag?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastModifiedDate?: ModelSubscriptionStringInput | null,
  nameOfInstitution?: ModelSubscriptionStringInput | null,
  operationalStatus?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionEducationOrganizationFilterInput | null > | null,
  shortNameOfInstitution?: ModelSubscriptionStringInput | null,
  telephones?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  webSite?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionEnrollmentFilterInput = {
  academicYear?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEnrollmentFilterInput | null > | null,
  applicationData?: ModelSubscriptionStringInput | null,
  coachName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  currentStep?: ModelSubscriptionIntInput | null,
  documents?: ModelSubscriptionStringInput | null,
  enrollmentType?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionEnrollmentFilterInput | null > | null,
  parentId?: ModelSubscriptionIDInput | null,
  schoolPreferences?: ModelSubscriptionStringInput | null,
  sportInterest?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  studentAge?: ModelSubscriptionIntInput | null,
  studentGrade?: ModelSubscriptionStringInput | null,
  studentName?: ModelSubscriptionStringInput | null,
  timelineStatus?: ModelSubscriptionStringInput | null,
  timelineSteps?: ModelSubscriptionStringInput | null,
  totalSteps?: ModelSubscriptionIntInput | null,
  tuitionPlan?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionEventFilterInput = {
  address?: ModelSubscriptionStringInput | null,
  ageGroups?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEventFilterInput | null > | null,
  capacity?: ModelSubscriptionIntInput | null,
  coachId?: ModelSubscriptionIDInput | null,
  coachName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  currency?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  equipment?: ModelSubscriptionStringInput | null,
  eventType?: ModelSubscriptionStringInput | null,
  googleCalendarEventId?: ModelSubscriptionStringInput | null,
  googleCalendarLastSynced?: ModelSubscriptionStringInput | null,
  googleCalendarSyncEnabled?: ModelSubscriptionBooleanInput | null,
  googleMeetUrl?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  images?: ModelSubscriptionStringInput | null,
  isOnline?: ModelSubscriptionBooleanInput | null,
  isPublic?: ModelSubscriptionBooleanInput | null,
  location?: ModelSubscriptionStringInput | null,
  meetingUrl?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionEventFilterInput | null > | null,
  owner?: ModelStringInput | null,
  price?: ModelSubscriptionFloatInput | null,
  registeredCount?: ModelSubscriptionIntInput | null,
  registrationDeadline?: ModelSubscriptionStringInput | null,
  requirements?: ModelSubscriptionStringInput | null,
  shortDescription?: ModelSubscriptionStringInput | null,
  skillLevel?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  tags?: ModelSubscriptionStringInput | null,
  timezone?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  venue?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionEventRegistrationFilterInput = {
  and?: Array< ModelSubscriptionEventRegistrationFilterInput | null > | null,
  attendanceStatus?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  notes?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionEventRegistrationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  paymentStatus?: ModelSubscriptionStringInput | null,
  registrationData?: ModelSubscriptionStringInput | null,
  registrationStatus?: ModelSubscriptionStringInput | null,
  studentName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionInvitationFilterInput = {
  acceptedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInvitationFilterInput | null > | null,
  bio?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  expiresAt?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  invitationType?: ModelSubscriptionStringInput | null,
  invitedBy?: ModelSubscriptionIDInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  lastSentAt?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionInvitationFilterInput | null > | null,
  phone?: ModelSubscriptionStringInput | null,
  schoolName?: ModelSubscriptionStringInput | null,
  schoolType?: ModelSubscriptionStringInput | null,
  sport?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  token?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionLLCIncorporationFilterInput = {
  and?: Array< ModelSubscriptionLLCIncorporationFilterInput | null > | null,
  businessName?: ModelSubscriptionStringInput | null,
  businessType?: ModelSubscriptionStringInput | null,
  coachId?: ModelSubscriptionIDInput | null,
  completedAt?: ModelSubscriptionStringInput | null,
  cost?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  documents?: ModelSubscriptionStringInput | null,
  filedAt?: ModelSubscriptionStringInput | null,
  filingData?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionLLCIncorporationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMessageFilterInput = {
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  attachments?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  messageType?: ModelSubscriptionStringInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelSubscriptionStringInput | null,
  readAt?: ModelSubscriptionStringInput | null,
  recipientId?: ModelSubscriptionIDInput | null,
  senderId?: ModelSubscriptionIDInput | null,
  sentAt?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  deliveryChannels?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  notificationType?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelSubscriptionStringInput | null,
  scheduledFor?: ModelSubscriptionStringInput | null,
  sentAt?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionOnboardingProgressFilterInput = {
  and?: Array< ModelSubscriptionOnboardingProgressFilterInput | null > | null,
  completedSteps?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  currentStep?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  invitationBased?: ModelSubscriptionBooleanInput | null,
  invitationId?: ModelSubscriptionStringInput | null,
  lastUpdated?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionOnboardingProgressFilterInput | null > | null,
  stepData?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionParentFilterInput = {
  and?: Array< ModelSubscriptionParentFilterInput | null > | null,
  backgroundInformation?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  employerName?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  generationCodeSuffix?: ModelSubscriptionStringInput | null,
  hispanicLatinoEthnicity?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  lastSurname?: ModelSubscriptionStringInput | null,
  loginId?: ModelSubscriptionStringInput | null,
  maidenName?: ModelSubscriptionStringInput | null,
  middleName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionParentFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentUSI?: ModelSubscriptionIntInput | null,
  parentUniqueId?: ModelSubscriptionStringInput | null,
  personalEmailAddress?: ModelSubscriptionStringInput | null,
  personalTitlePrefix?: ModelSubscriptionStringInput | null,
  professionDescriptor?: ModelSubscriptionStringInput | null,
  races?: ModelSubscriptionStringInput | null,
  sex?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  workEmailAddress?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPaymentRecordFilterInput = {
  and?: Array< ModelSubscriptionPaymentRecordFilterInput | null > | null,
  applicationId?: ModelSubscriptionStringInput | null,
  coachEmail?: ModelSubscriptionStringInput | null,
  coachPayoutAmount?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  depositAmount?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  isMarketplacePayment?: ModelSubscriptionBooleanInput | null,
  lastPaymentDate?: ModelSubscriptionStringInput | null,
  nextPaymentDue?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPaymentRecordFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentEmail?: ModelSubscriptionStringInput | null,
  paymentHistory?: ModelSubscriptionStringInput | null,
  paymentPlan?: ModelSubscriptionStringInput | null,
  paymentStatus?: ModelSubscriptionStringInput | null,
  platformFeeAmount?: ModelSubscriptionFloatInput | null,
  stripeConnectAccountId?: ModelSubscriptionStringInput | null,
  stripeCustomerId?: ModelSubscriptionStringInput | null,
  stripePaymentIntentId?: ModelSubscriptionStringInput | null,
  stripePaymentLinkId?: ModelSubscriptionStringInput | null,
  studentId?: ModelSubscriptionStringInput | null,
  studentName?: ModelSubscriptionStringInput | null,
  totalPaid?: ModelSubscriptionFloatInput | null,
  tuitionAmount?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionProfileFilterInput = {
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProfileFilterInput | null > | null,
  backgroundCheckDate?: ModelSubscriptionStringInput | null,
  backgroundCheckStatus?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  certifications?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  emergencyContact?: ModelSubscriptionStringInput | null,
  experience?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  marketingProgress?: ModelSubscriptionStringInput | null,
  onboardingComplete?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionProfileFilterInput | null > | null,
  preferences?: ModelSubscriptionStringInput | null,
  profileType?: ModelSubscriptionStringInput | null,
  specialties?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  wizardProgress?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionQuizFilterInput = {
  and?: Array< ModelSubscriptionQuizFilterInput | null > | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  difficulty?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionQuizFilterInput | null > | null,
  passingScore?: ModelSubscriptionIntInput | null,
  questions?: ModelSubscriptionStringInput | null,
  timeLimit?: ModelSubscriptionIntInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionQuizAttemptFilterInput = {
  and?: Array< ModelSubscriptionQuizAttemptFilterInput | null > | null,
  answers?: ModelSubscriptionStringInput | null,
  completedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionQuizAttemptFilterInput | null > | null,
  owner?: ModelStringInput | null,
  passed?: ModelSubscriptionBooleanInput | null,
  quizId?: ModelSubscriptionIDInput | null,
  score?: ModelSubscriptionIntInput | null,
  startedAt?: ModelSubscriptionStringInput | null,
  timeSpent?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionSchoolFilterInput = {
  administrativeFundingControl?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSchoolFilterInput | null > | null,
  charterStatus?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  etag?: ModelSubscriptionStringInput | null,
  gradeLevels?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastModifiedDate?: ModelSubscriptionStringInput | null,
  localEducationAgencyId?: ModelSubscriptionIntInput | null,
  magnetSpecialProgramEmphasisSchool?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionSchoolFilterInput | null > | null,
  schoolCategories?: ModelSubscriptionStringInput | null,
  schoolId?: ModelSubscriptionIntInput | null,
  schoolType?: ModelSubscriptionStringInput | null,
  titleIPartASchoolDesignation?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSessionFilterInput = {
  and?: Array< ModelSubscriptionSessionFilterInput | null > | null,
  coachId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  duration?: ModelSubscriptionIntInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  feedback?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  location?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionSessionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  participants?: ModelSubscriptionStringInput | null,
  scheduledDate?: ModelSubscriptionStringInput | null,
  sessionType?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStaffFilterInput = {
  and?: Array< ModelSubscriptionStaffFilterInput | null > | null,
  birthDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  generationCodeSuffix?: ModelSubscriptionStringInput | null,
  highestCompletedLevelOfEducation?: ModelSubscriptionStringInput | null,
  hispanicLatinoEthnicity?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  lastSurname?: ModelSubscriptionStringInput | null,
  loginId?: ModelSubscriptionStringInput | null,
  maidenName?: ModelSubscriptionStringInput | null,
  middleName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionStaffFilterInput | null > | null,
  owner?: ModelStringInput | null,
  personalEmailAddress?: ModelSubscriptionStringInput | null,
  personalTitlePrefix?: ModelSubscriptionStringInput | null,
  races?: ModelSubscriptionStringInput | null,
  sex?: ModelSubscriptionStringInput | null,
  staffUSI?: ModelSubscriptionIntInput | null,
  staffUniqueId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  workEmailAddress?: ModelSubscriptionStringInput | null,
  yearsOfPriorProfessionalExperience?: ModelSubscriptionFloatInput | null,
};

export type ModelSubscriptionStaffSchoolAssociationFilterInput = {
  and?: Array< ModelSubscriptionStaffSchoolAssociationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  employmentStatus?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  hireDate?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionStaffSchoolAssociationFilterInput | null > | null,
  programAssignment?: ModelSubscriptionStringInput | null,
  schoolId?: ModelSubscriptionIntInput | null,
  schoolYear?: ModelSubscriptionIntInput | null,
  staffUSI?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStudentFilterInput = {
  admissionDate?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  applicationDate?: ModelSubscriptionStringInput | null,
  birthCity?: ModelSubscriptionStringInput | null,
  birthCountry?: ModelSubscriptionStringInput | null,
  birthDate?: ModelSubscriptionStringInput | null,
  birthStateAbbreviation?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  generationCodeSuffix?: ModelSubscriptionStringInput | null,
  hispanicLatinoEthnicity?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastSurname?: ModelSubscriptionStringInput | null,
  maidenName?: ModelSubscriptionStringInput | null,
  middleName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  personalTitlePrefix?: ModelSubscriptionStringInput | null,
  races?: ModelSubscriptionStringInput | null,
  sex?: ModelSubscriptionStringInput | null,
  studentApplicationStatus?: ModelSubscriptionStringInput | null,
  studentUSI?: ModelSubscriptionIntInput | null,
  studentUniqueId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStudentDocumentFilterInput = {
  and?: Array< ModelSubscriptionStudentDocumentFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  documentCategoryId?: ModelSubscriptionIntInput | null,
  documentDescription?: ModelSubscriptionStringInput | null,
  documentHash?: ModelSubscriptionStringInput | null,
  documentTitle?: ModelSubscriptionStringInput | null,
  expirationDate?: ModelSubscriptionStringInput | null,
  fileName?: ModelSubscriptionStringInput | null,
  fileSize?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  isConfidential?: ModelSubscriptionBooleanInput | null,
  mimeType?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionStudentDocumentFilterInput | null > | null,
  reviewComments?: ModelSubscriptionStringInput | null,
  reviewDate?: ModelSubscriptionStringInput | null,
  reviewStatus?: ModelSubscriptionStringInput | null,
  reviewedByStaffUSI?: ModelSubscriptionIntInput | null,
  storageLocation?: ModelSubscriptionStringInput | null,
  studentUSI?: ModelSubscriptionIntInput | null,
  submittedByParentUSI?: ModelSubscriptionIntInput | null,
  submittedDate?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput = {
  and?: Array< ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput | null > | null,
  contactAddress?: ModelSubscriptionStringInput | null,
  contactEmailAddress?: ModelSubscriptionStringInput | null,
  contactTelephones?: ModelSubscriptionStringInput | null,
  contactTitle?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  educationOrganizationId?: ModelSubscriptionIntInput | null,
  emergencyContactStatus?: ModelSubscriptionBooleanInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastSurname?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput | null > | null,
  primaryContactStatus?: ModelSubscriptionBooleanInput | null,
  relation?: ModelSubscriptionStringInput | null,
  studentUSI?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStudentParentAssociationFilterInput = {
  and?: Array< ModelSubscriptionStudentParentAssociationFilterInput | null > | null,
  contactPriority?: ModelSubscriptionIntInput | null,
  contactRestrictions?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  custodyStatus?: ModelSubscriptionStringInput | null,
  emergencyContactStatus?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  legalGuardian?: ModelSubscriptionBooleanInput | null,
  livesWith?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionStudentParentAssociationFilterInput | null > | null,
  parentUSI?: ModelSubscriptionIntInput | null,
  primaryContactStatus?: ModelSubscriptionBooleanInput | null,
  relation?: ModelSubscriptionStringInput | null,
  studentUSI?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStudentSchoolAssociationFilterInput = {
  admissionStatus?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStudentSchoolAssociationFilterInput | null > | null,
  applicationStatus?: ModelSubscriptionStringInput | null,
  classOfSchoolYear?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  entryDate?: ModelSubscriptionStringInput | null,
  entryGradeLevel?: ModelSubscriptionStringInput | null,
  entryType?: ModelSubscriptionStringInput | null,
  exitWithdrawDate?: ModelSubscriptionStringInput | null,
  exitWithdrawType?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionStudentSchoolAssociationFilterInput | null > | null,
  repeatGradeIndicator?: ModelSubscriptionBooleanInput | null,
  schoolId?: ModelSubscriptionIntInput | null,
  schoolYear?: ModelSubscriptionIntInput | null,
  studentUSI?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionTuitionSettingFilterInput = {
  allowPaymentPlans?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionTuitionSettingFilterInput | null > | null,
  coachEmail?: ModelSubscriptionStringInput | null,
  coachId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  currency?: ModelSubscriptionStringInput | null,
  defaultDeposit?: ModelSubscriptionFloatInput | null,
  defaultTuition?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  marketplaceEnabled?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionTuitionSettingFilterInput | null > | null,
  owner?: ModelStringInput | null,
  paymentPlanOptions?: ModelSubscriptionStringInput | null,
  platformFeePercent?: ModelSubscriptionFloatInput | null,
  stripeConnectAccountId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  amplifyUserId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastLoginAt?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  parentUSI?: ModelSubscriptionIntInput | null,
  phone?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  staffUSI?: ModelSubscriptionIntInput | null,
  status?: ModelSubscriptionStringInput | null,
  studentUSI?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetAnalyticsEventQueryVariables = {
  id: string,
};

export type GetAnalyticsEventQuery = {
  getAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type GetApiKeyQueryVariables = {
  id: string,
};

export type GetApiKeyQuery = {
  getApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type GetApiKeyRotationQueryVariables = {
  id: string,
};

export type GetApiKeyRotationQuery = {
  getApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type GetApiKeyUsageQueryVariables = {
  id: string,
};

export type GetApiKeyUsageQuery = {
  getApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type GetAuditLogQueryVariables = {
  id: string,
};

export type GetAuditLogQuery = {
  getAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type GetCoachPayoutQueryVariables = {
  id: string,
};

export type GetCoachPayoutQuery = {
  getCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetDescriptorQueryVariables = {
  id: string,
};

export type GetDescriptorQuery = {
  getDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type GetDocumentCategoryQueryVariables = {
  id: string,
};

export type GetDocumentCategoryQuery = {
  getDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type GetEducationOrganizationQueryVariables = {
  id: string,
};

export type GetEducationOrganizationQuery = {
  getEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type GetEnrollmentQueryVariables = {
  id: string,
};

export type GetEnrollmentQuery = {
  getEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type GetEventRegistrationQueryVariables = {
  id: string,
};

export type GetEventRegistrationQuery = {
  getEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type GetInvitationQueryVariables = {
  id: string,
};

export type GetInvitationQuery = {
  getInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type GetLLCIncorporationQueryVariables = {
  id: string,
};

export type GetLLCIncorporationQuery = {
  getLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetOnboardingProgressQueryVariables = {
  id: string,
};

export type GetOnboardingProgressQuery = {
  getOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type GetParentQueryVariables = {
  id: string,
};

export type GetParentQuery = {
  getParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type GetPaymentRecordQueryVariables = {
  id: string,
};

export type GetPaymentRecordQuery = {
  getPaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type GetProfileQueryVariables = {
  id: string,
};

export type GetProfileQuery = {
  getProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type GetQuizQueryVariables = {
  id: string,
};

export type GetQuizQuery = {
  getQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type GetQuizAttemptQueryVariables = {
  id: string,
};

export type GetQuizAttemptQuery = {
  getQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetSchoolQueryVariables = {
  id: string,
};

export type GetSchoolQuery = {
  getSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type GetStaffQueryVariables = {
  id: string,
};

export type GetStaffQuery = {
  getStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type GetStaffSchoolAssociationQueryVariables = {
  id: string,
};

export type GetStaffSchoolAssociationQuery = {
  getStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type GetStudentQueryVariables = {
  id: string,
};

export type GetStudentQuery = {
  getStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type GetStudentDocumentQueryVariables = {
  id: string,
};

export type GetStudentDocumentQuery = {
  getStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetStudentEducationOrganizationResponsibleContactPersonQueryVariables = {
  id: string,
};

export type GetStudentEducationOrganizationResponsibleContactPersonQuery = {
  getStudentEducationOrganizationResponsibleContactPerson?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type GetStudentParentAssociationQueryVariables = {
  id: string,
};

export type GetStudentParentAssociationQuery = {
  getStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type GetStudentSchoolAssociationQueryVariables = {
  id: string,
};

export type GetStudentSchoolAssociationQuery = {
  getStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type GetTuitionSettingQueryVariables = {
  id: string,
};

export type GetTuitionSettingQuery = {
  getTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type ListAnalyticsEventsQueryVariables = {
  filter?: ModelAnalyticsEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnalyticsEventsQuery = {
  listAnalyticsEvents?:  {
    __typename: "ModelAnalyticsEventConnection",
    items:  Array< {
      __typename: "AnalyticsEvent",
      createdAt?: string | null,
      eventName: string,
      id: string,
      ipAddress?: string | null,
      properties?: string | null,
      referrer?: string | null,
      sessionId?: string | null,
      timestamp: string,
      updatedAt: string,
      userAgent?: string | null,
      userId?: string | null,
      utmCampaign?: string | null,
      utmContent?: string | null,
      utmMedium?: string | null,
      utmSource?: string | null,
      utmTerm?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListApiKeyRotationsQueryVariables = {
  filter?: ModelApiKeyRotationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApiKeyRotationsQuery = {
  listApiKeyRotations?:  {
    __typename: "ModelApiKeyRotationConnection",
    items:  Array< {
      __typename: "ApiKeyRotation",
      createdAt?: string | null,
      gracePeriodEnd?: string | null,
      id: string,
      newKeyId: string,
      oldKeyDeactivated?: boolean | null,
      oldKeyId: string,
      reason?: string | null,
      rotatedBy: string,
      rotationType?: ApiKeyRotationRotationType | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListApiKeyUsagesQueryVariables = {
  filter?: ModelApiKeyUsageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApiKeyUsagesQuery = {
  listApiKeyUsages?:  {
    __typename: "ModelApiKeyUsageConnection",
    items:  Array< {
      __typename: "ApiKeyUsage",
      createdAt?: string | null,
      endpoint: string,
      id: string,
      ipAddress?: string | null,
      keyId: string,
      keyPrefix: string,
      metadata?: string | null,
      method?: string | null,
      permissions?: Array< string | null > | null,
      rateLimitHit?: boolean | null,
      requestSize?: number | null,
      responseSize?: number | null,
      responseStatus?: number | null,
      responseTime?: number | null,
      securityViolation?: string | null,
      timestamp: string,
      updatedAt: string,
      userAgent?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListApiKeysQueryVariables = {
  filter?: ModelApiKeyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApiKeysQuery = {
  listApiKeys?:  {
    __typename: "ModelApiKeyConnection",
    items:  Array< {
      __typename: "ApiKey",
      createdAt?: string | null,
      createdBy: string,
      description?: string | null,
      expiresAt?: string | null,
      id: string,
      ipWhitelist?: Array< string | null > | null,
      isActive?: boolean | null,
      keyHash: string,
      keyPrefix: string,
      lastRotatedAt?: string | null,
      lastSecurityIncident?: string | null,
      lastUsedAt?: string | null,
      metadata?: string | null,
      name: string,
      permissions?: Array< string | null > | null,
      rateLimitDaily?: number | null,
      rateLimitMinute?: number | null,
      securityIncidents?: number | null,
      updatedAt?: string | null,
      usageCount?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAuditLogsQueryVariables = {
  filter?: ModelAuditLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAuditLogsQuery = {
  listAuditLogs?:  {
    __typename: "ModelAuditLogConnection",
    items:  Array< {
      __typename: "AuditLog",
      action: string,
      changes?: string | null,
      createdAt: string,
      id: string,
      ipAddress?: string | null,
      metadata?: string | null,
      resource: string,
      resourceId?: string | null,
      timestamp: string,
      updatedAt: string,
      userAgent?: string | null,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCoachPayoutsQueryVariables = {
  filter?: ModelCoachPayoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoachPayoutsQuery = {
  listCoachPayouts?:  {
    __typename: "ModelCoachPayoutConnection",
    items:  Array< {
      __typename: "CoachPayout",
      coachEmail: string,
      createdAt?: string | null,
      description?: string | null,
      id: string,
      metadata?: string | null,
      owner?: string | null,
      payoutAmount: number,
      payoutDate?: string | null,
      payoutStatus?: CoachPayoutPayoutStatus | null,
      payoutType?: CoachPayoutPayoutType | null,
      stripeConnectAccountId: string,
      stripePayout?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDescriptorsQueryVariables = {
  filter?: ModelDescriptorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDescriptorsQuery = {
  listDescriptors?:  {
    __typename: "ModelDescriptorConnection",
    items:  Array< {
      __typename: "Descriptor",
      codeValue: string,
      createdAt?: string | null,
      description?: string | null,
      descriptorId: number,
      effectiveBeginDate?: string | null,
      effectiveEndDate?: string | null,
      id: string,
      namespace: string,
      priorDescriptorId?: number | null,
      shortDescription: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDocumentCategoriesQueryVariables = {
  filter?: ModelDocumentCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentCategoriesQuery = {
  listDocumentCategories?:  {
    __typename: "ModelDocumentCategoryConnection",
    items:  Array< {
      __typename: "DocumentCategory",
      categoryDescription?: string | null,
      categoryName: string,
      createdAt?: string | null,
      documentCategoryId: number,
      id: string,
      isActive?: boolean | null,
      isRequired?: boolean | null,
      sortOrder?: number | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListEducationOrganizationsQueryVariables = {
  filter?: ModelEducationOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEducationOrganizationsQuery = {
  listEducationOrganizations?:  {
    __typename: "ModelEducationOrganizationConnection",
    items:  Array< {
      __typename: "EducationOrganization",
      addresses?: string | null,
      createdAt?: string | null,
      educationOrganizationId: number,
      etag?: string | null,
      id: string,
      lastModifiedDate?: string | null,
      nameOfInstitution: string,
      operationalStatus?: string | null,
      shortNameOfInstitution?: string | null,
      telephones?: string | null,
      updatedAt?: string | null,
      webSite?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListEnrollmentsQueryVariables = {
  filter?: ModelEnrollmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEnrollmentsQuery = {
  listEnrollments?:  {
    __typename: "ModelEnrollmentConnection",
    items:  Array< {
      __typename: "Enrollment",
      academicYear?: string | null,
      applicationData?: string | null,
      coachName?: string | null,
      createdAt?: string | null,
      currentStep?: number | null,
      documents?: string | null,
      enrollmentType?: EnrollmentEnrollmentType | null,
      id: string,
      parentId: string,
      schoolPreferences?: string | null,
      sportInterest?: string | null,
      startDate?: string | null,
      status?: EnrollmentStatus | null,
      studentAge?: number | null,
      studentGrade?: string | null,
      studentName: string,
      timelineStatus?: EnrollmentTimelineStatus | null,
      timelineSteps?: string | null,
      totalSteps?: number | null,
      tuitionPlan?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListEventRegistrationsQueryVariables = {
  filter?: ModelEventRegistrationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventRegistrationsQuery = {
  listEventRegistrations?:  {
    __typename: "ModelEventRegistrationConnection",
    items:  Array< {
      __typename: "EventRegistration",
      attendanceStatus?: EventRegistrationAttendanceStatus | null,
      createdAt?: string | null,
      eventId: string,
      id: string,
      notes?: string | null,
      owner?: string | null,
      paymentStatus?: EventRegistrationPaymentStatus | null,
      registrationData?: string | null,
      registrationStatus?: EventRegistrationRegistrationStatus | null,
      studentName?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      address?: string | null,
      ageGroups?: Array< string | null > | null,
      capacity?: number | null,
      coachId: string,
      coachName?: string | null,
      createdAt?: string | null,
      currency?: string | null,
      description?: string | null,
      endDate: string,
      equipment?: Array< string | null > | null,
      eventType?: EventEventType | null,
      googleCalendarEventId?: string | null,
      googleCalendarLastSynced?: string | null,
      googleCalendarSyncEnabled?: boolean | null,
      googleMeetUrl?: string | null,
      id: string,
      images?: Array< string | null > | null,
      isOnline?: boolean | null,
      isPublic?: boolean | null,
      location?: string | null,
      meetingUrl?: string | null,
      owner?: string | null,
      price?: number | null,
      registeredCount?: number | null,
      registrationDeadline?: string | null,
      requirements?: Array< string | null > | null,
      shortDescription?: string | null,
      skillLevel?: EventSkillLevel | null,
      startDate: string,
      status?: EventStatus | null,
      tags?: Array< string | null > | null,
      timezone?: string | null,
      title: string,
      updatedAt?: string | null,
      venue?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInvitationsQueryVariables = {
  filter?: ModelInvitationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInvitationsQuery = {
  listInvitations?:  {
    __typename: "ModelInvitationConnection",
    items:  Array< {
      __typename: "Invitation",
      acceptedAt?: string | null,
      bio?: string | null,
      city?: string | null,
      createdAt?: string | null,
      email: string,
      expiresAt: string,
      firstName?: string | null,
      id: string,
      invitationType?: InvitationInvitationType | null,
      invitedBy: string,
      lastName?: string | null,
      lastSentAt?: string | null,
      message?: string | null,
      phone?: string | null,
      schoolName?: string | null,
      schoolType?: string | null,
      sport?: string | null,
      state?: string | null,
      status?: InvitationStatus | null,
      token: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLLCIncorporationsQueryVariables = {
  filter?: ModelLLCIncorporationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLLCIncorporationsQuery = {
  listLLCIncorporations?:  {
    __typename: "ModelLLCIncorporationConnection",
    items:  Array< {
      __typename: "LLCIncorporation",
      businessName: string,
      businessType?: LLCIncorporationBusinessType | null,
      coachId: string,
      completedAt?: string | null,
      cost?: number | null,
      createdAt?: string | null,
      documents?: string | null,
      filedAt?: string | null,
      filingData?: string | null,
      id: string,
      owner?: string | null,
      state: string,
      status?: LLCIncorporationStatus | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      attachments?: string | null,
      content: string,
      createdAt?: string | null,
      id: string,
      messageType?: MessageMessageType | null,
      metadata?: string | null,
      owner?: string | null,
      priority?: MessagePriority | null,
      readAt?: string | null,
      recipientId: string,
      senderId: string,
      sentAt?: string | null,
      status?: MessageStatus | null,
      subject?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      content: string,
      createdAt?: string | null,
      deliveryChannels?: string | null,
      id: string,
      metadata?: string | null,
      notificationType?: NotificationNotificationType | null,
      owner?: string | null,
      priority?: NotificationPriority | null,
      scheduledFor?: string | null,
      sentAt?: string | null,
      status?: NotificationStatus | null,
      title: string,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOnboardingProgressesQueryVariables = {
  filter?: ModelOnboardingProgressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOnboardingProgressesQuery = {
  listOnboardingProgresses?:  {
    __typename: "ModelOnboardingProgressConnection",
    items:  Array< {
      __typename: "OnboardingProgress",
      completedSteps?: Array< string | null > | null,
      createdAt?: string | null,
      currentStep?: OnboardingProgressCurrentStep | null,
      email: string,
      id: string,
      invitationBased?: boolean | null,
      invitationId?: string | null,
      lastUpdated?: string | null,
      stepData?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListParentsQueryVariables = {
  filter?: ModelParentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParentsQuery = {
  listParents?:  {
    __typename: "ModelParentConnection",
    items:  Array< {
      __typename: "Parent",
      backgroundInformation?: string | null,
      createdAt?: string | null,
      employerName?: string | null,
      firstName: string,
      generationCodeSuffix?: string | null,
      hispanicLatinoEthnicity?: boolean | null,
      id: string,
      isActive?: boolean | null,
      lastSurname: string,
      loginId?: string | null,
      maidenName?: string | null,
      middleName?: string | null,
      owner?: string | null,
      parentUSI: number,
      parentUniqueId: string,
      personalEmailAddress?: string | null,
      personalTitlePrefix?: string | null,
      professionDescriptor?: string | null,
      races?: string | null,
      sex?: string | null,
      updatedAt?: string | null,
      workEmailAddress?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPaymentRecordsQueryVariables = {
  filter?: ModelPaymentRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPaymentRecordsQuery = {
  listPaymentRecords?:  {
    __typename: "ModelPaymentRecordConnection",
    items:  Array< {
      __typename: "PaymentRecord",
      applicationId: string,
      coachEmail: string,
      coachPayoutAmount?: number | null,
      createdAt?: string | null,
      depositAmount: number,
      id: string,
      isMarketplacePayment?: boolean | null,
      lastPaymentDate?: string | null,
      nextPaymentDue?: string | null,
      owner?: string | null,
      parentEmail: string,
      paymentHistory?: string | null,
      paymentPlan?: PaymentRecordPaymentPlan | null,
      paymentStatus?: PaymentRecordPaymentStatus | null,
      platformFeeAmount?: number | null,
      stripeConnectAccountId?: string | null,
      stripeCustomerId?: string | null,
      stripePaymentIntentId?: string | null,
      stripePaymentLinkId?: string | null,
      studentId: string,
      studentName: string,
      totalPaid?: number | null,
      tuitionAmount: number,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProfilesQueryVariables = {
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProfilesQuery = {
  listProfiles?:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      address?: string | null,
      backgroundCheckDate?: string | null,
      backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
      bio?: string | null,
      certifications?: Array< string | null > | null,
      createdAt?: string | null,
      emergencyContact?: string | null,
      experience?: string | null,
      id: string,
      marketingProgress?: string | null,
      onboardingComplete?: boolean | null,
      preferences?: string | null,
      profileType?: ProfileProfileType | null,
      specialties?: Array< string | null > | null,
      updatedAt?: string | null,
      userId: string,
      wizardProgress?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuizAttemptsQueryVariables = {
  filter?: ModelQuizAttemptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizAttemptsQuery = {
  listQuizAttempts?:  {
    __typename: "ModelQuizAttemptConnection",
    items:  Array< {
      __typename: "QuizAttempt",
      answers: string,
      completedAt?: string | null,
      createdAt: string,
      id: string,
      metadata?: string | null,
      owner?: string | null,
      passed?: boolean | null,
      quizId: string,
      score?: number | null,
      startedAt: string,
      timeSpent?: number | null,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuizzesQueryVariables = {
  filter?: ModelQuizFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizzesQuery = {
  listQuizzes?:  {
    __typename: "ModelQuizConnection",
    items:  Array< {
      __typename: "Quiz",
      category?: string | null,
      createdAt?: string | null,
      createdBy?: string | null,
      description?: string | null,
      difficulty?: QuizDifficulty | null,
      id: string,
      isActive?: boolean | null,
      passingScore?: number | null,
      questions: string,
      timeLimit?: number | null,
      title: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchoolsQueryVariables = {
  filter?: ModelSchoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchoolsQuery = {
  listSchools?:  {
    __typename: "ModelSchoolConnection",
    items:  Array< {
      __typename: "School",
      administrativeFundingControl?: string | null,
      charterStatus?: string | null,
      createdAt?: string | null,
      etag?: string | null,
      gradeLevels?: string | null,
      id: string,
      lastModifiedDate?: string | null,
      localEducationAgencyId?: number | null,
      magnetSpecialProgramEmphasisSchool?: string | null,
      schoolCategories?: string | null,
      schoolId: number,
      schoolType?: string | null,
      titleIPartASchoolDesignation?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      coachId: string,
      createdAt?: string | null,
      duration?: number | null,
      eventId?: string | null,
      feedback?: string | null,
      id: string,
      location?: string | null,
      notes?: string | null,
      owner?: string | null,
      participants?: string | null,
      scheduledDate: string,
      sessionType?: SessionSessionType | null,
      status?: SessionStatus | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStaffQueryVariables = {
  filter?: ModelStaffFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStaffQuery = {
  listStaff?:  {
    __typename: "ModelStaffConnection",
    items:  Array< {
      __typename: "Staff",
      birthDate?: string | null,
      createdAt?: string | null,
      firstName: string,
      generationCodeSuffix?: string | null,
      highestCompletedLevelOfEducation?: string | null,
      hispanicLatinoEthnicity?: boolean | null,
      id: string,
      isActive?: boolean | null,
      lastSurname: string,
      loginId?: string | null,
      maidenName?: string | null,
      middleName?: string | null,
      owner?: string | null,
      personalEmailAddress?: string | null,
      personalTitlePrefix?: string | null,
      races?: string | null,
      sex?: string | null,
      staffUSI: number,
      staffUniqueId: string,
      updatedAt?: string | null,
      workEmailAddress?: string | null,
      yearsOfPriorProfessionalExperience?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStaffSchoolAssociationsQueryVariables = {
  filter?: ModelStaffSchoolAssociationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStaffSchoolAssociationsQuery = {
  listStaffSchoolAssociations?:  {
    __typename: "ModelStaffSchoolAssociationConnection",
    items:  Array< {
      __typename: "StaffSchoolAssociation",
      createdAt?: string | null,
      employmentStatus?: string | null,
      endDate?: string | null,
      hireDate?: string | null,
      id: string,
      programAssignment: string,
      schoolId: number,
      schoolYear?: number | null,
      staffUSI: number,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStudentDocumentsQueryVariables = {
  filter?: ModelStudentDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentDocumentsQuery = {
  listStudentDocuments?:  {
    __typename: "ModelStudentDocumentConnection",
    items:  Array< {
      __typename: "StudentDocument",
      createdAt?: string | null,
      documentCategoryId: number,
      documentDescription?: string | null,
      documentHash?: string | null,
      documentTitle: string,
      expirationDate?: string | null,
      fileName?: string | null,
      fileSize?: number | null,
      id: string,
      isConfidential?: boolean | null,
      mimeType?: string | null,
      reviewComments?: string | null,
      reviewDate?: string | null,
      reviewStatus?: StudentDocumentReviewStatus | null,
      reviewedByStaffUSI?: number | null,
      storageLocation?: string | null,
      studentUSI: number,
      submittedByParentUSI?: number | null,
      submittedDate?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStudentEducationOrganizationResponsibleContactPeopleQueryVariables = {
  filter?: ModelStudentEducationOrganizationResponsibleContactPersonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentEducationOrganizationResponsibleContactPeopleQuery = {
  listStudentEducationOrganizationResponsibleContactPeople?:  {
    __typename: "ModelStudentEducationOrganizationResponsibleContactPersonConnection",
    items:  Array< {
      __typename: "StudentEducationOrganizationResponsibleContactPerson",
      contactAddress?: string | null,
      contactEmailAddress?: string | null,
      contactTelephones?: string | null,
      contactTitle?: string | null,
      createdAt?: string | null,
      educationOrganizationId: number,
      emergencyContactStatus?: boolean | null,
      firstName: string,
      id: string,
      lastSurname: string,
      primaryContactStatus?: boolean | null,
      relation?: string | null,
      studentUSI: number,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStudentParentAssociationsQueryVariables = {
  filter?: ModelStudentParentAssociationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentParentAssociationsQuery = {
  listStudentParentAssociations?:  {
    __typename: "ModelStudentParentAssociationConnection",
    items:  Array< {
      __typename: "StudentParentAssociation",
      contactPriority?: number | null,
      contactRestrictions?: string | null,
      createdAt?: string | null,
      custodyStatus?: StudentParentAssociationCustodyStatus | null,
      emergencyContactStatus?: boolean | null,
      id: string,
      legalGuardian?: boolean | null,
      livesWith?: boolean | null,
      parentUSI: number,
      primaryContactStatus?: boolean | null,
      relation?: StudentParentAssociationRelation | null,
      studentUSI: number,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStudentSchoolAssociationsQueryVariables = {
  filter?: ModelStudentSchoolAssociationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentSchoolAssociationsQuery = {
  listStudentSchoolAssociations?:  {
    __typename: "ModelStudentSchoolAssociationConnection",
    items:  Array< {
      __typename: "StudentSchoolAssociation",
      admissionStatus?: string | null,
      applicationStatus?: string | null,
      classOfSchoolYear?: number | null,
      createdAt?: string | null,
      entryDate: string,
      entryGradeLevel?: string | null,
      entryType?: string | null,
      exitWithdrawDate?: string | null,
      exitWithdrawType?: string | null,
      id: string,
      repeatGradeIndicator?: boolean | null,
      schoolId: number,
      schoolYear: number,
      studentUSI: number,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStudentsQueryVariables = {
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentsQuery = {
  listStudents?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      admissionDate?: string | null,
      applicationDate?: string | null,
      birthCity?: string | null,
      birthCountry?: string | null,
      birthDate?: string | null,
      birthStateAbbreviation?: string | null,
      createdAt?: string | null,
      firstName: string,
      generationCodeSuffix?: string | null,
      hispanicLatinoEthnicity?: boolean | null,
      id: string,
      lastSurname: string,
      maidenName?: string | null,
      middleName?: string | null,
      personalTitlePrefix?: string | null,
      races?: string | null,
      sex?: string | null,
      studentApplicationStatus?: StudentStudentApplicationStatus | null,
      studentUSI: number,
      studentUniqueId: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTuitionSettingsQueryVariables = {
  filter?: ModelTuitionSettingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTuitionSettingsQuery = {
  listTuitionSettings?:  {
    __typename: "ModelTuitionSettingConnection",
    items:  Array< {
      __typename: "TuitionSetting",
      allowPaymentPlans?: boolean | null,
      coachEmail: string,
      coachId: string,
      createdAt?: string | null,
      currency?: string | null,
      defaultDeposit: number,
      defaultTuition: number,
      id: string,
      marketplaceEnabled?: boolean | null,
      owner?: string | null,
      paymentPlanOptions: string,
      platformFeePercent?: number | null,
      stripeConnectAccountId?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      amplifyUserId?: string | null,
      createdAt?: string | null,
      email: string,
      firstName?: string | null,
      id: string,
      lastLoginAt?: string | null,
      lastName?: string | null,
      parentUSI?: number | null,
      phone?: string | null,
      role?: UserRole | null,
      staffUSI?: number | null,
      status?: UserStatus | null,
      studentUSI?: number | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CoachInviteMutationVariables = {
  bio: string,
  cell: string,
  d1_athletics_count: number,
  email: string,
  location: string,
  name: string,
};

export type CoachInviteMutation = {
  coachInvite?: string | null,
};

export type CreateAnalyticsEventMutationVariables = {
  condition?: ModelAnalyticsEventConditionInput | null,
  input: CreateAnalyticsEventInput,
};

export type CreateAnalyticsEventMutation = {
  createAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type CreateApiKeyMutationVariables = {
  condition?: ModelApiKeyConditionInput | null,
  input: CreateApiKeyInput,
};

export type CreateApiKeyMutation = {
  createApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type CreateApiKeyRotationMutationVariables = {
  condition?: ModelApiKeyRotationConditionInput | null,
  input: CreateApiKeyRotationInput,
};

export type CreateApiKeyRotationMutation = {
  createApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type CreateApiKeyUsageMutationVariables = {
  condition?: ModelApiKeyUsageConditionInput | null,
  input: CreateApiKeyUsageInput,
};

export type CreateApiKeyUsageMutation = {
  createApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type CreateAuditLogMutationVariables = {
  condition?: ModelAuditLogConditionInput | null,
  input: CreateAuditLogInput,
};

export type CreateAuditLogMutation = {
  createAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type CreateCoachPayoutMutationVariables = {
  condition?: ModelCoachPayoutConditionInput | null,
  input: CreateCoachPayoutInput,
};

export type CreateCoachPayoutMutation = {
  createCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateDescriptorMutationVariables = {
  condition?: ModelDescriptorConditionInput | null,
  input: CreateDescriptorInput,
};

export type CreateDescriptorMutation = {
  createDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type CreateDocumentCategoryMutationVariables = {
  condition?: ModelDocumentCategoryConditionInput | null,
  input: CreateDocumentCategoryInput,
};

export type CreateDocumentCategoryMutation = {
  createDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateEducationOrganizationMutationVariables = {
  condition?: ModelEducationOrganizationConditionInput | null,
  input: CreateEducationOrganizationInput,
};

export type CreateEducationOrganizationMutation = {
  createEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type CreateEnrollmentMutationVariables = {
  condition?: ModelEnrollmentConditionInput | null,
  input: CreateEnrollmentInput,
};

export type CreateEnrollmentMutation = {
  createEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateEventMutationVariables = {
  condition?: ModelEventConditionInput | null,
  input: CreateEventInput,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type CreateEventRegistrationMutationVariables = {
  condition?: ModelEventRegistrationConditionInput | null,
  input: CreateEventRegistrationInput,
};

export type CreateEventRegistrationMutation = {
  createEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type CreateInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: CreateInvitationInput,
};

export type CreateInvitationMutation = {
  createInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type CreateLLCIncorporationMutationVariables = {
  condition?: ModelLLCIncorporationConditionInput | null,
  input: CreateLLCIncorporationInput,
};

export type CreateLLCIncorporationMutation = {
  createLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: CreateMessageInput,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateNotificationMutationVariables = {
  condition?: ModelNotificationConditionInput | null,
  input: CreateNotificationInput,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateOnboardingProgressMutationVariables = {
  condition?: ModelOnboardingProgressConditionInput | null,
  input: CreateOnboardingProgressInput,
};

export type CreateOnboardingProgressMutation = {
  createOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type CreateParentMutationVariables = {
  condition?: ModelParentConditionInput | null,
  input: CreateParentInput,
};

export type CreateParentMutation = {
  createParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type CreatePaymentRecordMutationVariables = {
  condition?: ModelPaymentRecordConditionInput | null,
  input: CreatePaymentRecordInput,
};

export type CreatePaymentRecordMutation = {
  createPaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type CreateProfileMutationVariables = {
  condition?: ModelProfileConditionInput | null,
  input: CreateProfileInput,
};

export type CreateProfileMutation = {
  createProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type CreateQuizMutationVariables = {
  condition?: ModelQuizConditionInput | null,
  input: CreateQuizInput,
};

export type CreateQuizMutation = {
  createQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type CreateQuizAttemptMutationVariables = {
  condition?: ModelQuizAttemptConditionInput | null,
  input: CreateQuizAttemptInput,
};

export type CreateQuizAttemptMutation = {
  createQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: CreateSchoolInput,
};

export type CreateSchoolMutation = {
  createSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateSessionMutationVariables = {
  condition?: ModelSessionConditionInput | null,
  input: CreateSessionInput,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateStaffMutationVariables = {
  condition?: ModelStaffConditionInput | null,
  input: CreateStaffInput,
};

export type CreateStaffMutation = {
  createStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type CreateStaffSchoolAssociationMutationVariables = {
  condition?: ModelStaffSchoolAssociationConditionInput | null,
  input: CreateStaffSchoolAssociationInput,
};

export type CreateStaffSchoolAssociationMutation = {
  createStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type CreateStudentMutationVariables = {
  condition?: ModelStudentConditionInput | null,
  input: CreateStudentInput,
};

export type CreateStudentMutation = {
  createStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type CreateStudentDocumentMutationVariables = {
  condition?: ModelStudentDocumentConditionInput | null,
  input: CreateStudentDocumentInput,
};

export type CreateStudentDocumentMutation = {
  createStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateStudentEducationOrganizationResponsibleContactPersonMutationVariables = {
  condition?: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput | null,
  input: CreateStudentEducationOrganizationResponsibleContactPersonInput,
};

export type CreateStudentEducationOrganizationResponsibleContactPersonMutation = {
  createStudentEducationOrganizationResponsibleContactPerson?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type CreateStudentParentAssociationMutationVariables = {
  condition?: ModelStudentParentAssociationConditionInput | null,
  input: CreateStudentParentAssociationInput,
};

export type CreateStudentParentAssociationMutation = {
  createStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type CreateStudentSchoolAssociationMutationVariables = {
  condition?: ModelStudentSchoolAssociationConditionInput | null,
  input: CreateStudentSchoolAssociationInput,
};

export type CreateStudentSchoolAssociationMutation = {
  createStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type CreateTuitionSettingMutationVariables = {
  condition?: ModelTuitionSettingConditionInput | null,
  input: CreateTuitionSettingInput,
};

export type CreateTuitionSettingMutation = {
  createTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteAnalyticsEventMutationVariables = {
  condition?: ModelAnalyticsEventConditionInput | null,
  input: DeleteAnalyticsEventInput,
};

export type DeleteAnalyticsEventMutation = {
  deleteAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type DeleteApiKeyMutationVariables = {
  condition?: ModelApiKeyConditionInput | null,
  input: DeleteApiKeyInput,
};

export type DeleteApiKeyMutation = {
  deleteApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type DeleteApiKeyRotationMutationVariables = {
  condition?: ModelApiKeyRotationConditionInput | null,
  input: DeleteApiKeyRotationInput,
};

export type DeleteApiKeyRotationMutation = {
  deleteApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type DeleteApiKeyUsageMutationVariables = {
  condition?: ModelApiKeyUsageConditionInput | null,
  input: DeleteApiKeyUsageInput,
};

export type DeleteApiKeyUsageMutation = {
  deleteApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type DeleteAuditLogMutationVariables = {
  condition?: ModelAuditLogConditionInput | null,
  input: DeleteAuditLogInput,
};

export type DeleteAuditLogMutation = {
  deleteAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type DeleteCoachPayoutMutationVariables = {
  condition?: ModelCoachPayoutConditionInput | null,
  input: DeleteCoachPayoutInput,
};

export type DeleteCoachPayoutMutation = {
  deleteCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteDescriptorMutationVariables = {
  condition?: ModelDescriptorConditionInput | null,
  input: DeleteDescriptorInput,
};

export type DeleteDescriptorMutation = {
  deleteDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteDocumentCategoryMutationVariables = {
  condition?: ModelDocumentCategoryConditionInput | null,
  input: DeleteDocumentCategoryInput,
};

export type DeleteDocumentCategoryMutation = {
  deleteDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteEducationOrganizationMutationVariables = {
  condition?: ModelEducationOrganizationConditionInput | null,
  input: DeleteEducationOrganizationInput,
};

export type DeleteEducationOrganizationMutation = {
  deleteEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type DeleteEnrollmentMutationVariables = {
  condition?: ModelEnrollmentConditionInput | null,
  input: DeleteEnrollmentInput,
};

export type DeleteEnrollmentMutation = {
  deleteEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteEventMutationVariables = {
  condition?: ModelEventConditionInput | null,
  input: DeleteEventInput,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type DeleteEventRegistrationMutationVariables = {
  condition?: ModelEventRegistrationConditionInput | null,
  input: DeleteEventRegistrationInput,
};

export type DeleteEventRegistrationMutation = {
  deleteEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: DeleteInvitationInput,
};

export type DeleteInvitationMutation = {
  deleteInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteLLCIncorporationMutationVariables = {
  condition?: ModelLLCIncorporationConditionInput | null,
  input: DeleteLLCIncorporationInput,
};

export type DeleteLLCIncorporationMutation = {
  deleteLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: DeleteMessageInput,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  condition?: ModelNotificationConditionInput | null,
  input: DeleteNotificationInput,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteOnboardingProgressMutationVariables = {
  condition?: ModelOnboardingProgressConditionInput | null,
  input: DeleteOnboardingProgressInput,
};

export type DeleteOnboardingProgressMutation = {
  deleteOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteParentMutationVariables = {
  condition?: ModelParentConditionInput | null,
  input: DeleteParentInput,
};

export type DeleteParentMutation = {
  deleteParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type DeletePaymentRecordMutationVariables = {
  condition?: ModelPaymentRecordConditionInput | null,
  input: DeletePaymentRecordInput,
};

export type DeletePaymentRecordMutation = {
  deletePaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type DeleteProfileMutationVariables = {
  condition?: ModelProfileConditionInput | null,
  input: DeleteProfileInput,
};

export type DeleteProfileMutation = {
  deleteProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type DeleteQuizMutationVariables = {
  condition?: ModelQuizConditionInput | null,
  input: DeleteQuizInput,
};

export type DeleteQuizMutation = {
  deleteQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteQuizAttemptMutationVariables = {
  condition?: ModelQuizAttemptConditionInput | null,
  input: DeleteQuizAttemptInput,
};

export type DeleteQuizAttemptMutation = {
  deleteQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: DeleteSchoolInput,
};

export type DeleteSchoolMutation = {
  deleteSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteSessionMutationVariables = {
  condition?: ModelSessionConditionInput | null,
  input: DeleteSessionInput,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteStaffMutationVariables = {
  condition?: ModelStaffConditionInput | null,
  input: DeleteStaffInput,
};

export type DeleteStaffMutation = {
  deleteStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type DeleteStaffSchoolAssociationMutationVariables = {
  condition?: ModelStaffSchoolAssociationConditionInput | null,
  input: DeleteStaffSchoolAssociationInput,
};

export type DeleteStaffSchoolAssociationMutation = {
  deleteStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type DeleteStudentMutationVariables = {
  condition?: ModelStudentConditionInput | null,
  input: DeleteStudentInput,
};

export type DeleteStudentMutation = {
  deleteStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteStudentDocumentMutationVariables = {
  condition?: ModelStudentDocumentConditionInput | null,
  input: DeleteStudentDocumentInput,
};

export type DeleteStudentDocumentMutation = {
  deleteStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteStudentEducationOrganizationResponsibleContactPersonMutationVariables = {
  condition?: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput | null,
  input: DeleteStudentEducationOrganizationResponsibleContactPersonInput,
};

export type DeleteStudentEducationOrganizationResponsibleContactPersonMutation = {
  deleteStudentEducationOrganizationResponsibleContactPerson?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type DeleteStudentParentAssociationMutationVariables = {
  condition?: ModelStudentParentAssociationConditionInput | null,
  input: DeleteStudentParentAssociationInput,
};

export type DeleteStudentParentAssociationMutation = {
  deleteStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type DeleteStudentSchoolAssociationMutationVariables = {
  condition?: ModelStudentSchoolAssociationConditionInput | null,
  input: DeleteStudentSchoolAssociationInput,
};

export type DeleteStudentSchoolAssociationMutation = {
  deleteStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type DeleteTuitionSettingMutationVariables = {
  condition?: ModelTuitionSettingConditionInput | null,
  input: DeleteTuitionSettingInput,
};

export type DeleteTuitionSettingMutation = {
  deleteTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateAnalyticsEventMutationVariables = {
  condition?: ModelAnalyticsEventConditionInput | null,
  input: UpdateAnalyticsEventInput,
};

export type UpdateAnalyticsEventMutation = {
  updateAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type UpdateApiKeyMutationVariables = {
  condition?: ModelApiKeyConditionInput | null,
  input: UpdateApiKeyInput,
};

export type UpdateApiKeyMutation = {
  updateApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type UpdateApiKeyRotationMutationVariables = {
  condition?: ModelApiKeyRotationConditionInput | null,
  input: UpdateApiKeyRotationInput,
};

export type UpdateApiKeyRotationMutation = {
  updateApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type UpdateApiKeyUsageMutationVariables = {
  condition?: ModelApiKeyUsageConditionInput | null,
  input: UpdateApiKeyUsageInput,
};

export type UpdateApiKeyUsageMutation = {
  updateApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type UpdateAuditLogMutationVariables = {
  condition?: ModelAuditLogConditionInput | null,
  input: UpdateAuditLogInput,
};

export type UpdateAuditLogMutation = {
  updateAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type UpdateCoachPayoutMutationVariables = {
  condition?: ModelCoachPayoutConditionInput | null,
  input: UpdateCoachPayoutInput,
};

export type UpdateCoachPayoutMutation = {
  updateCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateDescriptorMutationVariables = {
  condition?: ModelDescriptorConditionInput | null,
  input: UpdateDescriptorInput,
};

export type UpdateDescriptorMutation = {
  updateDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateDocumentCategoryMutationVariables = {
  condition?: ModelDocumentCategoryConditionInput | null,
  input: UpdateDocumentCategoryInput,
};

export type UpdateDocumentCategoryMutation = {
  updateDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateEducationOrganizationMutationVariables = {
  condition?: ModelEducationOrganizationConditionInput | null,
  input: UpdateEducationOrganizationInput,
};

export type UpdateEducationOrganizationMutation = {
  updateEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type UpdateEnrollmentMutationVariables = {
  condition?: ModelEnrollmentConditionInput | null,
  input: UpdateEnrollmentInput,
};

export type UpdateEnrollmentMutation = {
  updateEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateEventMutationVariables = {
  condition?: ModelEventConditionInput | null,
  input: UpdateEventInput,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type UpdateEventRegistrationMutationVariables = {
  condition?: ModelEventRegistrationConditionInput | null,
  input: UpdateEventRegistrationInput,
};

export type UpdateEventRegistrationMutation = {
  updateEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: UpdateInvitationInput,
};

export type UpdateInvitationMutation = {
  updateInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateLLCIncorporationMutationVariables = {
  condition?: ModelLLCIncorporationConditionInput | null,
  input: UpdateLLCIncorporationInput,
};

export type UpdateLLCIncorporationMutation = {
  updateLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: UpdateMessageInput,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  condition?: ModelNotificationConditionInput | null,
  input: UpdateNotificationInput,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateOnboardingProgressMutationVariables = {
  condition?: ModelOnboardingProgressConditionInput | null,
  input: UpdateOnboardingProgressInput,
};

export type UpdateOnboardingProgressMutation = {
  updateOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateParentMutationVariables = {
  condition?: ModelParentConditionInput | null,
  input: UpdateParentInput,
};

export type UpdateParentMutation = {
  updateParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type UpdatePaymentRecordMutationVariables = {
  condition?: ModelPaymentRecordConditionInput | null,
  input: UpdatePaymentRecordInput,
};

export type UpdatePaymentRecordMutation = {
  updatePaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type UpdateProfileMutationVariables = {
  condition?: ModelProfileConditionInput | null,
  input: UpdateProfileInput,
};

export type UpdateProfileMutation = {
  updateProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type UpdateQuizMutationVariables = {
  condition?: ModelQuizConditionInput | null,
  input: UpdateQuizInput,
};

export type UpdateQuizMutation = {
  updateQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateQuizAttemptMutationVariables = {
  condition?: ModelQuizAttemptConditionInput | null,
  input: UpdateQuizAttemptInput,
};

export type UpdateQuizAttemptMutation = {
  updateQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: UpdateSchoolInput,
};

export type UpdateSchoolMutation = {
  updateSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateSessionMutationVariables = {
  condition?: ModelSessionConditionInput | null,
  input: UpdateSessionInput,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateStaffMutationVariables = {
  condition?: ModelStaffConditionInput | null,
  input: UpdateStaffInput,
};

export type UpdateStaffMutation = {
  updateStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type UpdateStaffSchoolAssociationMutationVariables = {
  condition?: ModelStaffSchoolAssociationConditionInput | null,
  input: UpdateStaffSchoolAssociationInput,
};

export type UpdateStaffSchoolAssociationMutation = {
  updateStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type UpdateStudentMutationVariables = {
  condition?: ModelStudentConditionInput | null,
  input: UpdateStudentInput,
};

export type UpdateStudentMutation = {
  updateStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateStudentDocumentMutationVariables = {
  condition?: ModelStudentDocumentConditionInput | null,
  input: UpdateStudentDocumentInput,
};

export type UpdateStudentDocumentMutation = {
  updateStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateStudentEducationOrganizationResponsibleContactPersonMutationVariables = {
  condition?: ModelStudentEducationOrganizationResponsibleContactPersonConditionInput | null,
  input: UpdateStudentEducationOrganizationResponsibleContactPersonInput,
};

export type UpdateStudentEducationOrganizationResponsibleContactPersonMutation = {
  updateStudentEducationOrganizationResponsibleContactPerson?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type UpdateStudentParentAssociationMutationVariables = {
  condition?: ModelStudentParentAssociationConditionInput | null,
  input: UpdateStudentParentAssociationInput,
};

export type UpdateStudentParentAssociationMutation = {
  updateStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type UpdateStudentSchoolAssociationMutationVariables = {
  condition?: ModelStudentSchoolAssociationConditionInput | null,
  input: UpdateStudentSchoolAssociationInput,
};

export type UpdateStudentSchoolAssociationMutation = {
  updateStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type UpdateTuitionSettingMutationVariables = {
  condition?: ModelTuitionSettingConditionInput | null,
  input: UpdateTuitionSettingInput,
};

export type UpdateTuitionSettingMutation = {
  updateTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateAnalyticsEventSubscriptionVariables = {
  filter?: ModelSubscriptionAnalyticsEventFilterInput | null,
};

export type OnCreateAnalyticsEventSubscription = {
  onCreateAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type OnCreateApiKeySubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyFilterInput | null,
};

export type OnCreateApiKeySubscription = {
  onCreateApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type OnCreateApiKeyRotationSubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyRotationFilterInput | null,
};

export type OnCreateApiKeyRotationSubscription = {
  onCreateApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type OnCreateApiKeyUsageSubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyUsageFilterInput | null,
};

export type OnCreateApiKeyUsageSubscription = {
  onCreateApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type OnCreateAuditLogSubscriptionVariables = {
  filter?: ModelSubscriptionAuditLogFilterInput | null,
};

export type OnCreateAuditLogSubscription = {
  onCreateAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type OnCreateCoachPayoutSubscriptionVariables = {
  filter?: ModelSubscriptionCoachPayoutFilterInput | null,
  owner?: string | null,
};

export type OnCreateCoachPayoutSubscription = {
  onCreateCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateDescriptorSubscriptionVariables = {
  filter?: ModelSubscriptionDescriptorFilterInput | null,
};

export type OnCreateDescriptorSubscription = {
  onCreateDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateDocumentCategorySubscriptionVariables = {
  filter?: ModelSubscriptionDocumentCategoryFilterInput | null,
};

export type OnCreateDocumentCategorySubscription = {
  onCreateDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateEducationOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionEducationOrganizationFilterInput | null,
};

export type OnCreateEducationOrganizationSubscription = {
  onCreateEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type OnCreateEnrollmentSubscriptionVariables = {
  filter?: ModelSubscriptionEnrollmentFilterInput | null,
};

export type OnCreateEnrollmentSubscription = {
  onCreateEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type OnCreateEventRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionEventRegistrationFilterInput | null,
  owner?: string | null,
};

export type OnCreateEventRegistrationSubscription = {
  onCreateEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateInvitationSubscriptionVariables = {
  filter?: ModelSubscriptionInvitationFilterInput | null,
};

export type OnCreateInvitationSubscription = {
  onCreateInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateLLCIncorporationSubscriptionVariables = {
  filter?: ModelSubscriptionLLCIncorporationFilterInput | null,
  owner?: string | null,
};

export type OnCreateLLCIncorporationSubscription = {
  onCreateLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  owner?: string | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateOnboardingProgressSubscriptionVariables = {
  filter?: ModelSubscriptionOnboardingProgressFilterInput | null,
};

export type OnCreateOnboardingProgressSubscription = {
  onCreateOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateParentSubscriptionVariables = {
  filter?: ModelSubscriptionParentFilterInput | null,
  owner?: string | null,
};

export type OnCreateParentSubscription = {
  onCreateParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type OnCreatePaymentRecordSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentRecordFilterInput | null,
  owner?: string | null,
};

export type OnCreatePaymentRecordSubscription = {
  onCreatePaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnCreateProfileSubscription = {
  onCreateProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type OnCreateQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnCreateQuizSubscription = {
  onCreateQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateQuizAttemptSubscriptionVariables = {
  filter?: ModelSubscriptionQuizAttemptFilterInput | null,
  owner?: string | null,
};

export type OnCreateQuizAttemptSubscription = {
  onCreateQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnCreateSchoolSubscription = {
  onCreateSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
  owner?: string | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateStaffSubscriptionVariables = {
  filter?: ModelSubscriptionStaffFilterInput | null,
  owner?: string | null,
};

export type OnCreateStaffSubscription = {
  onCreateStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type OnCreateStaffSchoolAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStaffSchoolAssociationFilterInput | null,
};

export type OnCreateStaffSchoolAssociationSubscription = {
  onCreateStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnCreateStudentSubscription = {
  onCreateStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateStudentDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentDocumentFilterInput | null,
};

export type OnCreateStudentDocumentSubscription = {
  onCreateStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateStudentEducationOrganizationResponsib1252cSubscriptionVariables = {
  filter?: ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput | null,
};

export type OnCreateStudentEducationOrganizationResponsib1252cSubscription = {
  onCreateStudentEducationOrganizationResponsib1252c?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateStudentParentAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStudentParentAssociationFilterInput | null,
};

export type OnCreateStudentParentAssociationSubscription = {
  onCreateStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateStudentSchoolAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStudentSchoolAssociationFilterInput | null,
};

export type OnCreateStudentSchoolAssociationSubscription = {
  onCreateStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateTuitionSettingSubscriptionVariables = {
  filter?: ModelSubscriptionTuitionSettingFilterInput | null,
  owner?: string | null,
};

export type OnCreateTuitionSettingSubscription = {
  onCreateTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteAnalyticsEventSubscriptionVariables = {
  filter?: ModelSubscriptionAnalyticsEventFilterInput | null,
};

export type OnDeleteAnalyticsEventSubscription = {
  onDeleteAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type OnDeleteApiKeySubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyFilterInput | null,
};

export type OnDeleteApiKeySubscription = {
  onDeleteApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type OnDeleteApiKeyRotationSubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyRotationFilterInput | null,
};

export type OnDeleteApiKeyRotationSubscription = {
  onDeleteApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteApiKeyUsageSubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyUsageFilterInput | null,
};

export type OnDeleteApiKeyUsageSubscription = {
  onDeleteApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type OnDeleteAuditLogSubscriptionVariables = {
  filter?: ModelSubscriptionAuditLogFilterInput | null,
};

export type OnDeleteAuditLogSubscription = {
  onDeleteAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type OnDeleteCoachPayoutSubscriptionVariables = {
  filter?: ModelSubscriptionCoachPayoutFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCoachPayoutSubscription = {
  onDeleteCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteDescriptorSubscriptionVariables = {
  filter?: ModelSubscriptionDescriptorFilterInput | null,
};

export type OnDeleteDescriptorSubscription = {
  onDeleteDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteDocumentCategorySubscriptionVariables = {
  filter?: ModelSubscriptionDocumentCategoryFilterInput | null,
};

export type OnDeleteDocumentCategorySubscription = {
  onDeleteDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteEducationOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionEducationOrganizationFilterInput | null,
};

export type OnDeleteEducationOrganizationSubscription = {
  onDeleteEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type OnDeleteEnrollmentSubscriptionVariables = {
  filter?: ModelSubscriptionEnrollmentFilterInput | null,
};

export type OnDeleteEnrollmentSubscription = {
  onDeleteEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type OnDeleteEventRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionEventRegistrationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEventRegistrationSubscription = {
  onDeleteEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteInvitationSubscriptionVariables = {
  filter?: ModelSubscriptionInvitationFilterInput | null,
};

export type OnDeleteInvitationSubscription = {
  onDeleteInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteLLCIncorporationSubscriptionVariables = {
  filter?: ModelSubscriptionLLCIncorporationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLLCIncorporationSubscription = {
  onDeleteLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteOnboardingProgressSubscriptionVariables = {
  filter?: ModelSubscriptionOnboardingProgressFilterInput | null,
};

export type OnDeleteOnboardingProgressSubscription = {
  onDeleteOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteParentSubscriptionVariables = {
  filter?: ModelSubscriptionParentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteParentSubscription = {
  onDeleteParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type OnDeletePaymentRecordSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentRecordFilterInput | null,
  owner?: string | null,
};

export type OnDeletePaymentRecordSubscription = {
  onDeletePaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnDeleteProfileSubscription = {
  onDeleteProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type OnDeleteQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnDeleteQuizSubscription = {
  onDeleteQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteQuizAttemptSubscriptionVariables = {
  filter?: ModelSubscriptionQuizAttemptFilterInput | null,
  owner?: string | null,
};

export type OnDeleteQuizAttemptSubscription = {
  onDeleteQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnDeleteSchoolSubscription = {
  onDeleteSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteStaffSubscriptionVariables = {
  filter?: ModelSubscriptionStaffFilterInput | null,
  owner?: string | null,
};

export type OnDeleteStaffSubscription = {
  onDeleteStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type OnDeleteStaffSchoolAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStaffSchoolAssociationFilterInput | null,
};

export type OnDeleteStaffSchoolAssociationSubscription = {
  onDeleteStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnDeleteStudentSubscription = {
  onDeleteStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteStudentDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentDocumentFilterInput | null,
};

export type OnDeleteStudentDocumentSubscription = {
  onDeleteStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteStudentEducationOrganizationResponsib192cdSubscriptionVariables = {
  filter?: ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput | null,
};

export type OnDeleteStudentEducationOrganizationResponsib192cdSubscription = {
  onDeleteStudentEducationOrganizationResponsib192cd?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteStudentParentAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStudentParentAssociationFilterInput | null,
};

export type OnDeleteStudentParentAssociationSubscription = {
  onDeleteStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteStudentSchoolAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStudentSchoolAssociationFilterInput | null,
};

export type OnDeleteStudentSchoolAssociationSubscription = {
  onDeleteStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteTuitionSettingSubscriptionVariables = {
  filter?: ModelSubscriptionTuitionSettingFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTuitionSettingSubscription = {
  onDeleteTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateAnalyticsEventSubscriptionVariables = {
  filter?: ModelSubscriptionAnalyticsEventFilterInput | null,
};

export type OnUpdateAnalyticsEventSubscription = {
  onUpdateAnalyticsEvent?:  {
    __typename: "AnalyticsEvent",
    createdAt?: string | null,
    eventName: string,
    id: string,
    ipAddress?: string | null,
    properties?: string | null,
    referrer?: string | null,
    sessionId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
    utmCampaign?: string | null,
    utmContent?: string | null,
    utmMedium?: string | null,
    utmSource?: string | null,
    utmTerm?: string | null,
  } | null,
};

export type OnUpdateApiKeySubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyFilterInput | null,
};

export type OnUpdateApiKeySubscription = {
  onUpdateApiKey?:  {
    __typename: "ApiKey",
    createdAt?: string | null,
    createdBy: string,
    description?: string | null,
    expiresAt?: string | null,
    id: string,
    ipWhitelist?: Array< string | null > | null,
    isActive?: boolean | null,
    keyHash: string,
    keyPrefix: string,
    lastRotatedAt?: string | null,
    lastSecurityIncident?: string | null,
    lastUsedAt?: string | null,
    metadata?: string | null,
    name: string,
    permissions?: Array< string | null > | null,
    rateLimitDaily?: number | null,
    rateLimitMinute?: number | null,
    securityIncidents?: number | null,
    updatedAt?: string | null,
    usageCount?: number | null,
  } | null,
};

export type OnUpdateApiKeyRotationSubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyRotationFilterInput | null,
};

export type OnUpdateApiKeyRotationSubscription = {
  onUpdateApiKeyRotation?:  {
    __typename: "ApiKeyRotation",
    createdAt?: string | null,
    gracePeriodEnd?: string | null,
    id: string,
    newKeyId: string,
    oldKeyDeactivated?: boolean | null,
    oldKeyId: string,
    reason?: string | null,
    rotatedBy: string,
    rotationType?: ApiKeyRotationRotationType | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateApiKeyUsageSubscriptionVariables = {
  filter?: ModelSubscriptionApiKeyUsageFilterInput | null,
};

export type OnUpdateApiKeyUsageSubscription = {
  onUpdateApiKeyUsage?:  {
    __typename: "ApiKeyUsage",
    createdAt?: string | null,
    endpoint: string,
    id: string,
    ipAddress?: string | null,
    keyId: string,
    keyPrefix: string,
    metadata?: string | null,
    method?: string | null,
    permissions?: Array< string | null > | null,
    rateLimitHit?: boolean | null,
    requestSize?: number | null,
    responseSize?: number | null,
    responseStatus?: number | null,
    responseTime?: number | null,
    securityViolation?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
  } | null,
};

export type OnUpdateAuditLogSubscriptionVariables = {
  filter?: ModelSubscriptionAuditLogFilterInput | null,
};

export type OnUpdateAuditLogSubscription = {
  onUpdateAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changes?: string | null,
    createdAt: string,
    id: string,
    ipAddress?: string | null,
    metadata?: string | null,
    resource: string,
    resourceId?: string | null,
    timestamp: string,
    updatedAt: string,
    userAgent?: string | null,
    userId?: string | null,
  } | null,
};

export type OnUpdateCoachPayoutSubscriptionVariables = {
  filter?: ModelSubscriptionCoachPayoutFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCoachPayoutSubscription = {
  onUpdateCoachPayout?:  {
    __typename: "CoachPayout",
    coachEmail: string,
    createdAt?: string | null,
    description?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    payoutAmount: number,
    payoutDate?: string | null,
    payoutStatus?: CoachPayoutPayoutStatus | null,
    payoutType?: CoachPayoutPayoutType | null,
    stripeConnectAccountId: string,
    stripePayout?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateDescriptorSubscriptionVariables = {
  filter?: ModelSubscriptionDescriptorFilterInput | null,
};

export type OnUpdateDescriptorSubscription = {
  onUpdateDescriptor?:  {
    __typename: "Descriptor",
    codeValue: string,
    createdAt?: string | null,
    description?: string | null,
    descriptorId: number,
    effectiveBeginDate?: string | null,
    effectiveEndDate?: string | null,
    id: string,
    namespace: string,
    priorDescriptorId?: number | null,
    shortDescription: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateDocumentCategorySubscriptionVariables = {
  filter?: ModelSubscriptionDocumentCategoryFilterInput | null,
};

export type OnUpdateDocumentCategorySubscription = {
  onUpdateDocumentCategory?:  {
    __typename: "DocumentCategory",
    categoryDescription?: string | null,
    categoryName: string,
    createdAt?: string | null,
    documentCategoryId: number,
    id: string,
    isActive?: boolean | null,
    isRequired?: boolean | null,
    sortOrder?: number | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateEducationOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionEducationOrganizationFilterInput | null,
};

export type OnUpdateEducationOrganizationSubscription = {
  onUpdateEducationOrganization?:  {
    __typename: "EducationOrganization",
    addresses?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    etag?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    nameOfInstitution: string,
    operationalStatus?: string | null,
    shortNameOfInstitution?: string | null,
    telephones?: string | null,
    updatedAt?: string | null,
    webSite?: string | null,
  } | null,
};

export type OnUpdateEnrollmentSubscriptionVariables = {
  filter?: ModelSubscriptionEnrollmentFilterInput | null,
};

export type OnUpdateEnrollmentSubscription = {
  onUpdateEnrollment?:  {
    __typename: "Enrollment",
    academicYear?: string | null,
    applicationData?: string | null,
    coachName?: string | null,
    createdAt?: string | null,
    currentStep?: number | null,
    documents?: string | null,
    enrollmentType?: EnrollmentEnrollmentType | null,
    id: string,
    parentId: string,
    schoolPreferences?: string | null,
    sportInterest?: string | null,
    startDate?: string | null,
    status?: EnrollmentStatus | null,
    studentAge?: number | null,
    studentGrade?: string | null,
    studentName: string,
    timelineStatus?: EnrollmentTimelineStatus | null,
    timelineSteps?: string | null,
    totalSteps?: number | null,
    tuitionPlan?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    address?: string | null,
    ageGroups?: Array< string | null > | null,
    capacity?: number | null,
    coachId: string,
    coachName?: string | null,
    createdAt?: string | null,
    currency?: string | null,
    description?: string | null,
    endDate: string,
    equipment?: Array< string | null > | null,
    eventType?: EventEventType | null,
    googleCalendarEventId?: string | null,
    googleCalendarLastSynced?: string | null,
    googleCalendarSyncEnabled?: boolean | null,
    googleMeetUrl?: string | null,
    id: string,
    images?: Array< string | null > | null,
    isOnline?: boolean | null,
    isPublic?: boolean | null,
    location?: string | null,
    meetingUrl?: string | null,
    owner?: string | null,
    price?: number | null,
    registeredCount?: number | null,
    registrationDeadline?: string | null,
    requirements?: Array< string | null > | null,
    shortDescription?: string | null,
    skillLevel?: EventSkillLevel | null,
    startDate: string,
    status?: EventStatus | null,
    tags?: Array< string | null > | null,
    timezone?: string | null,
    title: string,
    updatedAt?: string | null,
    venue?: string | null,
  } | null,
};

export type OnUpdateEventRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionEventRegistrationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEventRegistrationSubscription = {
  onUpdateEventRegistration?:  {
    __typename: "EventRegistration",
    attendanceStatus?: EventRegistrationAttendanceStatus | null,
    createdAt?: string | null,
    eventId: string,
    id: string,
    notes?: string | null,
    owner?: string | null,
    paymentStatus?: EventRegistrationPaymentStatus | null,
    registrationData?: string | null,
    registrationStatus?: EventRegistrationRegistrationStatus | null,
    studentName?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateInvitationSubscriptionVariables = {
  filter?: ModelSubscriptionInvitationFilterInput | null,
};

export type OnUpdateInvitationSubscription = {
  onUpdateInvitation?:  {
    __typename: "Invitation",
    acceptedAt?: string | null,
    bio?: string | null,
    city?: string | null,
    createdAt?: string | null,
    email: string,
    expiresAt: string,
    firstName?: string | null,
    id: string,
    invitationType?: InvitationInvitationType | null,
    invitedBy: string,
    lastName?: string | null,
    lastSentAt?: string | null,
    message?: string | null,
    phone?: string | null,
    schoolName?: string | null,
    schoolType?: string | null,
    sport?: string | null,
    state?: string | null,
    status?: InvitationStatus | null,
    token: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateLLCIncorporationSubscriptionVariables = {
  filter?: ModelSubscriptionLLCIncorporationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLLCIncorporationSubscription = {
  onUpdateLLCIncorporation?:  {
    __typename: "LLCIncorporation",
    businessName: string,
    businessType?: LLCIncorporationBusinessType | null,
    coachId: string,
    completedAt?: string | null,
    cost?: number | null,
    createdAt?: string | null,
    documents?: string | null,
    filedAt?: string | null,
    filingData?: string | null,
    id: string,
    owner?: string | null,
    state: string,
    status?: LLCIncorporationStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    attachments?: string | null,
    content: string,
    createdAt?: string | null,
    id: string,
    messageType?: MessageMessageType | null,
    metadata?: string | null,
    owner?: string | null,
    priority?: MessagePriority | null,
    readAt?: string | null,
    recipientId: string,
    senderId: string,
    sentAt?: string | null,
    status?: MessageStatus | null,
    subject?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    content: string,
    createdAt?: string | null,
    deliveryChannels?: string | null,
    id: string,
    metadata?: string | null,
    notificationType?: NotificationNotificationType | null,
    owner?: string | null,
    priority?: NotificationPriority | null,
    scheduledFor?: string | null,
    sentAt?: string | null,
    status?: NotificationStatus | null,
    title: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateOnboardingProgressSubscriptionVariables = {
  filter?: ModelSubscriptionOnboardingProgressFilterInput | null,
};

export type OnUpdateOnboardingProgressSubscription = {
  onUpdateOnboardingProgress?:  {
    __typename: "OnboardingProgress",
    completedSteps?: Array< string | null > | null,
    createdAt?: string | null,
    currentStep?: OnboardingProgressCurrentStep | null,
    email: string,
    id: string,
    invitationBased?: boolean | null,
    invitationId?: string | null,
    lastUpdated?: string | null,
    stepData?: string | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateParentSubscriptionVariables = {
  filter?: ModelSubscriptionParentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateParentSubscription = {
  onUpdateParent?:  {
    __typename: "Parent",
    backgroundInformation?: string | null,
    createdAt?: string | null,
    employerName?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    parentUSI: number,
    parentUniqueId: string,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    professionDescriptor?: string | null,
    races?: string | null,
    sex?: string | null,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
  } | null,
};

export type OnUpdatePaymentRecordSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentRecordFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePaymentRecordSubscription = {
  onUpdatePaymentRecord?:  {
    __typename: "PaymentRecord",
    applicationId: string,
    coachEmail: string,
    coachPayoutAmount?: number | null,
    createdAt?: string | null,
    depositAmount: number,
    id: string,
    isMarketplacePayment?: boolean | null,
    lastPaymentDate?: string | null,
    nextPaymentDue?: string | null,
    owner?: string | null,
    parentEmail: string,
    paymentHistory?: string | null,
    paymentPlan?: PaymentRecordPaymentPlan | null,
    paymentStatus?: PaymentRecordPaymentStatus | null,
    platformFeeAmount?: number | null,
    stripeConnectAccountId?: string | null,
    stripeCustomerId?: string | null,
    stripePaymentIntentId?: string | null,
    stripePaymentLinkId?: string | null,
    studentId: string,
    studentName: string,
    totalPaid?: number | null,
    tuitionAmount: number,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnUpdateProfileSubscription = {
  onUpdateProfile?:  {
    __typename: "Profile",
    address?: string | null,
    backgroundCheckDate?: string | null,
    backgroundCheckStatus?: ProfileBackgroundCheckStatus | null,
    bio?: string | null,
    certifications?: Array< string | null > | null,
    createdAt?: string | null,
    emergencyContact?: string | null,
    experience?: string | null,
    id: string,
    marketingProgress?: string | null,
    onboardingComplete?: boolean | null,
    preferences?: string | null,
    profileType?: ProfileProfileType | null,
    specialties?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
    wizardProgress?: string | null,
  } | null,
};

export type OnUpdateQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnUpdateQuizSubscription = {
  onUpdateQuiz?:  {
    __typename: "Quiz",
    category?: string | null,
    createdAt?: string | null,
    createdBy?: string | null,
    description?: string | null,
    difficulty?: QuizDifficulty | null,
    id: string,
    isActive?: boolean | null,
    passingScore?: number | null,
    questions: string,
    timeLimit?: number | null,
    title: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateQuizAttemptSubscriptionVariables = {
  filter?: ModelSubscriptionQuizAttemptFilterInput | null,
  owner?: string | null,
};

export type OnUpdateQuizAttemptSubscription = {
  onUpdateQuizAttempt?:  {
    __typename: "QuizAttempt",
    answers: string,
    completedAt?: string | null,
    createdAt: string,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    passed?: boolean | null,
    quizId: string,
    score?: number | null,
    startedAt: string,
    timeSpent?: number | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnUpdateSchoolSubscription = {
  onUpdateSchool?:  {
    __typename: "School",
    administrativeFundingControl?: string | null,
    charterStatus?: string | null,
    createdAt?: string | null,
    etag?: string | null,
    gradeLevels?: string | null,
    id: string,
    lastModifiedDate?: string | null,
    localEducationAgencyId?: number | null,
    magnetSpecialProgramEmphasisSchool?: string | null,
    schoolCategories?: string | null,
    schoolId: number,
    schoolType?: string | null,
    titleIPartASchoolDesignation?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    coachId: string,
    createdAt?: string | null,
    duration?: number | null,
    eventId?: string | null,
    feedback?: string | null,
    id: string,
    location?: string | null,
    notes?: string | null,
    owner?: string | null,
    participants?: string | null,
    scheduledDate: string,
    sessionType?: SessionSessionType | null,
    status?: SessionStatus | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateStaffSubscriptionVariables = {
  filter?: ModelSubscriptionStaffFilterInput | null,
  owner?: string | null,
};

export type OnUpdateStaffSubscription = {
  onUpdateStaff?:  {
    __typename: "Staff",
    birthDate?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    highestCompletedLevelOfEducation?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    isActive?: boolean | null,
    lastSurname: string,
    loginId?: string | null,
    maidenName?: string | null,
    middleName?: string | null,
    owner?: string | null,
    personalEmailAddress?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    staffUSI: number,
    staffUniqueId: string,
    updatedAt?: string | null,
    workEmailAddress?: string | null,
    yearsOfPriorProfessionalExperience?: number | null,
  } | null,
};

export type OnUpdateStaffSchoolAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStaffSchoolAssociationFilterInput | null,
};

export type OnUpdateStaffSchoolAssociationSubscription = {
  onUpdateStaffSchoolAssociation?:  {
    __typename: "StaffSchoolAssociation",
    createdAt?: string | null,
    employmentStatus?: string | null,
    endDate?: string | null,
    hireDate?: string | null,
    id: string,
    programAssignment: string,
    schoolId: number,
    schoolYear?: number | null,
    staffUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnUpdateStudentSubscription = {
  onUpdateStudent?:  {
    __typename: "Student",
    admissionDate?: string | null,
    applicationDate?: string | null,
    birthCity?: string | null,
    birthCountry?: string | null,
    birthDate?: string | null,
    birthStateAbbreviation?: string | null,
    createdAt?: string | null,
    firstName: string,
    generationCodeSuffix?: string | null,
    hispanicLatinoEthnicity?: boolean | null,
    id: string,
    lastSurname: string,
    maidenName?: string | null,
    middleName?: string | null,
    personalTitlePrefix?: string | null,
    races?: string | null,
    sex?: string | null,
    studentApplicationStatus?: StudentStudentApplicationStatus | null,
    studentUSI: number,
    studentUniqueId: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateStudentDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentDocumentFilterInput | null,
};

export type OnUpdateStudentDocumentSubscription = {
  onUpdateStudentDocument?:  {
    __typename: "StudentDocument",
    createdAt?: string | null,
    documentCategoryId: number,
    documentDescription?: string | null,
    documentHash?: string | null,
    documentTitle: string,
    expirationDate?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    id: string,
    isConfidential?: boolean | null,
    mimeType?: string | null,
    reviewComments?: string | null,
    reviewDate?: string | null,
    reviewStatus?: StudentDocumentReviewStatus | null,
    reviewedByStaffUSI?: number | null,
    storageLocation?: string | null,
    studentUSI: number,
    submittedByParentUSI?: number | null,
    submittedDate?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateStudentEducationOrganizationResponsib1c1dfSubscriptionVariables = {
  filter?: ModelSubscriptionStudentEducationOrganizationResponsibleContactPersonFilterInput | null,
};

export type OnUpdateStudentEducationOrganizationResponsib1c1dfSubscription = {
  onUpdateStudentEducationOrganizationResponsib1c1df?:  {
    __typename: "StudentEducationOrganizationResponsibleContactPerson",
    contactAddress?: string | null,
    contactEmailAddress?: string | null,
    contactTelephones?: string | null,
    contactTitle?: string | null,
    createdAt?: string | null,
    educationOrganizationId: number,
    emergencyContactStatus?: boolean | null,
    firstName: string,
    id: string,
    lastSurname: string,
    primaryContactStatus?: boolean | null,
    relation?: string | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateStudentParentAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStudentParentAssociationFilterInput | null,
};

export type OnUpdateStudentParentAssociationSubscription = {
  onUpdateStudentParentAssociation?:  {
    __typename: "StudentParentAssociation",
    contactPriority?: number | null,
    contactRestrictions?: string | null,
    createdAt?: string | null,
    custodyStatus?: StudentParentAssociationCustodyStatus | null,
    emergencyContactStatus?: boolean | null,
    id: string,
    legalGuardian?: boolean | null,
    livesWith?: boolean | null,
    parentUSI: number,
    primaryContactStatus?: boolean | null,
    relation?: StudentParentAssociationRelation | null,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateStudentSchoolAssociationSubscriptionVariables = {
  filter?: ModelSubscriptionStudentSchoolAssociationFilterInput | null,
};

export type OnUpdateStudentSchoolAssociationSubscription = {
  onUpdateStudentSchoolAssociation?:  {
    __typename: "StudentSchoolAssociation",
    admissionStatus?: string | null,
    applicationStatus?: string | null,
    classOfSchoolYear?: number | null,
    createdAt?: string | null,
    entryDate: string,
    entryGradeLevel?: string | null,
    entryType?: string | null,
    exitWithdrawDate?: string | null,
    exitWithdrawType?: string | null,
    id: string,
    repeatGradeIndicator?: boolean | null,
    schoolId: number,
    schoolYear: number,
    studentUSI: number,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateTuitionSettingSubscriptionVariables = {
  filter?: ModelSubscriptionTuitionSettingFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTuitionSettingSubscription = {
  onUpdateTuitionSetting?:  {
    __typename: "TuitionSetting",
    allowPaymentPlans?: boolean | null,
    coachEmail: string,
    coachId: string,
    createdAt?: string | null,
    currency?: string | null,
    defaultDeposit: number,
    defaultTuition: number,
    id: string,
    marketplaceEnabled?: boolean | null,
    owner?: string | null,
    paymentPlanOptions: string,
    platformFeePercent?: number | null,
    stripeConnectAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    amplifyUserId?: string | null,
    createdAt?: string | null,
    email: string,
    firstName?: string | null,
    id: string,
    lastLoginAt?: string | null,
    lastName?: string | null,
    parentUSI?: number | null,
    phone?: string | null,
    role?: UserRole | null,
    staffUSI?: number | null,
    status?: UserStatus | null,
    studentUSI?: number | null,
    updatedAt?: string | null,
  } | null,
};
