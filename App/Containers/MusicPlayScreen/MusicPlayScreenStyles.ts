import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    video:{
        width: 300,
        height: 300,
        alignSelf: "center",
        // backgroundColor: colors.black,
        paddingHorizontal: 50,
        borderRadius: 10,
        zIndex: -1
    },
    timeText:{
        fontSize: 12,
        color: colors.steel
    },
    
    icon:{
        color: colors.charcoal,
        fontSize: 30,
        marginTop: 4,
    },
    container:{
        flex: 1,
        backgroundColor: colors.lightPink,
    },
    image:{
        height: 250,
        width: 250,
        borderRadius: 250,
        alignSelf: "center",
    },
    holderView:{
        // marginTop: 18,
        paddingHorizontal: 30,
    },
    heartIcon:{
        fontSize: 18,
        color: colors.black,
        marginLeft: 50,
        paddingTop: 8,
    },
    songNameText:{
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: colors.charcoal,
        // fontFamily: "serif",
        alignSelf: "center",
    }
})