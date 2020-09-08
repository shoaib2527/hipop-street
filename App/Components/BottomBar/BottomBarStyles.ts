import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    mainView:{
        flexDirection: "row",
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0,
        backgroundColor: colors.maroon,
        flex: 1,
    },
    iconStyle:{
        alignSelf: "center",
        color: colors.snow,
        fontSize: 20,
        marginTop: 5,
    },
    textStyle:{
        color: colors.snow,
        fontSize: 13,
        // fontFamily: "serif"
    },
    iconHolder: {
        // backgroundColor: colors.snow,
        // marginHorizontal: 2,
        // paddingHorizontal: 16,
        borderRadius: 15,
        flexDirection: "column",
        height: 60,
        flex: 0.4,
    }
});