'use client';

import { Card, CardContent, Button } from '@/components/ui';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface SimpleStepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  comingSoon?: boolean;
}

export function SimpleStep({
  stepNumber,
  title,
  description,
  icon,
  comingSoon = true,
}: SimpleStepProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Step {stepNumber}: {title}
        </h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
              {icon || <CheckCircleIcon />}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mx-auto mb-6 max-w-md text-gray-500">{description}</p>

            {comingSoon ? (
              <div>
                <p className="mb-4 text-sm text-gray-400">
                  Detailed guidance for this step is coming soon.
                </p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            ) : (
              <Button>Get Started</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
