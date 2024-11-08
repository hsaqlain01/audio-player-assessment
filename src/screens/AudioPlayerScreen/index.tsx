import React from "react";
import { View, ScrollView } from "react-native";
import Sound from "react-native-sound";
import { TranscriptPhrase } from "../../components/TranscriptPhrase";
import { Controls } from "../../components/Control";
import { ProgressBar } from "../../components/ProgressBar";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import transcriptData from "../../assets/example_audio.json";
import { getMergedPhrases } from "../../utils/transcriptUtils";
import styles from "./styles";

Sound.setCategory("Playback");

const AudioPlayerScreen = () => {
  const {
    isPlaying,
    currentPhraseIndex,
    currentTime,
    duration,
    playSound,
    pauseSound,
    handleRewind,
    handleForward,
    seekTo,
  } = useAudioPlayer(transcriptData);

  const mergedPhrases = getMergedPhrases(transcriptData.speakers);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.transcriptContainer}
        showsVerticalScrollIndicator={false}
      >
        {mergedPhrases.map((phrase, index) => (
          <TranscriptPhrase
            key={index}
            phrase={phrase}
            isActive={currentPhraseIndex === index}
          />
        ))}
      </ScrollView>
      <View>
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={seekTo}
        />
        <Controls
          isPlaying={isPlaying}
          onRewind={handleRewind}
          onPlayPause={isPlaying ? pauseSound : playSound}
          onForward={handleForward}
        />
      </View>
    </View>
  );
};

export default AudioPlayerScreen;
