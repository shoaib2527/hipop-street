import { StyleSheet } from "react-native";
import { ApplicationStyles, Metrics } from "../../Themes/index";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer:{
    flex: 1,
    backgroundColor: colors.coal,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain",
  },
  centered: {
    alignItems: "center",
  },
  accountText: {
    color: colors.snow,
    fontSize: 15,
    textAlign: "center",
    // fontFamily: "serif"
  }
});
