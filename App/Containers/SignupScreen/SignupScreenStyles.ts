import { StyleSheet } from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    viewText:{
        color: colors.charcoal,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.snow,
        padding: 20,
    },
    forgotPwdText: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    accountText: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        marginTop: 20,
        // fontFamily: "serif"
    },
    greyBox: {
        backgroundColor: colors.silver,
        height: 50,
        paddingHorizontal: 20,
        marginTop: 20,
        justifyContent: "center"
    }
});