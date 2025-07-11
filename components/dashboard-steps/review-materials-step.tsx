'use client';

import { Card, CardHeader, CardContent, Button } from '@/components/ui';
import { Badge } from '@/components/data-display';
import {
  DocumentIcon,
  Square2StackIcon,
  PlayIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'brochure' | 'video' | 'template' | 'guide';
  status: 'new' | 'viewed' | 'downloaded';
  fileSize?: string;
  duration?: string;
}

const marketingMaterials: Material[] = [
  {
    id: 'overview-brochure',
    title: 'School Overview Brochure',
    description: 'Comprehensive program overview for prospective families',
    type: 'brochure',
    status: 'downloaded',
    fileSize: '2.4 MB',
  },
  {
    id: 'parent-packet',
    title: 'Parent Information Packet',
    description: 'Detailed parent resources and enrollment information',
    type: 'guide',
    status: 'viewed',
    fileSize: '1.8 MB',
  },
  {
    id: 'intro-video',
    title: 'Program Introduction Video',
    description: '5-minute overview video for social media and presentations',
    type: 'video',
    status: 'new',
    duration: '5:32',
  },
  {
    id: 'social-templates',
    title: 'Social Media Templates',
    description: 'Ready-to-use graphics for Instagram, Facebook, and Twitter',
    type: 'template',
    status: 'new',
    fileSize: '15.2 MB',
  },
];

const mediaAssets: Material[] = [
  {
    id: 'facility-photos',
    title: 'Facility Photo Gallery',
    description: 'High-resolution photos of TSA training facilities',
    type: 'template',
    status: 'viewed',
    fileSize: '45.6 MB',
  },
  {
    id: 'coach-bios',
    title: 'Coach Biography Templates',
    description: 'Professional bio templates for marketing materials',
    type: 'template',
    status: 'new',
    fileSize: '890 KB',
  },
];

export function ReviewMaterialsStep() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'brochure':
      case 'guide':
        return <DocumentIcon className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <PlayIcon className="h-5 w-5 text-purple-600" />;
      case 'template':
        return <Square2StackIcon className="h-5 w-5 text-green-600" />;
      default:
        return <DocumentIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'downloaded':
        return { color: 'green' as const, text: 'Downloaded' };
      case 'viewed':
        return { color: 'blue' as const, text: 'Viewed' };
      case 'new':
        return { color: 'orange' as const, text: 'New' };
      default:
        return { color: 'zinc' as const, text: 'Pending' };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'brochure':
      case 'guide':
        return 'bg-blue-100';
      case 'video':
        return 'bg-purple-100';
      case 'template':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Current Step: Review Materials</h2>
        <p className="text-gray-600">
          Review promotional content and marketing materials for your school
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Marketing Materials */}
        <Card>
          <CardHeader
            action={
              <a
                href="#"
                className="text-sm font-medium text-[#004aad] transition-colors hover:text-[#003888]"
              >
                Download All
              </a>
            }
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <DocumentIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Marketing Materials</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketingMaterials.map(material => (
                <div
                  key={material.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className={`rounded-lg p-2 ${getTypeColor(material.type)}`}>
                      {getTypeIcon(material.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-900">{material.title}</h4>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {material.description}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge color={getStatusBadge(material.status).color}>
                          {getStatusBadge(material.status).text}
                        </Badge>
                        {material.fileSize && (
                          <span className="text-xs text-gray-400">{material.fileSize}</span>
                        )}
                        {material.duration && (
                          <span className="text-xs text-gray-400">{material.duration}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="px-3">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="px-3">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Assets */}
        <Card>
          <CardHeader
            action={
              <a
                href="#"
                className="text-sm font-medium text-[#004aad] transition-colors hover:text-[#003888]"
              >
                View All
              </a>
            }
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Square2StackIcon className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Media Assets</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <Square2StackIcon className="mx-auto mb-3 h-8 w-8 text-gray-400" />
              <h4 className="mb-1 text-sm font-semibold text-gray-900">
                Media library coming soon
              </h4>
              <p className="mb-4 text-sm text-gray-500">
                Additional media assets will be available here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Guidelines */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Usage Guidelines</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">Branding</h4>
              <p className="text-sm text-blue-700">
                Maintain TSA brand consistency across all materials. Do not modify logos or color
                schemes.
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">Customization</h4>
              <p className="text-sm text-green-700">
                Add your school name, location, and contact information to designated areas in
                templates.
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <h4 className="mb-2 font-semibold text-purple-900">Distribution</h4>
              <p className="text-sm text-purple-700">
                Share materials through approved channels. Contact support for bulk printing
                recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-1 font-semibold text-gray-900">Ready to move forward?</h4>
              <p className="text-sm text-gray-500">
                Once you've reviewed all materials, you can proceed to the next step in your school
                opening timeline.
              </p>
            </div>
            <Button>Mark as Complete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
