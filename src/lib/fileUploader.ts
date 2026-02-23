import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadAttachment = async (
    file: File,
    chatId: string,
    userId: string,
    onProgress?: (progress: number, transferred: number, total: number) => void
): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Fail fast if Firebase Storage Rules deny access (don't hang infinitely)
        storage.maxUploadRetryTime = 5000;

        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const storageRef = ref(storage, `chat_attachments/${chatId}/${userId}_${timestamp}_${safeName}`);

        const metadata = { contentType: file.type };
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) onProgress(progress, snapshot.bytesTransferred, snapshot.totalBytes);
            },
            (error) => {
                console.error("🔥 Firebase Storage Upload Error:", error.code, error.message);
                if (error.code === 'storage/unauthorized') {
                    alert("Upload denied! You need to update your Firebase Storage Rules in the Firebase Console (allow read, write: if true;).");
                } else {
                    alert(`Upload failed: ${error.message}`);
                }
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                } catch (err) {
                    console.error("🔥 Error getting download URL:", err);
                    reject(err);
                }
            }
        );
    });
};
