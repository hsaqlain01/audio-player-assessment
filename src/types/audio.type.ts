export interface Phrase {
  words: string;
  time: number;
  speakerName?: string;
}

export interface Speaker {
  name: string;
  phrases: Phrase[];
}

export interface TranscriptData {
  pause: number;
  speakers: Speaker[];
}

export interface AllPhrases extends Phrase {
  speakerName: string;
}

export interface MergedPhrase {
  speaker: string;
  words: string;
}

export interface TranscriptPhraseProps {
  phrase: MergedPhrase;
  isActive: boolean;
}

export interface ControlsProps {
  isPlaying: boolean;
  onRewind: () => void;
  onPlayPause: () => void;
  onForward: () => void;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (position: number) => void;
}
