import React from 'react'
import { CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import type { RecruitingStep, ResourceMaterial } from '../types'

interface RecruitingChecklistProps {
  steps: RecruitingStep[]
  completedSteps: Set<string>
  processingSteps: Set<string>
  onStepComplete: (stepId: string) => Promise<void>
  onResourceClick: (resource: ResourceMaterial) => void
}

export const RecruitingChecklist: React.FC<RecruitingChecklistProps> = ({
  steps,
  completedSteps,
  processingSteps,
  onStepComplete,
  onResourceClick
}) => {
  return (
    <div className="mb-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Student Recruiting Plan</h2>
            <p className="mt-2 text-zinc-500">
              Step-by-step checklist to attract and convert families to your program.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {completedSteps.size} of {steps.length} completed
            </div>
            <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-[#004aad] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recruiting Checklist */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id)
          const isNext = !isCompleted && (index === 0 || completedSteps.has(steps[index - 1].id))
          const isProcessing = processingSteps.has(step.id)
          
          return (
            <div key={step.id} className={`border-b border-gray-100 last:border-b-0 ${isNext ? 'bg-blue-50' : ''} ${isProcessing ? 'opacity-70' : ''}`}>
              <div className="p-6">
                {/* Step Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onStepComplete(step.id)}
                      disabled={isProcessing}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors cursor-pointer relative ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white hover:bg-green-600' 
                          : isNext 
                            ? 'border-[#004aad] hover:bg-[#004aad] hover:text-white' 
                            : 'border-gray-300 hover:border-gray-400'
                      } ${isProcessing ? 'cursor-not-allowed' : ''}`}
                      title={isProcessing ? 'Processing...' : isCompleted ? 'Click to uncheck' : 'Click to check off this step'}
                    >
                      {isProcessing ? (
                        <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      ) : (
                        isCompleted && <CheckCircleIcon className="h-4 w-4" />
                      )}
                    </button>
                    <h3 className={`text-lg font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'} ${isProcessing ? 'text-gray-400' : ''}`}>
                      Step {step.stepNumber}: {step.title}
                      {isProcessing && <span className="text-sm text-gray-400 ml-2">(Saving...)</span>}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {isNext && !isCompleted && !isProcessing && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Next
                      </span>
                    )}
                    {isProcessing && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        Processing
                      </span>
                    )}
                  </div>
                </div>

                {/* Step Description */}
                <div className="ml-9 mb-4">
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>

                {/* Resources */}
                <div className="ml-9">
                  <div className="flex flex-wrap gap-3">
                    {step.resources.map((resource) => (
                      <button
                        key={resource.id}
                        onClick={() => onResourceClick(resource)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        <div style={{ color: resource.color }}>
                          <resource.icon className="h-4 w-4" />
                        </div>
                        <span>{resource.title}</span>
                        <ArrowTopRightOnSquareIcon className="h-3 w-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.size === steps.length && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <span className="text-green-800 font-medium">
              🎉 Congratulations! You've completed the student recruiting plan.
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 