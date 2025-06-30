import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/button';
import { XMarkIcon, ClipboardDocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import type { ResourceMaterial } from '../types';
import { getResourceContent } from '../data/resource-content';

interface ResourceModalProps {
  isOpen: boolean;
  resource: ResourceMaterial | null;
  onClose: () => void;
}

function getVideoEmbedUrl(url: string): string | null {
  // YouTube URL patterns
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Vimeo URL patterns
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  return null;
}

function isTestimonialVideo(resourceId: string): boolean {
  return resourceId.includes('testimonial-video');
}

function shouldEmbedResource(resource: ResourceMaterial): boolean {
  // Don't embed testimonial videos - they should open externally
  if (isTestimonialVideo(resource.id)) {
    return false;
  }
  
  if (!resource.url) return true; // Has local content
  
  // Embed YouTube and Vimeo videos for non-testimonials
  if (resource.type === 'video') {
    return getVideoEmbedUrl(resource.url) !== null;
  }
  
  // Embed certain document types
  if (resource.type === 'guide' && resource.url.includes('heyzine.com')) {
    return true;
  }
  
  // Embed Google Slides presentations
  if (resource.type === 'template' && resource.url.includes('docs.google.com/presentation')) {
    return true;
  }
  
  return false;
}

function getGoogleSlidesEmbedUrl(url: string): string | null {
  if (url.includes('docs.google.com/presentation')) {
    // Convert Google Slides URL to embeddable format
    if (url.includes('/edit')) {
      return url.replace('/edit', '/embed');
    } else if (url.includes('/copy')) {
      return url.replace('/copy', '/embed');
    }
    return url + '/embed';
  }
  return null;
}

export const ResourceModal: React.FC<ResourceModalProps> = React.memo(({ isOpen, resource, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Focus trap for the modal
  useEffect(() => {
    if (isOpen && resource && modalRef.current) {
      // Focus the modal
      modalRef.current.focus();
      
      // Prevent body scrolling while modal is open
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore body scrolling
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, resource]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && resource) {
        onClose();
      }
    };
    
    if (isOpen && resource) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, resource]);
  
  if (!isOpen || !resource) return null;
  
  const handleCopyContent = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(getResourceContent(resource.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  const handleOpenExternal = (): void => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const shouldEmbed = shouldEmbedResource(resource);
  const videoEmbedUrl = resource.type === 'video' && resource.url && shouldEmbed ? getVideoEmbedUrl(resource.url) : null;
  const slidesEmbedUrl = resource.type === 'template' && resource.url && shouldEmbed ? getGoogleSlidesEmbedUrl(resource.url) : null;

  // For testimonials, just show a message and open externally
  if (isTestimonialVideo(resource.id)) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="resource-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div 
          className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="p-8 text-center">
            <h2 className="mb-4 text-xl font-bold text-gray-900">{resource.title}</h2>
            <p className="mb-6 text-gray-600">
              This testimonial video will open in a new tab. You can show this video directly to parents during presentations or share the link with them.
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                className="cursor-pointer bg-[#004aad] text-white hover:bg-[#003888]"
                onClick={handleOpenExternal}
              >
                <ArrowTopRightOnSquareIcon className="mr-1 h-4 w-4" />
                Watch Video
              </Button>
              <Button
                className="cursor-pointer border border-gray-200 hover:bg-gray-50"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="resource-modal-title"
      onClick={(e) => {
        // Close if clicking the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="flex h-full max-h-[90vh]">
          <div className="flex-1 overflow-y-auto p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 id="resource-modal-title" className="text-2xl font-bold text-gray-900">{resource.title}</h2>
                <p className="mt-1 text-gray-600">{resource.description}</p>
                {resource.type === 'video' && (
                  <span className="mt-2 inline-block rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                    Video Resource
                  </span>
                )}
                {resource.type === 'template' && (
                  <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                    Template Resource
                  </span>
                )}
                {resource.type === 'guide' && (
                  <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Guide Resource
                  </span>
                )}
              </div>
              <Button
                className="cursor-pointer border border-gray-200 hover:bg-gray-50"
                onClick={onClose}
                aria-label="Close"
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="prose max-w-none">
              {/* Embedded Video */}
              {videoEmbedUrl && (
                <div className="mb-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <iframe
                      src={videoEmbedUrl}
                      title={resource.title}
                      className="h-full w-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Embedded Google Slides */}
              {slidesEmbedUrl && (
                <div className="mb-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                    <iframe
                      src={slidesEmbedUrl}
                      title={resource.title}
                      className="h-full w-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Embedded Flipbook */}
              {resource.type === 'guide' && resource.url?.includes('heyzine.com') && (
                <div className="mb-6">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                    <iframe
                      src={resource.url}
                      title={resource.title}
                      className="h-full w-full"
                      frameBorder="0"
                    />
                  </div>
                </div>
              )}

              {/* Embedded 2HL Results Page */}
              {resource.id === '2hl-results' && resource.url && (
                <div className="mb-6">
                  <div className="relative min-h-[600px] w-full overflow-hidden rounded-lg border">
                    <iframe
                      src={resource.url}
                      title={resource.title}
                      className="h-full w-full"
                      frameBorder="0"
                    />
                  </div>
                </div>
              )}

              {/* Text Content */}
              <pre 
                className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-white p-8 font-sans text-base leading-7 text-gray-900 shadow-sm"
                ref={contentRef}
                tabIndex={0} // Make the content focusable for screen readers
              >
                {getResourceContent(resource.id)}
              </pre>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-3">
                {resource.url && (
                  <Button
                    className="cursor-pointer border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    onClick={handleOpenExternal}
                    aria-label="Open in new tab"
                  >
                    <ArrowTopRightOnSquareIcon className="mr-1 h-4 w-4" />
                    Open Original
                  </Button>
                )}
                <Button
                  className="cursor-pointer border border-gray-200 hover:bg-gray-50"
                  onClick={handleCopyContent}
                  aria-label={copied ? 'Content copied' : 'Copy content'}
                >
                  <ClipboardDocumentIcon className="mr-1 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy Notes'}
                </Button>
              </div>
              <Button
                className="cursor-pointer bg-[#004aad] text-white hover:bg-[#003888]"
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Display name for React DevTools
ResourceModal.displayName = 'ResourceModal';
