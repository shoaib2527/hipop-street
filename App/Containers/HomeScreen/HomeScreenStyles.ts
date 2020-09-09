import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    retryIcon:{
        fontSize: 12,
        color: colors.lightMaroon,
        alignSelf: "center",
        marginBottom: 5,
    },
    cardOverlayView:{
        position: "absolute",
        bottom: 0,
        backgroundColor: colors.lightPink,
        width: "100%",
        height: 60,
        justifyContent: "center",
        // borderRadius: 8,
    },
    searchIcon:{
        fontSize: 18,
        color: colors.lightMaroon,
    },
    songName:{
        color: colors.charcoal,
        // fontFamily: "serif",
        alignSelf: "center",
        fontSize: 18,


    },
    songsCard:{
        width: 180,
        height: 210,
        // borderRadius: 10,
        marginRight: 10,
        shadowColor: colors.steel,
        shadowRadius: 12,
        shadowOffset:{width: 5, height: 5},
        // borderBottomWidth: 5,
        // borderBottomColor: colors.steel
        // marginHorizontal: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.maroon,
        alignSelf: "flex-start",
        // paddingTop: 10,
        // paddingLeft: 10,
    },
    header:{
        flex: 1,
        justifyContent: "space-between",
        alignContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 30,
        backgroundColor: colors.maroon,
        height: 80,
        borderRadius: 0,
        opacity: 0.4,
    },
    headerContainer:{
        width:'92%',
        height:40,
        borderRadius:8,
        backgroundColor:colors.silver,
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        justifyContent:'space-between'
    
    },
    subHeading: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.charcoal,
        marginTop: 10,
        marginBottom: 10,
        // marginTop: 40,
        // fontFamily: "serif"
    },
    icon: {
        color: colors.snow, alignSelf: "flex-end"
    },
    headerView: {
        padding: 10, flex: 1, flexDirection: "row", alignContent: "space-between", justifyContent: "space-between"
    },
    btnList: {
        marginTop: 30, paddingHorizontal: 20,
    },
    btnTop: {
        borderWidth: 0, borderColor: colors.maroon, backgroundColor: colors.maroon, borderRadius: 3, marginHorizontal: 2, width: 100, justifyContent: "center", height: 40,
    },
    btnText: {
        color: colors.snow, fontSize: 15, fontWeight: "normal", textAlign: "center",
    },
    cardItemStyle: {
        height: 60,
        width: 130,    
    },
    cardImage: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 10
    },
    musicPlayer:{
        marginBottom: 10,
        position: "absolute",
        bottom: 60,
        width: "100%",
    },
    listStyle:{
        // marginTop: 10,
        // marginBottom: 20,
        // paddingLeft: 2,
        paddingRight: 20,
        marginBottom: 10
    },
    noDataText:{
        alignSelf: "flex-start",
        // paddingTop: 40,
        fontSize: 13,
        paddingHorizontal: 10,
        marginBottom: 5,
    }
});