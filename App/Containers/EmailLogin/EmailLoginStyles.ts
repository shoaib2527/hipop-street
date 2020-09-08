import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.snow,
        padding: 20,
    },
    forgotPwdText: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        // fontFamily: "serif"
    },
    accountText: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        marginTop: 20,
        // fontFamily: "serif"
      }
});