import React from "react";
import { View, Text } from "react-native";
import { TranscriptPhraseProps } from "../../types/audio.type";
import styles from "./styles";

export const TranscriptPhrase = ({
  phrase,
  isActive,
}: TranscriptPhraseProps) => (
  <View
    style={[styles.phraseContainer, isActive && styles.activePhraseContainer]}
  >
    <Text style={styles.speakerName}>{phrase.speaker}:</Text>
    <Text style={[styles.phraseText, isActive && styles.activePhraseText]}>
      {phrase.words}
    </Text>
  </View>
);
