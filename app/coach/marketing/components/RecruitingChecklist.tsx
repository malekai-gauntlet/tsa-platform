import React from 'react';
import { CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import type { RecruitingStep, ResourceMaterial } from '../types';

interface RecruitingChecklistProps {
  steps: RecruitingStep[];
  completedSteps: Set<string>;
  processingSteps: Set<string>;
  onStepComplete: (stepId: string) => Promise<void>;
  onResourceClick: (resource: ResourceMaterial) => void;
}

export const RecruitingChecklist: React.FC<RecruitingChecklistProps> = ({
  steps,
  completedSteps,
  processingSteps,
  onStepComplete,
  onResourceClick,
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
            <div className="mt-1 h-2 w-48 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-[#004aad] transition-all duration-500"
                style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recruiting Checklist */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isNext = !isCompleted && (index === 0 || completedSteps.has(steps[index - 1].id));
          const isProcessing = processingSteps.has(step.id);

          return (
            <div
              key={step.id}
              className={`border-b border-gray-100 last:border-b-0 ${isNext ? 'bg-blue-50' : ''} ${isProcessing ? 'opacity-70' : ''}`}
            >
              <div className="p-6">
                {/* Step Header */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onStepComplete(step.id)}
                      disabled={isProcessing}
                      className={`relative flex h-6 w-6 cursor-pointer items-center justify-center rounded border-2 transition-colors ${
                        isCompleted
                          ? 'border-green-500 bg-green-500 text-white hover:bg-green-600'
                          : isNext
                            ? 'border-[#004aad] hover:bg-[#004aad] hover:text-white'
                            : 'border-gray-300 hover:border-gray-400'
                      } ${isProcessing ? 'cursor-not-allowed' : ''}`}
                      title={
                        isProcessing
                          ? 'Processing...'
                          : isCompleted
                            ? 'Click to uncheck'
                            : 'Click to check off this step'
                      }
                    >
                      {isProcessing ? (
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                      ) : (
                        isCompleted && <CheckCircleIcon className="h-4 w-4" />
                      )}
                    </button>
                    <h3
                      className={`text-lg font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'} ${isProcessing ? 'text-gray-400' : ''}`}
                    >
                      Step {step.stepNumber}: {step.title}
                      {isProcessing && (
                        <span className="ml-2 text-sm text-gray-400">(Saving...)</span>
                      )}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {isNext && !isCompleted && !isProcessing && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                        Next
                      </span>
                    )}
                    {isProcessing && (
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                        Processing
                      </span>
                    )}
                  </div>
                </div>

                {/* Step Description */}
                <div className="mb-4 ml-9">
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                {/* Resources */}
                <div className="ml-9">
                  <div className="flex flex-wrap gap-3">
                    {step.resources.map(resource => (
                      <button
                        key={resource.id}
                        onClick={() => onResourceClick(resource)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
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
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.size === steps.length && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <span className="font-medium text-green-800">
              🎉 Congratulations! You've completed the student recruiting plan.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
