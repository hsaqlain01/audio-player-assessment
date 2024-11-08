import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sideButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  playButton: {
    width: 64,
    height: 64,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
