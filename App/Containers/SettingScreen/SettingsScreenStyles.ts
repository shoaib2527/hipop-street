import { StyleSheet } from "react-native";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
    roundView: {
        backgroundColor: colors.steel,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 40,
    },
    initials: {
        fontSize: 35,
        fontWeight: "bold",
        color: colors.snow,
        alignSelf: "center",
    },
    listItem: {
        marginTop: 20,
    },
    listView: {
        // flexDirection: "row",
        // marginTop: 30,
        // padding: 20,
    },
    text: {
        // alignSelf: "flex-start",
        // paddingLeft: 20,
        color: colors.black,
        fontSize: 15,
        // fontWeight: "bold"
    },
    caretLine: {
        backgroundColor: colors.steel,
        height: 1,
        marginTop: 20,
        marginRight: 10,
        width: 250,
    },
    userNameHeading: {
        alignSelf: "flex-start",
        fontWeight: "bold",
        fontSize: 18,
        padding: 0,
        marginTop: 10,
        color: colors.charcoal,
        textAlign: "left"
    },
    editIcon: {
        fontSize: 15,
        color: colors.lightMaroon,
        paddingTop: 5,
        paddingLeft: 5,
        // width: 15,
    },
    plusIcon: {
        fontSize: 18,
        color: colors.steel
    },
    infoText: {
        alignSelf: "center",
        paddingTop: 5,
    },
    profileView: {
        alignSelf: "flex-start",
        marginHorizontal: 15,
        flexDirection: "row",
    },
    profileInfo: {
        flexDirection: "column",
        padding: 15,
        marginTop: 20,
    },
    bioHeading: {
        color: colors.charcoal,
        marginTop: 5,
        paddingRight: 100
    },
    editBtn: {
        borderRadius: 5,
        marginTop: 10,
        alignSelf: "flex-start",
        padding: 50,
        // marginLeft: 50,
    },
    editBtnText: {
        color: colors.maroon
    },
    itemRow: {
        flexDirection: "row",
        paddingHorizontal: 40,
        marginTop: 20,
    },
    settingsItemView: {
        marginLeft: 20,

    },
    descriptionText: {
        color: colors.coal,
        paddingTop: 5,
    },
    modalContent: {
        paddingHorizontal: 20,
        alignSelf: "center",
        maxHeight: "70%"
    },
    camIcon: {
        color: colors.snow,
        position: "absolute",
        fontSize: 20,
        alignSelf: "center",
    },
    cameraView: {
        width: 40, height: 40,
        borderRadius: 40, backgroundColor: colors.lightMaroon,
        justifyContent: "center",
    }
})