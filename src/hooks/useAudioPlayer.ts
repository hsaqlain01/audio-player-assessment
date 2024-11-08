import { useState, useEffect } from "react";
import Sound from "react-native-sound";
import { AllPhrases, TranscriptData } from "../types/audio.type";

export const useAudioPlayer = (transcriptData: TranscriptData) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const allPhrases: AllPhrases[] =
    transcriptData?.speakers.reduce((acc: AllPhrases[], speaker) => {
      return [
        ...acc,
        ...speaker.phrases.map((phrase) => ({
          ...phrase,
          speakerName: speaker.name,
        })),
      ];
    }, []) || [];

  useEffect(() => {
    const audio = new Sound("example_audio.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load sound", error);
        return;
      }
      setSound(audio);
      setDuration(audio.getDuration());
    });

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  // Track current position and phrase
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && sound) {
      interval = setInterval(() => {
        sound.getCurrentTime((seconds) => {
          const milliseconds = seconds * 1000;
          setCurrentPosition(milliseconds);
          setCurrentTime(seconds);

          let timeSum = 0;
          for (let i = 0; i < allPhrases.length; i++) {
            timeSum += allPhrases[i].time + transcriptData.pause;
            if (milliseconds < timeSum) {
              setCurrentPhraseIndex(i);
              break;
            }
          }
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  /**
   * Play audio from current position
   */
  const playSound = () => {
    if (sound) {
      sound.play((success) => {
        if (success) {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      });
      setIsPlaying(true);
    }
  };

  /**
   * Pause audio playback
   */
  const pauseSound = () => {
    sound?.pause();
    setIsPlaying(false);
  };

  /**
   * Calculate time for a specific phrase index
   */
  const getPhraseStartTime = (index: number): number => {
    let timeSum = 0;
    for (let i = 0; i < index; i++) {
      timeSum += allPhrases[i].time + transcriptData.pause;
    }
    return timeSum;
  };

  /**
   * Check if we're at the start of current phrase
   */
  const isAtPhraseStart = (phraseIndex: number): boolean => {
    const phraseStartTime = getPhraseStartTime(phraseIndex);
    const timeIntoPhrase = currentPosition - phraseStartTime;
    return timeIntoPhrase < 500; // Consider "start" if within first 500ms
  };

  /**
   * Rewind: go to start of current phrase or previous if at start
   */
  const handleRewind = () => {
    if (sound) {
      if (isAtPhraseStart(currentPhraseIndex) && currentPhraseIndex > 0) {
        // If at start of current phrase, go to previous phrase
        const newIndex = currentPhraseIndex - 1;
        const timeSum = getPhraseStartTime(newIndex);
        sound.setCurrentTime(timeSum / 1000);
        setCurrentPhraseIndex(newIndex);
        setCurrentTime(timeSum / 1000);
      } else {
        // Go to start of current phrase
        const timeSum = getPhraseStartTime(currentPhraseIndex);
        sound.setCurrentTime(timeSum / 1000);
        setCurrentTime(timeSum / 1000);
      }
    }
  };

  /**
   * Forward: skip to start of next phrase
   */
  const handleForward = () => {
    if (sound && currentPhraseIndex < allPhrases.length - 1) {
      const newIndex = currentPhraseIndex + 1;
      const timeSum = getPhraseStartTime(newIndex);
      sound.setCurrentTime(timeSum / 1000);
      setCurrentPhraseIndex(newIndex);
      setCurrentTime(timeSum / 1000);
    }
  };

  /**
   * Seek to specific position in audio
   */
  const seekTo = (position: number) => {
    if (sound) {
      sound.setCurrentTime(position);
      setCurrentTime(position);

      // Update current phrase index based on new position
      const milliseconds = position * 1000;
      let timeSum = 0;
      for (let i = 0; i < allPhrases.length; i++) {
        timeSum += allPhrases[i].time + transcriptData.pause;
        if (milliseconds < timeSum) {
          setCurrentPhraseIndex(i);
          break;
        }
      }
    }
  };

  return {
    isPlaying,
    currentPhraseIndex,
    currentTime,
    duration,
    playSound,
    pauseSound,
    handleRewind,
    handleForward,
    seekTo,
  };
};
