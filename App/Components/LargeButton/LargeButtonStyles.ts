import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    btnView: {
        flexDirection: "row",
        height: 40,
        // marginHorizontal: 20,
        justifyContent: "center",
    },
    btnText: {
        color: colors.snow,
        padding: 0,
        fontWeight: "bold",
    }
})