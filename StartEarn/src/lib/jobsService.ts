import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { createJobNotification } from './notificationService';

export interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Equity-based' | 'Short-term Task';
  salary: string;
  description: string;
  skills: string[];
  recruiterId: string;
  recruiterName: string;
  recruiterAvatar?: string;
  status: 'Active' | 'Paused' | 'Closed';
  applications: number;
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface JobApplication {
  id?: string;
  jobId: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Interviewed' | 'Rejected' | 'Accepted';
  appliedAt: Timestamp;
  experience: string;
  skills: string[];
  coverLetter?: string;
}

// Create a new job posting
export const createJob = async (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'applications' | 'views'>) => {
  try {
    const jobWithTimestamps = {
      ...jobData,
      applications: 0,
      views: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'jobs'), jobWithTimestamps);
    
    // Create notifications for all employees
    try {
      const employeesQuery = query(
        collection(db, 'users'),
        where('role', '==', 'employee')
      );
      const employeesSnapshot = await getDocs(employeesQuery);
      
      // Create notifications for each employee
      const notificationPromises = employeesSnapshot.docs.map(async (employeeDoc) => {
        const employeeData = employeeDoc.data();
        const employeeId = employeeData.id || employeeDoc.id;
        
        return createJobNotification(
          employeeId,
          jobData.title,
          jobData.company
        );
      });
      
      // Wait for all notifications to be created
      await Promise.all(notificationPromises);
      console.log(`Created notifications for ${employeesSnapshot.size} employees`);
    } catch (notificationError) {
      console.error('Error creating notifications:', notificationError);
      // Don't throw error for notification failure
    }
    
    return { id: docRef.id, ...jobWithTimestamps };
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Update a job posting
export const updateJob = async (jobId: string, updates: Partial<Job>) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

// Delete a job posting
export const deleteJob = async (jobId: string) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await deleteDoc(jobRef);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// Subscribe to all jobs (for employees)
export const subscribeToJobs = (callback: (jobs: Job[]) => void) => {
  const q = query(
    collection(db, 'jobs'),
    where('status', '==', 'Active')
  );
  
  return onSnapshot(q, (snapshot) => {
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      const jobData = { id: doc.id, ...doc.data() } as Job;
      jobs.push(jobData);
    });
    
    // Sort jobs by createdAt in descending order (newest first)
    const sortedJobs = jobs.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime();
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime();
      return bTime - aTime;
    });
    
    // For development/testing, add some sample jobs if no jobs exist
    if (sortedJobs.length === 0) {
      const sampleJobs: Job[] = [
        {
          id: 'sample-1',
          title: 'Senior React Developer',
          company: 'TechCorp India',
          location: 'Mumbai, Maharashtra',
          type: 'Full-time',
          salary: '₹8,00,000 - ₹12,00,000',
          description: 'We are looking for a Senior React Developer to join our dynamic team. You will be responsible for building scalable web applications and mentoring junior developers.',
          skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
          recruiterId: 'sample-recruiter-1',
          recruiterName: 'John Doe',
          recruiterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
          status: 'Active',
          applications: 23,
          views: 156,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)), // 2 hours ago
          updatedAt: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)),
        },
        {
          id: 'sample-2',
          title: 'Content Writer',
          company: 'Digital Marketing Pro',
          location: 'Remote',
          type: 'Part-time',
          salary: '₹500 - ₹800 per article',
          description: 'Create engaging content for our digital marketing campaigns. We need someone who can write compelling blog posts, social media content, and marketing copy.',
          skills: ['Content Writing', 'SEO', 'Social Media', 'Research', 'Copywriting'],
          recruiterId: 'sample-recruiter-2',
          recruiterName: 'Jane Smith',
          recruiterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
          status: 'Active',
          applications: 45,
          views: 289,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 60 * 1000)), // 5 hours ago
          updatedAt: Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 60 * 1000)),
        },
        {
          id: 'sample-3',
          title: 'UI/UX Designer',
          company: 'Creative Studios',
          location: 'Delhi, India',
          type: 'Full-time',
          salary: '₹6,00,000 - ₹9,00,000',
          description: 'Design beautiful and intuitive user interfaces for web and mobile applications. You will work closely with developers to create seamless user experiences.',
          skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
          recruiterId: 'sample-recruiter-3',
          recruiterName: 'Mike Johnson',
          recruiterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
          status: 'Active',
          applications: 12,
          views: 89,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // 1 day ago
          updatedAt: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
        },
      ];
      callback(sampleJobs);
    } else {
      callback(sortedJobs);
    }
  }, (error) => {
    console.error('Error in jobs listener:', error);
  });
};

// Subscribe to recruiter's jobs
export const subscribeToRecruiterJobs = (recruiterId: string, callback: (jobs: Job[]) => void) => {
  const q = query(
    collection(db, 'jobs'),
    where('recruiterId', '==', recruiterId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      const jobData = { id: doc.id, ...doc.data() } as Job;
      jobs.push(jobData);
    });
    
    // Sort jobs by createdAt in descending order (newest first)
    const sortedJobs = jobs.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime();
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime();
      return bTime - aTime;
    });
    
    // For development/testing, add some sample jobs for recruiters if no jobs exist
    if (sortedJobs.length === 0 && recruiterId.includes('sample')) {
      const sampleRecruiterJobs: Job[] = [
        {
          id: 'recruiter-sample-1',
          title: 'Senior React Developer',
          company: 'TechCorp India',
          location: 'Mumbai, Maharashtra',
          type: 'Full-time',
          salary: '₹8,00,000 - ₹12,00,000',
          description: 'We are looking for a Senior React Developer to join our dynamic team. You will be responsible for building scalable web applications and mentoring junior developers.',
          skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
          recruiterId: recruiterId,
          recruiterName: 'John Doe',
          recruiterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
          status: 'Active',
          applications: 23,
          views: 156,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)),
          updatedAt: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)),
        },
        {
          id: 'recruiter-sample-2',
          title: 'Content Writer',
          company: 'Digital Marketing Pro',
          location: 'Remote',
          type: 'Part-time',
          salary: '₹500 - ₹800 per article',
          description: 'Create engaging content for our digital marketing campaigns. We need someone who can write compelling blog posts, social media content, and marketing copy.',
          skills: ['Content Writing', 'SEO', 'Social Media', 'Research', 'Copywriting'],
          recruiterId: recruiterId,
          recruiterName: 'Jane Smith',
          recruiterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
          status: 'Active',
          applications: 45,
          views: 289,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 60 * 1000)),
          updatedAt: Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 60 * 1000)),
        },
      ];
      callback(sampleRecruiterJobs);
    } else {
      callback(sortedJobs);
    }
  }, (error) => {
    console.error('Error in recruiter jobs listener:', error);
  });
};

// Apply for a job
export const applyForJob = async (applicationData: Omit<JobApplication, 'id' | 'appliedAt'>) => {
  try {
    const applicationWithTimestamp = {
      ...applicationData,
      appliedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'applications'), applicationWithTimestamp);
    return { id: docRef.id, ...applicationWithTimestamp };
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

// Subscribe to job applications (for recruiters)
export const subscribeToJobApplications = (jobId: string, callback: (applications: JobApplication[]) => void) => {
  const q = query(
    collection(db, 'applications'),
    where('jobId', '==', jobId),
    orderBy('appliedAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const applications: JobApplication[] = [];
    snapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() } as JobApplication);
    });
    callback(applications);
  });
};

// Subscribe to employee's applications
export const subscribeToEmployeeApplications = (employeeId: string, callback: (applications: JobApplication[]) => void) => {
  const q = query(
    collection(db, 'applications'),
    where('employeeId', '==', employeeId),
    orderBy('appliedAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const applications: JobApplication[] = [];
    snapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() } as JobApplication);
    });
    callback(applications);
  });
};

// Update application status
export const updateApplicationStatus = async (applicationId: string, status: JobApplication['status']) => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, { status });
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}; 