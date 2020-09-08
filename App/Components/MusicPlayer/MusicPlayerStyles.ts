import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    mainView:{
        // opacity: 0.6,
        backgroundColor: colors.lightPink,
        // height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 20,
        flex: 1,
        opacity: 1,
    },
    imageView: {
        borderRadius: 200,
        width: 50,
        height: 50,
        alignSelf: "center",
        // backgroundColor: colors.charcoal,
        marginHorizontal: 10,
    },
    textView: {
        flexDirection: "column",
        alignSelf: "center",
        // justifyContent: "flex-start",
        paddingLeft: 0,
        flex: 0.5,
        // marginRight: 30,
    },
    heading: {
        color: colors.charcoal,
        fontSize: 18,
        textAlign: "left",
        // fontFamily: "serif",
       
    },
    subHeading: {
        color: colors.charcoal,
        fontSize: 12,
    },
    icon:{
        color: colors.charcoal,
        flex: 0.3,
        fontSize: 20
        // marginLeft: 5,
    }
})