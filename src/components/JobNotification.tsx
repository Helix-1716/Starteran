import React, { useState, useEffect } from 'react';
import { X, Briefcase, Bell } from 'lucide-react';
import { Job } from '../lib/jobsService';

interface JobNotificationProps {
  jobs: Job[];
  onClose: () => void;
}

export default function JobNotification({ jobs, onClose }: JobNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [newJobsCount, setNewJobsCount] = useState(0);

  useEffect(() => {
    // Check for new jobs (posted in the last 5 minutes)
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    
    const newJobs = jobs.filter(job => {
      const jobDate = job.createdAt?.toDate ? job.createdAt.toDate() : new Date(job.createdAt);
      return jobDate > fiveMinutesAgo;
    });

    if (newJobs.length > 0) {
      setNewJobsCount(newJobs.length);
      setShowNotification(true);
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [jobs]);

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                New Job{newJobsCount > 1 ? 's' : ''} Posted!
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {newJobsCount} new job{newJobsCount > 1 ? 's' : ''} available for you to explore.
              </p>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">
                  Check them out now
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setShowNotification(false);
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 