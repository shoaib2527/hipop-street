import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    listView:{
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 0,
        paddingTop: 30,
        paddingBottom: 10,
        // paddingHorizontal: 35,
    },
    caret:{
        backgroundColor: colors.silver,
        height: 1,
        paddingHorizontal: 20
    },
    headingText: {
        color: colors.lightMaroon,
        // fontFamily: "serif",
        // fontWeight: "bold",
    },
    valueText:{
        color: colors.charcoal,
        fontSize: 14,
        // fontFamily: "serif",
        marginTop: 2,
        // alignSelf: "flex-start",
        // marginLeft: 10,
        // textAlign: "center"
    }
})