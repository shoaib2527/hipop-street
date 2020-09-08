import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    cardItemStyle: {
        height: 80,
        flex: 0.5,
        
    },
    cardImage: {
        flex: 1, justifyContent: "flex-end", borderRadius: 0, zIndex: 2,
    },
    subHeading: {
        fontWeight: "bold",
        marginTop: 40,
        color: colors.snow, alignSelf: "center", marginBottom: 10, fontSize: 17
    },
})