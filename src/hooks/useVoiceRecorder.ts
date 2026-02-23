import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export function useVoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStreamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Microphone access denied or error:", err);
            alert("Microphone access is required to send voice messages.");
        }
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (timerRef.current) clearInterval(timerRef.current);

        setIsRecording(false);
        setRecordingTime(0);
        audioChunksRef.current = [];
    };

    const stopAndUploadRecording = async (chatId: string): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
                resolve(null);
                return;
            }

            mediaRecorderRef.current.onstop = async () => {
                if (timerRef.current) clearInterval(timerRef.current);
                setIsRecording(false);

                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

                if (audioStreamRef.current) {
                    audioStreamRef.current.getTracks().forEach(track => track.stop());
                }

                // Upload to firebase storage
                if (audioChunksRef.current.length === 0) {
                    resolve(null);
                    return;
                }

                try {
                    setIsUploading(true);
                    const fileName = `${Date.now()}.webm`;
                    const fileRef = ref(storage, `voiceMessages/${chatId}/${fileName}`);
                    await uploadBytes(fileRef, audioBlob);
                    const downloadUrl = await getDownloadURL(fileRef);
                    setIsUploading(false);
                    resolve(downloadUrl);
                } catch (error) {
                    console.error("Failed to upload voice message:", error);
                    setIsUploading(false);
                    resolve(null);
                }
            };

            mediaRecorderRef.current.stop();
        });
    };

    return {
        isRecording,
        recordingTime,
        isUploading,
        startRecording,
        cancelRecording,
        stopAndUploadRecording
    };
}
