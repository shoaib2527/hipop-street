import { StyleSheet, Platform } from "react-native";
import colors from "../../Themes/Colors";
import { Fonts } from "../../Themes";

export default StyleSheet.create({
    header: {
        backgroundColor: colors.transparent,
        flexDirection: "row",
        height: Platform.OS == 'android' ? 35 : 90,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        borderBottomWidth: 0,
        // marginTop: Platform.OS == "ios" ? -50 : 0
    },
    text: {
        // ...Fonts.style.h3,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "capitalize",
        color: colors.lightMaroon,
        // fontFamily: "serif",
        // alignSelf: "center",
        marginLeft: 10,
        marginTop: Platform.OS == "android" ? 5 : 10
    },
    leftStyle: {
        marginLeft: 2,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightStyle: {
        marginRight: 20,
        marginTop: 5
    }
})