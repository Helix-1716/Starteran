// Sound utility for StartEarn application
// Provides consistent sound effects for button interactions

import tweetSound from '../assets/sounds/tweet-81775.mp3';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;
  private tweetAudio: HTMLAudioElement | null = null;

  constructor() {
    // Initialize audio context on first user interaction
    if (typeof window !== 'undefined') {
      this.initAudioContext();
      this.initTweetSound();
    }
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  private initTweetSound() {
    try {
      this.tweetAudio = new Audio(tweetSound);
      this.tweetAudio.preload = 'auto';
      this.tweetAudio.volume = 0.3; // Set volume to 30% for pleasant experience
    } catch (error) {
      console.warn('Failed to load tweet sound:', error);
    }
  }

  // Play the tweet sound
  private playTweetSound(): void {
    if (!this.tweetAudio || !this.isEnabled) return;

    try {
      // Reset the audio to start
      this.tweetAudio.currentTime = 0;
      this.tweetAudio.play().catch(error => {
        console.warn('Failed to play tweet sound:', error);
      });
    } catch (error) {
      console.warn('Failed to play tweet sound:', error);
    }
  }

  // Generate a success sound (fallback to programmatic sound)
  private generateSuccessSound(): void {
    if (!this.audioContext || !this.isEnabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Create a pleasant success sound
      oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Failed to play success sound:', error);
    }
  }

  // Generate a notification sound (fallback to programmatic sound)
  private generateNotificationSound(): void {
    if (!this.audioContext || !this.isEnabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Create a gentle notification sound
      oscillator.frequency.setValueAtTime(660, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn('Failed to play notification sound:', error);
    }
  }

  // Public methods
  public playClick(): void {
    this.playTweetSound();
  }

  public playSuccess(): void {
    this.generateSuccessSound();
  }

  public playNotification(): void {
    this.generateNotificationSound();
  }

  public toggleSound(): void {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('startearn_sound_enabled', this.isEnabled.toString());
  }

  public setSoundEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    localStorage.setItem('startearn_sound_enabled', enabled.toString());
  }

  public isSoundEnabled(): boolean {
    return this.isEnabled;
  }

  // Initialize sound settings from localStorage
  public init(): void {
    const savedSetting = localStorage.getItem('startearn_sound_enabled');
    if (savedSetting !== null) {
      this.isEnabled = savedSetting === 'true';
    }
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();

// Initialize on module load
if (typeof window !== 'undefined') {
  soundManager.init();
}

// React hook for easy sound integration
export const useSound = () => {
  return {
    playClick: () => soundManager.playClick(),
    playSuccess: () => soundManager.playSuccess(),
    playNotification: () => soundManager.playNotification(),
    toggleSound: () => soundManager.toggleSound(),
    isEnabled: soundManager.isSoundEnabled(),
  };
};
