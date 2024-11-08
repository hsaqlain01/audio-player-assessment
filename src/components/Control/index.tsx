// Controls.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../constants/colors";
import { ControlsProps } from "../../types/audio.type";
import styles from "./styles";

export const Controls = ({
  isPlaying,
  onPlayPause,
  onForward,
  onRewind,
}: ControlsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onRewind} style={styles.sideButton}>
        <FontAwesome5 name="backward" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
        <FontAwesome5
          name={isPlaying ? "pause" : "play"}
          size={30}
          color={colors.secondary}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onForward} style={styles.sideButton}>
        <FontAwesome5 name="forward" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};
