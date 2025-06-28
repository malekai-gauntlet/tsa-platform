import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export interface AuditEventData {
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export class AuditLogger {
  private static instance: AuditLogger;
  private userId: string | null = null;
  private ipAddress: string | null = null;
  private userAgent: string | null = null;

  private constructor() {
    this.initializeContext();
  }

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  private async initializeContext() {
    try {
      // Get current user
      const user = await getCurrentUser();
      this.userId = user.userId;

      // Get client information (if available)
      if (typeof window !== 'undefined') {
        this.userAgent = navigator.userAgent;

        // Try to get IP address (this is best effort)
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          this.ipAddress = data.ip;
        } catch {
          // Fallback - IP will be logged on backend if needed
          this.ipAddress = 'unknown';
        }
      }
    } catch (error) {
      console.warn('Failed to initialize audit context:', error);
    }
  }

  /**
   * Log a general audit event
   */
  public async log(eventData: AuditEventData): Promise<void> {
    try {
      await client.models.AuditLog.create({
        userId: this.userId,
        action: eventData.action,
        resource: eventData.resource,
        resourceId: eventData.resourceId,
        changes: eventData.changes,
        metadata: {
          ...eventData.metadata,
          severity: eventData.severity || 'LOW',
          clientTimestamp: new Date().toISOString(),
        },
        ipAddress: this.ipAddress,
        userAgent: this.userAgent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to log audit event:', error);
      // In production, you might want to send this to a dead letter queue
      // or alternative logging system
    }
  }

  /**
   * Log authentication events
   */
  public async logAuth(
    action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_RESET',
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log({
      action,
      resource: 'AUTH',
      metadata: {
        ...metadata,
        authMethod: 'cognito',
      },
      severity: action === 'LOGIN_FAILED' ? 'MEDIUM' : 'LOW',
    });
  }

  /**
   * Log API key operations (CRITICAL security events)
   */
  public async logApiKey(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'USE' | 'ABUSE_DETECTED',
    keyId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log({
      action: `API_KEY_${action}`,
      resource: 'API_KEY',
      resourceId: keyId,
      metadata: {
        ...metadata,
        securityEvent: true,
      },
      severity: action === 'ABUSE_DETECTED' ? 'CRITICAL' : action === 'DELETE' ? 'HIGH' : 'MEDIUM',
    });
  }

  /**
   * Log data access events
   */
  public async logDataAccess(
    action: 'READ' | 'CREATE' | 'UPDATE' | 'DELETE',
    resource: string,
    resourceId?: string,
    changes?: Record<string, any>
  ): Promise<void> {
    await this.log({
      action: `DATA_${action.toUpperCase()}`,
      resource: resource.toUpperCase(),
      resourceId,
      changes,
      severity: action === 'DELETE' ? 'HIGH' : action === 'UPDATE' ? 'MEDIUM' : 'LOW',
    });
  }

  /**
   * Log permission changes (HIGH priority)
   */
  public async logPermissionChange(
    action: string,
    targetUserId: string,
    oldPermissions: string[],
    newPermissions: string[]
  ): Promise<void> {
    await this.log({
      action: `PERMISSION_${action.toUpperCase()}`,
      resource: 'USER_PERMISSIONS',
      resourceId: targetUserId,
      changes: {
        oldPermissions,
        newPermissions,
        addedPermissions: newPermissions.filter(p => !oldPermissions.includes(p)),
        removedPermissions: oldPermissions.filter(p => !newPermissions.includes(p)),
      },
      severity: 'HIGH',
    });
  }

  /**
   * Log security violations
   */
  public async logSecurityViolation(
    violationType: string,
    details: Record<string, any>
  ): Promise<void> {
    await this.log({
      action: 'SECURITY_VIOLATION',
      resource: 'SECURITY',
      metadata: {
        violationType,
        ...details,
        requiresInvestigation: true,
      },
      severity: 'CRITICAL',
    });
  }

  /**
   * Log file operations
   */
  public async logFileOperation(
    action: 'UPLOAD' | 'DOWNLOAD' | 'DELETE',
    fileName: string,
    fileSize?: number,
    fileType?: string
  ): Promise<void> {
    await this.log({
      action: `FILE_${action}`,
      resource: 'FILE',
      resourceId: fileName,
      metadata: {
        fileName,
        fileSize,
        fileType,
      },
      severity: action === 'DELETE' ? 'MEDIUM' : 'LOW',
    });
  }

  /**
   * Bulk log events (for batch operations)
   */
  public async logBatch(events: AuditEventData[]): Promise<void> {
    const promises = events.map(event => this.log(event));
    await Promise.allSettled(promises);
  }
}

// Export singleton instance
export const auditLogger = AuditLogger.getInstance();

// Convenience functions for common operations
export const logAuth = (
  action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_RESET',
  metadata?: Record<string, any>
) => auditLogger.logAuth(action, metadata);

export const logApiKey = (
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'USE' | 'ABUSE_DETECTED',
  keyId: string,
  metadata?: Record<string, any>
) => auditLogger.logApiKey(action, keyId, metadata);

export const logDataAccess = (
  action: 'READ' | 'CREATE' | 'UPDATE' | 'DELETE',
  resource: string,
  resourceId?: string,
  changes?: Record<string, any>
) => auditLogger.logDataAccess(action, resource, resourceId, changes);

export const logSecurityViolation = (violationType: string, details: Record<string, any>) =>
  auditLogger.logSecurityViolation(violationType, details);

export const logFileOperation = (
  action: 'UPLOAD' | 'DOWNLOAD' | 'DELETE',
  fileName: string,
  fileSize?: number,
  fileType?: string
) => auditLogger.logFileOperation(action, fileName, fileSize, fileType);
