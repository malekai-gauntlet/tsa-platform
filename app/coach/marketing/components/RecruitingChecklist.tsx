import React, { memo } from 'react';
import { CheckCircleIcon, ArrowTopRightOnSquareIcon, PlayCircleIcon, PhotoIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import type { RecruitingStep, ResourceMaterial } from '../types';

interface RecruitingChecklistProps {
  steps: RecruitingStep[];
  completedSteps: Set<string>;
  processingSteps: Set<string>;
  onStepComplete: (stepId: string) => Promise<void>;
  onResourceClick: (resource: ResourceMaterial) => void;
}

const CompactEmbeddedPreview: React.FC<{ resource: ResourceMaterial; onResourceClick: (resource: ResourceMaterial) => void }> = ({ resource, onResourceClick }) => {
  const getEmbedUrl = (url: string, type: string): string | null => {
    // YouTube
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Google Slides
    if (url.includes('docs.google.com/presentation')) {
      if (url.includes('/edit')) {
        return url.replace('/edit', '/embed');
      } else if (url.includes('/copy')) {
        return url.replace('/copy', '/embed');
      }
      return url + '/embed';
    }
    
    // Heyzine flipbook
    if (url.includes('heyzine.com')) {
      return url;
    }
    
    return null;
  };

  const embedUrl = resource.url ? getEmbedUrl(resource.url, resource.type) : null;
  
  // For 2HL results, don't embed - just show as regular resource
  if (resource.id === '2hl-results') {
    return (
      <div className="h-80 rounded-lg border border-gray-200 p-4 flex flex-col">
        <div className="flex-1 flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
          <div style={{ color: resource.color }}>
            <resource.icon className="h-16 w-16" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
          <button
            onClick={() => onResourceClick(resource)}
            className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
          >
            View Results Data
            <ArrowTopRightOnSquareIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }
  
  if (!embedUrl) {
    return (
      <div className="h-80 rounded-lg border border-gray-200 p-4 flex flex-col">
        <div className="flex-1 flex items-center justify-center rounded-lg bg-gray-50">
          <div style={{ color: resource.color }}>
            <resource.icon className="h-16 w-16" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
          <button
            onClick={() => onResourceClick(resource)}
            className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
          >
            View Details
            <DocumentTextIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-80 rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      <div className="h-48 w-full">
        <iframe
          src={embedUrl}
          title={resource.title}
          className="h-full w-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{resource.title}</h4>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={() => onResourceClick(resource)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            View Notes
          </button>
          <button
            onClick={() => window.open(resource.url, '_blank')}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Open Original ↗
          </button>
        </div>
      </div>
    </div>
  );
};

const MarketingMaterialCard: React.FC<{ resource: ResourceMaterial }> = ({ resource }) => {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <PhotoIcon className="h-16 w-16 text-purple-400" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowTopRightOnSquareIcon className="h-8 w-8 text-white" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <p className="text-xs font-medium text-white">{resource.title}</p>
      </div>
    </div>
  );
};

export const RecruitingChecklist: React.FC<RecruitingChecklistProps> = memo(({
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
            <h2 className="text-xl font-bold text-gray-900">Your Marketing Toolkit</h2>
            <p className="mt-2 text-zinc-500">
              Everything you need to confidently pitch parents and market your school effectively.
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

      {/* Marketing Toolkit */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isNext = !isCompleted && (index === 0 || completedSteps.has(steps[index - 1].id));
          const isProcessing = processingSteps.has(step.id);

          // Special handling for different sections
          const isTestimonialsSection = step.id === 'testimonials';
          const isMarketingMaterialsSection = step.id === 'marketing-materials';
          const shouldShowEmbeddedPreviews = step.id === 'how-to-pitch-parents' || step.id === 'information-about-2hl';

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
                  {/* Compact 3-Card Grid for Informational Content */}
                  {shouldShowEmbeddedPreviews ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {step.resources.map(resource => (
                        <CompactEmbeddedPreview 
                          key={resource.id} 
                          resource={resource} 
                          onResourceClick={onResourceClick}
                        />
                      ))}
                    </div>
                  ) : isTestimonialsSection ? (
                    /* Simple Buttons for Testimonials */
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-gray-900">Testimonial Videos to Show Parents</h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {step.resources.map(resource => (
                          <button
                            key={resource.id}
                            onClick={() => onResourceClick(resource)}
                            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50"
                          >
                            <div>
                              <h5 className="font-medium text-gray-900">{resource.title}</h5>
                              <p className="text-sm text-gray-600">Click to watch testimonial</p>
                            </div>
                            <PlayCircleIcon className="h-6 w-6 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : isMarketingMaterialsSection ? (
                    /* Visual Grid for Marketing Materials */
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-gray-900">Professional Marketing Graphics</h4>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {step.resources.map(resource => (
                          <button
                            key={resource.id}
                            onClick={() => onResourceClick(resource)}
                            className="text-left transition-transform hover:scale-105"
                          >
                            <MarketingMaterialCard resource={resource} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Default Layout for Other Resources */
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
                  )}
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
              🎉 Congratulations! You've reviewed all your marketing resources and are ready to pitch parents.
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

RecruitingChecklist.displayName = 'RecruitingChecklist';
