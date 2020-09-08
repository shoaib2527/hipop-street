import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors"

export default StyleSheet.create({
    centerView: {
        alignSelf: "center", 
        padding: 30,
        // marginTop: 200,
      },
      appNameText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        marginTop: 20,
        // fontFamily: "serif",
        color: colors.maroon
      },
      guitarIcon: {
        fontSize: 60,
        textAlign: "center",
      },
      appSloganText: {
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
      },
      logoStyle:{
        width: 120,
        height: 120,
        alignSelf: "center"
      }
      
})