import React from "react";
import { Text, View } from "react-native";
import { formatTime } from "../../utils/dateUtils";
import { ProgressBarProps } from "../../types/audio.type";
import styles from "./styles";

export const ProgressBar = ({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
      </View>
      <View style={styles.timeWrapper}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};
