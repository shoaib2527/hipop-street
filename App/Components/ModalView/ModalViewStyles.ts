import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  modalView:{
      width: "70%",
      height: "80%",
    //   height: 100,
      alignSelf: "center",
      backgroundColor: colors.snow,
      // flex: 0.7,
    //   position:"absolute",
    borderRadius: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.steel,
  } ,
  btnView:{
    position:"absolute",
    bottom: 0,
    width:" 100%",
    flexDirection: "row",
    borderRadius: 20
    
  },
  btns:{
    flex: 0.5,
    justifyContent: "center",
    backgroundColor: colors.steel,
    padding: 10,
  },
  modalTitle:{
      color: colors.lightMaroon,
      fontSize: 20,
      alignSelf: "center",
      textTransform: "capitalize",
      marginTop: 15,
      fontWeight: "bold"
  }
})