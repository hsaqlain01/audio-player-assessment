import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  timeText: {
    fontSize: 13,
    color: colors.grey100,
    fontFamily: "Poppins-Medium",
  },

  progressBarContainer: {
    width: "100%",
    height: 18,
    justifyContent: "center",
  },
  progressBar: {
    width: "100%",
    height: 7,
    borderRadius: 2,
    backgroundColor: colors.primaryLight,
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: colors.secondary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  timeWrapper: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
