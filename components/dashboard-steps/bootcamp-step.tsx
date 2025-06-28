'use client';

import { Card, CardHeader, CardContent, Button } from '@/components/ui';
import { ExtendedBadge } from '@/components/ui/badge-extended';
import {
  AcademicCapIcon,
  PlayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

interface BootcampModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  type: 'video' | 'document' | 'quiz';
}

const bootcampModules: BootcampModule[] = [
  {
    id: 'intro',
    title: 'TSA Program Overview',
    description: 'Introduction to the Texas Sports Academy methodology and philosophy',
    duration: '15 min',
    status: 'completed',
    type: 'video',
  },
  {
    id: 'curriculum',
    title: 'Curriculum Framework',
    description: 'Understanding the structured approach to sports education',
    duration: '20 min',
    status: 'completed',
    type: 'video',
  },
  {
    id: 'coaching',
    title: 'Coaching Best Practices',
    description: 'Effective coaching techniques for young athletes',
    duration: '25 min',
    status: 'current',
    type: 'video',
  },
  {
    id: 'safety',
    title: 'Safety Protocols',
    description: 'Essential safety guidelines and emergency procedures',
    duration: '18 min',
    status: 'locked',
    type: 'document',
  },
  {
    id: 'parent-communication',
    title: 'Parent Communication',
    description: 'Building strong relationships with families',
    duration: '12 min',
    status: 'locked',
    type: 'video',
  },
  {
    id: 'assessment',
    title: 'Final Assessment',
    description: 'Test your knowledge of TSA principles',
    duration: '30 min',
    status: 'locked',
    type: 'quiz',
  },
];

export function BootcampStep() {
  const completedModules = bootcampModules.filter(m => m.status === 'completed').length;
  const totalModules = bootcampModules.length;
  const progressPercentage = (completedModules / totalModules) * 100;

  const getModuleIcon = (module: BootcampModule) => {
    if (module.status === 'completed') {
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    }

    switch (module.type) {
      case 'video':
        return <PlayIcon className="h-5 w-5 text-blue-600" />;
      case 'document':
        return <DocumentTextIcon className="h-5 w-5 text-purple-600" />;
      case 'quiz':
        return <AcademicCapIcon className="h-5 w-5 text-orange-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getModuleStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'green' as const, text: 'Completed' };
      case 'current':
        return { color: 'blue' as const, text: 'In Progress' };
      case 'locked':
        return { color: 'zinc' as const, text: 'Locked' };
      default:
        return { color: 'zinc' as const, text: 'Pending' };
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Current Step: Bootcamp</h2>
        <p className="text-gray-600">
          Complete your coaching certification and learn TSA methodologies
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <AcademicCapIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Bootcamp Progress</h3>
                <p className="text-sm text-gray-500">
                  {completedModules} of {totalModules} modules completed
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress Bar */}
          <div className="mb-4 h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {bootcampModules.map(module => (
          <Card
            key={module.id}
            className={`flex h-full flex-col ${module.status === 'locked' ? 'opacity-60' : ''}`}
          >
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="mb-4 flex flex-grow items-start justify-between">
                <div className="flex flex-grow items-center gap-3">
                  {getModuleIcon(module)}
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-500">{module.description}</p>
                  </div>
                </div>
                <ExtendedBadge color={getModuleStatus(module.status).color} rounded="md">
                  {getModuleStatus(module.status).text}
                </ExtendedBadge>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4" />
                  {module.duration}
                </div>

                <div className="flex gap-2">
                  {module.status === 'completed' && <Button variant="outline">Review</Button>}
                  {module.status === 'current' && <Button>Continue</Button>}
                  {module.status === 'locked' && (
                    <Button variant="outline" disabled>
                      Locked
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      {completedModules < totalModules && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">Ready to continue?</h4>
                <p className="text-sm text-gray-500">
                  Complete the next module to advance in your bootcamp training
                </p>
              </div>
              <Button>Continue Training</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Certificate */}
      {completedModules === totalModules && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="mb-1 font-semibold text-green-900">Bootcamp Complete!</h4>
                  <p className="text-sm text-green-700">
                    Congratulations! You've completed all bootcamp modules.
                  </p>
                </div>
              </div>
              <Button variant="outline">Download Certificate</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
