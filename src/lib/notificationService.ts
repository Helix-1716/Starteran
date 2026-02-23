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
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: 'job' | 'application' | 'message' | 'system';
  isRead: boolean;
  createdAt: Timestamp;
  data?: any; // Additional data like jobId, applicationId, etc.
}

// Create a new notification
export const createNotification = async (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
  try {
    console.log('Creating notification with data:', notificationData);
    
    const notificationWithTimestamp = {
      ...notificationData,
      createdAt: serverTimestamp(),
    };
    
    console.log('Saving notification to Firestore...');
    const docRef = await addDoc(collection(db, 'notifications'), notificationWithTimestamp);
    console.log('Notification saved with ID:', docRef.id);
    
    return { id: docRef.id, ...notificationWithTimestamp };
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { isRead: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    // This would require a batch update in a real implementation
    // For now, we'll handle this in the frontend
    console.log('Marking all notifications as read for user:', userId);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await deleteDoc(notificationRef);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// Subscribe to user's notifications
export const subscribeToNotifications = (userId: string, callback: (notifications: Notification[]) => void) => {
  // Use a simpler query that doesn't require composite index
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    console.log(`Received ${snapshot.size} notifications for user ${userId}`);
    
    const notifications: Notification[] = [];
    snapshot.forEach((doc) => {
      const notificationData = { id: doc.id, ...doc.data() } as Notification;
      console.log('Notification data:', notificationData);
      notifications.push(notificationData);
    });
    
    // Sort notifications by createdAt in descending order (newest first)
    const sortedNotifications = notifications.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime();
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime();
      return bTime - aTime;
    });
    
    console.log(`Sorted ${sortedNotifications.length} notifications for user ${userId}`);
    
    // For development/testing, add some sample notifications if no notifications exist
    if (sortedNotifications.length === 0 && userId.includes('sample')) {
      const sampleNotifications: Notification[] = [
        {
          id: 'sample-1',
          userId: userId,
          title: 'New Job Posted',
          message: 'A new job "Senior React Developer" has been posted by TechCorp India',
          type: 'job',
          isRead: false,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 30 * 60 * 1000)), // 30 minutes ago
          data: { jobTitle: 'Senior React Developer', companyName: 'TechCorp India' }
        },
        {
          id: 'sample-2',
          userId: userId,
          title: 'New Application',
          message: 'John Doe has applied for "Content Writer"',
          type: 'application',
          isRead: false,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)), // 2 hours ago
          data: { applicantName: 'John Doe', jobTitle: 'Content Writer' }
        },
        {
          id: 'sample-3',
          userId: userId,
          title: 'New Message',
          message: 'Jane Smith: Hi! I saw your profile and would like to discuss a project...',
          type: 'message',
          isRead: true,
          createdAt: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // 1 day ago
          data: { senderName: 'Jane Smith', messagePreview: 'Hi! I saw your profile and would like to discuss a project...' }
        },
      ];
      callback(sampleNotifications);
    } else {
      callback(sortedNotifications);
    }
  }, (error) => {
    console.error('Error in notifications listener:', error);
  });
};

// Create a job notification (when a new job is posted)
export const createJobNotification = async (userId: string, jobTitle: string, companyName: string) => {
  console.log(`Creating job notification for user ${userId}: ${jobTitle} at ${companyName}`);
  
  try {
    const notification = await createNotification({
      userId,
      title: 'New Job Posted',
      message: `A new job "${jobTitle}" has been posted by ${companyName}`,
      type: 'job',
      isRead: false,
      data: { jobTitle, companyName }
    });
    
    console.log(`Successfully created notification: ${notification.id}`);
    return notification;
  } catch (error) {
    console.error(`Failed to create notification for user ${userId}:`, error);
    throw error;
  }
};

// Create an application notification (when someone applies)
export const createApplicationNotification = async (recruiterId: string, applicantName: string, jobTitle: string) => {
  return createNotification({
    userId: recruiterId,
    title: 'New Application',
    message: `${applicantName} has applied for "${jobTitle}"`,
    type: 'application',
    isRead: false,
    data: { applicantName, jobTitle }
  });
};

// Create a message notification
export const createMessageNotification = async (userId: string, senderName: string, messagePreview: string) => {
  return createNotification({
    userId,
    title: 'New Message',
    message: `${senderName}: ${messagePreview}`,
    type: 'message',
    isRead: false,
    data: { senderName, messagePreview }
  });
};

// Test function to create a notification manually
export const createTestNotification = async (userId: string) => {
  console.log('Creating test notification for user:', userId);
  return createNotification({
    userId,
    title: 'Test Notification',
    message: 'This is a test notification to verify the system is working',
    type: 'system',
    isRead: false,
    data: { test: true }
  });
}; 