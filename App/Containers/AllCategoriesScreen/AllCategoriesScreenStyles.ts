import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    musicPlayer:{
        // marginBottom: 10,
        position: "absolute",
        bottom: 20,
        width: "100%",
    },
    cardItemStyle: {
        height: 210,
        // width: 80,
        flex: 0.5,
        marginTop: 20,
        marginHorizontal: 2
        
    },
    cardImage: {
        flex: 1, justifyContent: "center", borderRadius: 0, zIndex: 2,
    },
    subHeading: {
        fontSize: 15,
        // fontWeight: "bold",
        color: colors.coal,
        // fontFamily: "serif"
    },
    headerTitle:{
        fontSize: 25,
        fontWeight: "bold",
    }
})