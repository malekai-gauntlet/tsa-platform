import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '@/amplify/data/resource';
import { auditLogger } from './audit-logger';

const client = generateClient<Schema>();

/**
 * Simple audit middleware for logging operations
 */
export class AuditMiddleware {
  /**
   * Log a data access operation
   */
  async logOperation(
    action: 'READ' | 'CREATE' | 'UPDATE' | 'DELETE',
    resource: string,
    resourceId?: string,
    metadata?: any
  ): Promise<void> {
    try {
      await auditLogger.logDataAccess(action, resource, resourceId, metadata);
    } catch (error) {
      console.error('Failed to log audit operation:', error);
      // Don't throw - audit failures shouldn't break the main operation
    }
  }

  /**
   * Wrap any operation with audit logging
   */
  async wrapOperation<T>(
    operation: () => Promise<T>,
    operationName: string,
    resource: string,
    resourceId?: string
  ): Promise<T> {
    const startTime = Date.now();
    const action = this.getActionFromOperation(operationName);

    try {
      const result = await operation();

      // Log successful operation
      await this.logOperation(action, resource, resourceId, {
        operationName,
        duration: Date.now() - startTime,
        success: true,
      });

      return result;
    } catch (error) {
      // Log failed operation
      await this.logOperation(action, resource, resourceId, {
        operationName,
        duration: Date.now() - startTime,
        error: (error as Error).message,
        success: false,
      });

      throw error;
    }
  }

  private getActionFromOperation(operationName: string): 'READ' | 'CREATE' | 'UPDATE' | 'DELETE' {
    if (operationName.toLowerCase().includes('create')) return 'CREATE';
    if (operationName.toLowerCase().includes('update')) return 'UPDATE';
    if (operationName.toLowerCase().includes('delete')) return 'DELETE';
    return 'READ';
  }
}

// Simple export
export const auditMiddleware = new AuditMiddleware();

/**
 * Simple hook for audit logging in components
 */
export function useAuditLog() {
  return {
    log: auditMiddleware.logOperation.bind(auditMiddleware),
    wrap: auditMiddleware.wrapOperation.bind(auditMiddleware),
  };
}
