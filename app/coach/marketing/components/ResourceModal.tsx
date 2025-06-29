import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/button';
import { XMarkIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid';
import type { ResourceMaterial } from '../types';
import { getResourceContent } from '../data/resource-content';

interface ResourceModalProps {
  isOpen: boolean;
  resource: ResourceMaterial | null;
  onClose: () => void;
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
        className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
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
              <pre 
                className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-white p-8 font-sans text-base leading-7 text-gray-900 shadow-sm"
                ref={contentRef}
                tabIndex={0} // Make the content focusable for screen readers
              >
                {getResourceContent(resource.id)}
              </pre>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
              <Button
                className="cursor-pointer border border-gray-200 hover:bg-gray-50"
                onClick={handleCopyContent}
                aria-label={copied ? 'Content copied' : 'Copy content'}
              >
                <ClipboardDocumentIcon className="mr-1 h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Content'}
              </Button>
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
