
export interface RecruitingStep {
  id: string
  stepNumber: number
  title: string
  description: string
  estimatedTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  resources: ResourceMaterial[]
  isCompleted?: boolean
}

export interface ResourceMaterial {
  id: string
  title: string
  description: string
  type: 'video' | 'template' | 'guide' | 'copy'
  url?: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export interface ErrorState {
  type: string
  message: string
}

export const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Hard': 'bg-red-100 text-red-800'
} as const

 