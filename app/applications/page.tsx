'use client';

import React, { useState, useEffect } from 'react';

interface Application {
  id: string;
  submittedAt: string;
  studentName: string;
  studentAge: number | null;
  studentGrade: string;
  parent1Name: string;
  parent1Email: string;
  parent1Phone: string;
  schoolName: string;
  coachEmail: string;
  status: string;
  sportInterest: string;
  whyApplying?: string;
  [key: string]: any;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/applications/list');
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications);
      } else {
        setError(data.error || 'Failed to fetch applications');
      }
    } catch (err) {
      setError('Error fetching applications');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Applications</h1>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Applications</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Applications</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchApplications}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Applications</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            {applications.length} Total Applications
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600">Applications submitted through your school websites will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{app.studentName}</h3>
                      <p className="text-gray-600">
                        Grade {app.studentGrade} • Age {app.studentAge} • {app.sportInterest}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {app.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(app.submittedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Parent Contact</h4>
                      <p className="text-sm text-gray-600">{app.parent1Name}</p>
                      <p className="text-sm text-gray-600">{app.parent1Email}</p>
                      <p className="text-sm text-gray-600">{app.parent1Phone}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">School</h4>
                      <p className="text-sm text-gray-600">{app.schoolName}</p>
                      <p className="text-sm text-gray-600">{app.coachEmail}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">Location</h4>
                      <p className="text-sm text-gray-600">{app.city}, {app.state}</p>
                      <p className="text-sm text-gray-600">Enrollment: {app.enrollmentDate}</p>
                    </div>
                  </div>

                  {app.whyApplying && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Why Applying</h4>
                      <p className="text-sm text-gray-600">{app.whyApplying}</p>
                    </div>
                  )}

                  {/* Baseball fields for Bennett Schools */}
                  {app.primaryPosition && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Baseball Information</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Position:</span> {app.primaryPosition}
                        </div>
                        <div>
                          <span className="font-medium">Bats/Throws:</span> {app.batsThrows}
                        </div>
                        <div>
                          <span className="font-medium">Height:</span> {app.height}
                        </div>
                        <div>
                          <span className="font-medium">Weight:</span> {app.weight}
                        </div>
                        {app.graduationYear && (
                          <div>
                            <span className="font-medium">Graduation:</span> {app.graduationYear}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 