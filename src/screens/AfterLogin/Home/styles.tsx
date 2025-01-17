import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : "#fff"
    },
    container1: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal : wp(2)
    },
    cctvFont: {
        fontSize: hp(3),
        fontWeight : "bold",
        color : "#000"
    },
    userImage : {
       height : hp(6),
       width : hp(6)
    },
    container2: {
        flex: 0.9
    },
    popup: {
        position: "absolute",
        top: hp(8.5), // Position it just below the image
        right: wp(4),
        backgroundColor: "white",
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        paddingVertical : hp(1),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Shadow for Android
        zIndex: 1000,
    },
    popupText: {
        fontSize: hp(2),
        marginBottom: 5,
        color: "red",
    },
})