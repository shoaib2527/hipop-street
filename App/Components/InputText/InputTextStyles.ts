import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    textField: {
        backgroundColor: colors.silver,
        paddingHorizontal: 20,color:'black'
    },
    errorText: {
        color: colors.lightMaroon,
        fontSize: 10,
    },
    eye: {
        fontSize: 12,
        color: colors.maroon,
        // alignSelf: "center",
    },
    eyeView:{
        // backgroundColor: colors.black, 
        position: "absolute",
        right: 10,
        height: 90,
        justifyContent: "center",
        padding: 5,
    }
});