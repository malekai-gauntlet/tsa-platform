import { generateClient } from 'aws-amplify/data'
import { getCurrentUser } from 'aws-amplify/auth'
import type { Schema } from '@/amplify/data/resource'

const client = generateClient<Schema>()

export interface CreateApiKeyRequest {
  name: string
  description?: string
  permissions: string[]
  expiresInDays?: number
}

export interface ApiKeyResponse {
  id: string
  name: string
  description?: string
  permissions: string[]
  isActive: boolean
  usageCount: number
  lastUsedAt?: string
  expiresAt?: string
  createdAt: string
  key?: string // Only returned once during creation
}

/**
 * Simple API key manager without complex singleton pattern or rate limiting
 */
export class ApiKeyManager {
  /**
   * Generate a simple API key
   */
  private generateApiKey(): string {
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substring(2)
    return `tsa_${timestamp}_${randomPart}`
  }

  /**
   * Create a new API key
   */
  async createApiKey(request: CreateApiKeyRequest): Promise<ApiKeyResponse> {
    const currentUser = await getCurrentUser()
    if (!currentUser?.userId) {
      throw new Error('No authenticated user found')
    }

    const apiKey = this.generateApiKey()
    const expiresAt = request.expiresInDays 
      ? new Date(Date.now() + request.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : undefined

    const { data: newKey } = await client.models.ApiKey.create({
      keyHash: apiKey, // Store the key directly for simplicity
      keyPrefix: apiKey.substring(0, 8),
      name: request.name,
      description: request.description,
      permissions: request.permissions,
      isActive: true,
      usageCount: 0,
      createdBy: currentUser.userId,
      expiresAt,
    })

    if (!newKey) {
      throw new Error('Failed to create API key')
    }

    return {
      id: newKey.id,
      name: newKey.name || '',
      description: newKey.description || undefined,
      permissions: (newKey.permissions || []).filter((p): p is string => p !== null),
      isActive: newKey.isActive || false,
      usageCount: newKey.usageCount || 0,
      lastUsedAt: newKey.lastUsedAt || undefined,
      expiresAt: newKey.expiresAt || undefined,
      createdAt: newKey.createdAt || new Date().toISOString(),
      key: apiKey, // Return the key only once
    }
  }

  /**
   * Validate an API key (simplified)
   */
  async validateApiKey(key: string): Promise<ApiKeyResponse | null> {
    const { data: apiKeys } = await client.models.ApiKey.list({
      filter: {
        keyHash: { eq: key },
        isActive: { eq: true }
      }
    })

    const apiKey = apiKeys[0]
    if (!apiKey) return null

    // Check expiration
    if (apiKey.expiresAt && new Date() > new Date(apiKey.expiresAt)) {
      return null
    }

    return {
      id: apiKey.id,
      name: apiKey.name || '',
      description: apiKey.description || undefined,
      permissions: (apiKey.permissions || []).filter((p): p is string => p !== null),
      isActive: apiKey.isActive || false,
      usageCount: apiKey.usageCount || 0,
      lastUsedAt: apiKey.lastUsedAt || undefined,
      expiresAt: apiKey.expiresAt || undefined,
      createdAt: apiKey.createdAt || new Date().toISOString(),
    }
  }

  /**
   * Revoke an API key
   */
  async revokeApiKey(keyId: string): Promise<boolean> {
    try {
      const { data: updatedKey } = await client.models.ApiKey.update({
        id: keyId,
        isActive: false,
      })
      return !!updatedKey
    } catch (error) {
      console.error('Error revoking API key:', error)
      return false
    }
  }

  /**
   * List all API keys
   */
  async listApiKeys(): Promise<ApiKeyResponse[]> {
    const { data: apiKeys } = await client.models.ApiKey.list()
    
    return apiKeys.map(key => ({
      id: key.id,
      name: key.name || '',
      description: key.description || undefined,
      permissions: (key.permissions || []).filter((p): p is string => p !== null),
      isActive: key.isActive || false,
      usageCount: key.usageCount || 0,
      lastUsedAt: key.lastUsedAt || undefined,
      expiresAt: key.expiresAt || undefined,
      createdAt: key.createdAt || new Date().toISOString(),
    }))
  }
}

// Simple export - no singleton needed
export const apiKeyManager = new ApiKeyManager()

// Simplified permission constants
export const API_PERMISSIONS = {
  STUDENT_APPLICATIONS_READ: 'student-applications:read',
  STUDENT_APPLICATIONS_WRITE: 'student-applications:write',
  EVENTS_READ: 'events:read',
  EVENTS_WRITE: 'events:write',
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  ADMIN_FULL: 'admin:full',
} as const 