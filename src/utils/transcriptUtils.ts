import { Speaker, MergedPhrase } from "../types/audio.type";

/**
 * Merges phrases from multiple speakers into a single chronological array
 */
export const getMergedPhrases = (speakers: Speaker[]): MergedPhrase[] => {
  const mergedPhrases: MergedPhrase[] = [];
  const maxLength = Math.max(
    speakers[0].phrases.length,
    speakers[1].phrases.length
  );

  for (let i = 0; i < maxLength; i++) {
    if (speakers[0].phrases[i]) {
      mergedPhrases.push({
        speaker: speakers[0].name,
        words: speakers[0].phrases[i].words,
      });
    }
    if (speakers[1].phrases[i]) {
      mergedPhrases.push({
        speaker: speakers[1].name,
        words: speakers[1].phrases[i].words,
      });
    }
  }

  return mergedPhrases;
};
