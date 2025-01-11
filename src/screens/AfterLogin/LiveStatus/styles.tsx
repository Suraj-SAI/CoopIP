import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#108483",
        paddingHorizontal: wp(10),
        paddingVertical: hp(1.5),
        width: wp(80),
        borderRadius: wp(2)
    },
    buttonText: {
        color: "#fff",
        fontSize: hp(2.2),
        fontWeight: "bold",
        textAlign: "center"
    },
    liveText: {
        fontSize: hp(2.2),
        fontWeight: "bold",
        marginBottom: hp(1.5),
        color: "#000"
    },
    loadingDataText: {
        fontSize: hp(2.2),
        marginBottom: hp(1.5),
        textAlign: "center"
    },
    warningImage: {
        height: hp(8),
        width: wp(18),
        marginBottom: hp(2)
    }
})