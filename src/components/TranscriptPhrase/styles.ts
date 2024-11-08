import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export default StyleSheet.create({
  phraseContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: colors.greyLight,
  },
  activePhraseContainer: {
    backgroundColor: colors.primaryLight,
  },
  speakerName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
    color: colors.black100,
  },
  phraseText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: colors.black,
  },
  activePhraseText: {
    color: colors.secondary,
  },
});
