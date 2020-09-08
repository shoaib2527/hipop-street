import {StyleSheet} from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    retryIcon:{
        fontSize: 12,
        color: colors.lightMaroon,
        alignSelf: "center",
        marginBottom: 5,
    },
    shareView:{
        marginLeft: 20
    },
    likeTxt:{
        fontSize: 12,
        color: colors.steel
    },
    iconView:{
        marginLeft: 10,
        marginTop: 2,

    },
    imagePlaceholder: {
        color: colors.snow,
        alignSelf: "center",
        fontSize: 10,
        textAlign: "center",
    },
    playlistName:{
        color: colors.snow,
        textAlign: "center",
        fontSize: 18,
        padding: 2,
    },
    cardItemStyle:{
        borderRadius: 60,
        height: 100, 
        width: 100, 
        marginLeft: 10, 
        marginTop:10,
        backgroundColor: colors.lightMaroon, 
        justifyContent: "center",
        opacity: 0.8,
    },
    songsView:{
        flexDirection: "row",
    },
    heading: {
        color: colors.charcoal,
        fontSize: 18,
        alignSelf: "center",
        // textAlign: "left",
    },
    subHeading: {
        color:colors.charcoal,
        fontSize:15,
        textAlign: "left",
        marginTop: 5,
    },
    caretView: {
        height: 0.5,
        backgroundColor: colors.steel,
        flex: 1,
        marginTop:2,
    },
    textIconView: {
        flexDirection: "row",
    },
    playlistStyle: {
        marginBottom: 10,
        position: "absolute",
        bottom: 80,
        width: "100%",
    },
    singleCatStyle: {
        marginBottom: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    pauseIcon:{
        color: colors.lightMaroon, marginLeft: 100
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left",
        // fontFamily: "serif",
        // flex: 0.5,
        // paddingLeft: 10,
    },
    imageStyle:{
        width: 150,
        height: 150,
        // flex: 1,
        alignSelf: "flex-start",
        borderRadius: 5,
    },
    textImageStyle:{
        flexDirection: "row",
        paddingLeft: 20
    },
    headerView:{ 
        paddingLeft: 20,
        marginTop: 20,
    },
    listenBtn:{
        backgroundColor: colors.lightMaroon,
        paddingRight: 20,
        height: 30,
        marginTop: 5,
        justifyContent: "center",
        borderRadius: 5,
        width: "50%"
        // flex: 0.5
    },
    listenTxt: {
        color: colors.snow,
        textAlign: "center",
        fontSize: 15,
    },
    songImg:{
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    heartIcon:{
        fontSize: 19,
        color: colors.lightMaroon,
        // marginTop: 5,
        // marginLeft: 10,
    },
    addSong:{
        width: 40,
        height: 40,
        backgroundColor: colors.lightMaroon,
        borderRadius: 40,
        justifyContent: "center",
        // marginBottom: 10,
        position: "absolute",
        // bottom: 170,
        right: 20,
        zIndex: 4
    },
    addIcon: {
        color: colors.snow,
        alignSelf: "center",
    },
    addBtn:{
        flexDirection: "row",
        backgroundColor: colors.maroon,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        margin: 0,
        justifyContent: "center",
    },
    modalContent: {
        paddingHorizontal: 20,
        // alignSelf: "center",
        maxHeight: "75%"
    },
    songImageView:{
        width: 80,
        height: 80,
        // backgroundColor: colors.silver,
        borderRadius: 200,
        marginTop: 30,
        justifyContent: "center",
    },
    cameraView: {
        width: 25, height: 25,
        borderRadius: 30, backgroundColor: colors.snow,
        justifyContent: "center",
    },
    camIcon: {
        color: colors.lightMaroon,
        position: "absolute",
        fontSize: 15,
        alignSelf: "center",
    },
    emptyImageIcon:{
        color: colors.snow,
        alignSelf: "center",
        paddingHorizontal: 20,
        fontSize: 20,
        paddingTop: 30,
    },
    textFieldStyle:{
        // paddingHorizontal: 0,
        color:'black'
    }
})