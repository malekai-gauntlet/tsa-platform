'use client'

import { useEffect, useState } from 'react'
import { auditLogger, logDataAccess, logApiKey } from '@/lib/services/audit-logger'
import { apiKeyManager, API_PERMISSIONS } from '@/lib/services/api-key-manager'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '@/amplify/data/resource'

const client = generateClient<Schema>()

export function AuditLogExample() {
  const [events, setEvents] = useState<any[]>([])
  const [apiKeys, setApiKeys] = useState<any[]>([])

  // Example: Audited event creation
  const handleCreateEvent = async () => {
    try {
      // Log the operation attempt
      await logDataAccess('CREATE', 'EVENT', 'new-event-id', {
        title: 'Sample Event',
        eventType: 'TRAINING',
      })

      // Create the actual event
      const { data: newEvent } = await client.models.Event.create({
        title: 'Sample Training Event',
        description: 'A sample event for demonstration',
        eventType: 'TRAINING',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        coachId: 'sample-coach-id',
        isPublic: true,
      })

      if (newEvent) {
        setEvents(prev => [...prev, newEvent])
        
        // Log successful creation
        await logDataAccess('CREATE', 'EVENT', newEvent.id, {
          title: newEvent.title,
          eventType: newEvent.eventType,
          success: true,
        })
      }
    } catch (error) {
      // Log the failure
      await auditLogger.log({
        action: 'CREATE_EVENT_FAILED',
        resource: 'EVENT',
        metadata: {
          error: (error as Error).message,
          attemptedData: { title: 'Sample Event' },
        },
        severity: 'MEDIUM',
      })
      
      console.error('Failed to create event:', error)
    }
  }

  // Example: Create API key with audit logging
  const handleCreateApiKey = async () => {
    try {
      const newApiKey = await apiKeyManager.createApiKey({
        name: 'Sample Integration Key',
        description: 'Demo API key for testing',
        permissions: [API_PERMISSIONS.EVENTS_READ, API_PERMISSIONS.STUDENT_APPLICATIONS_READ],
        expiresInDays: 90,
      })

      setApiKeys(prev => [...prev, newApiKey])
      
      // Additional audit log for API key usage grant
      await auditLogger.log({
        action: 'API_KEY_PERMISSIONS_GRANTED',
        resource: 'API_KEY',
        resourceId: newApiKey.id,
        metadata: {
          grantedPermissions: newApiKey.permissions,
          grantedTo: 'Sample Integration',
          securityLevel: 'HIGH',
        },
        severity: 'HIGH',
      })

      alert(`API Key created! Key: ${newApiKey.key}\n\nSave this key securely - it won't be shown again!`)
    } catch (error) {
      console.error('Failed to create API key:', error)
    }
  }

  // Example: Test API key validation
  const handleTestApiKey = async () => {
    const testKey = 'tsa_sample_key_for_testing'
    
    try {
      const validatedKey = await apiKeyManager.validateApiKey(testKey)
      
      if (validatedKey) {
        console.log('API key is valid:', validatedKey)
        
        // Log successful API key usage
        await logApiKey('USE', validatedKey.id, {
          endpoint: 'events:read',
          permission: API_PERMISSIONS.EVENTS_READ,
          status: 'SUCCESS',
        })
      } else {
        console.log('API key validation failed')
        
        // Security violation is already logged in the validation method
      }
    } catch (error) {
      console.error('Error testing API key:', error)
    }
  }

  // Example: Bulk audit logging
  const handleBulkOperation = async () => {
    const bulkEvents = [
      {
        action: 'BULK_EXPORT_INITIATED',
        resource: 'STUDENT_APPLICATIONS',
        metadata: { exportType: 'CSV', recordCount: 150 },
        severity: 'MEDIUM' as const,
      },
      {
        action: 'BULK_EXPORT_DATA_ACCESS',
        resource: 'STUDENT_APPLICATIONS',
        metadata: { accessedFields: ['name', 'email', 'grade', 'status'] },
        severity: 'HIGH' as const,
      },
      {
        action: 'BULK_EXPORT_COMPLETED',
        resource: 'STUDENT_APPLICATIONS',
        metadata: { exportFormat: 'CSV', fileSizeMB: 2.3 },
        severity: 'MEDIUM' as const,
      },
    ]

    await auditLogger.logBatch(bulkEvents)
    console.log('Bulk audit logs recorded')
  }

  // Load recent audit logs (admin only)
  const loadAuditLogs = async () => {
    try {
      const { data: auditLogs } = await client.models.AuditLog.list({
        limit: 20,
        // Note: You'd want to add proper filtering and sorting here
      })
      
      console.log('Recent audit logs:', auditLogs)
    } catch (error) {
      console.error('Failed to load audit logs:', error)
    }
  }

  useEffect(() => {
    // Load initial data
    loadAuditLogs()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Audit Logging Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button 
          onClick={handleCreateEvent}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Event (Audited)
        </button>
        
        <button 
          onClick={handleCreateApiKey}
          className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create API Key (Audited)
        </button>
        
        <button 
          onClick={handleTestApiKey}
          className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Test API Key Validation
        </button>
        
        <button 
          onClick={handleBulkOperation}
          className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Bulk Export (Multi-log)
        </button>
      </div>

      {/* Events Display */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Recent Events</h2>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded border">
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <span className="text-xs text-gray-500">ID: {event.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys Display */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">API Keys</h2>
        <div className="space-y-2">
          {apiKeys.map((key, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded border">
              <h3 className="font-medium">{key.name}</h3>
              <p className="text-sm text-gray-600">{key.description}</p>
              <div className="text-xs text-gray-500">
                <span>Permissions: {key.permissions.join(', ')}</span><br/>
                <span>Usage: {key.usageCount} times</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Audit Trail Information</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✅ All operations are logged with timestamps and user context</li>
          <li>✅ Security violations are automatically detected and logged</li>
          <li>✅ API key usage is tracked with rate limiting</li>
          <li>✅ Failed operations include error details for debugging</li>
          <li>✅ Sensitive data is never logged (only metadata)</li>
        </ul>
      </div>

      {/* Security Best Practices */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">API Key Security</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>🔐 Keys are stored securely in the database</li>
          <li>🔐 Plain-text keys are only shown once during creation</li>
          <li>🔐 Permission-based access control</li>
          <li>🔐 Automatic expiration dates</li>
          <li>🔐 Usage tracking and monitoring</li>
        </ul>
      </div>
    </div>
  )
} 