import { Image, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { checkedImage, dustbinImage } from "../utils/images";

export const RenderAttendedItem = ({ item, index, attendedListData }: any) => {
    return (
        <View style={styles.renderComponentContainer}>
            {
                index === 0 && (
                    <Text style={styles.incidentText}>{attendedListData?.length} {attendedListData?.length === 1 ? "Attended Incident" : "Attended Incidents"}</Text>
                )
            }
            <Text style={styles.color}>{item?.section}</Text>
            <Text style={styles.dateText}>Today at {item?.date?.split(" ")[1]?.split(".")[0]}</Text>
            <View style={styles.renderComponentImageBox}>
                <Image source={{ uri: item?.image }} style={styles.renderComponentImage} />
            </View>
            <View style={styles.dustbinView}>
                <Image source={item?.dismiss_status === 1 ? dustbinImage : checkedImage} style={styles.dustbinImage} />
                <Text style={styles.dismisstimeComment}>{item?.dismiss_status === 1 ? "Dismissed" : "Attended"} today at {item?.refill_datetime?.split(" ")[1]?.split(".")[0]}</Text>
            </View>
            <Text style={styles.commentText}>{item?.comment}</Text>
            <View style={styles.separator} />
        </View>
    );
};

export const styles = StyleSheet.create({
    separator: {
        height: hp(0.2),
        backgroundColor: "#000",
        marginHorizontal: wp(2)
    },
    renderComponentImageBox: {
        marginVertical: hp(1),
        marginHorizontal: wp(2)
    },
    renderComponentContainer: {
        paddingHorizontal: wp(1),
        paddingBottom: hp(3),
    },
    renderComponentImage: {
        height: hp(25),
        width: "auto",
    },
    color: {
        color: 'black',
        marginHorizontal: wp(2),
        fontSize: hp(2.5),
    },
    incidentText: {
        color: "#000",
        marginBottom: hp(1),
        marginHorizontal: wp(2),
        fontSize: hp(2.5),
        fontWeight: "bold",
        marginTop: hp(2)
    },
    dateText: {
        marginHorizontal: wp(2),
        textAlign: "right",
        color: "#000",
        fontSize: hp(1.8)
    },
    commentText: {
        marginHorizontal: wp(2),
        color: "#000",
        fontSize: hp(1.8),
        marginBottom: hp(2)
    },
    dismisstimeComment: {
        marginHorizontal: wp(1),
        color: "#000",
        fontSize: hp(1.8),
    },
    dustbinView: {
        flexDirection: "row",
        marginHorizontal: wp(2),
        alignItems: "center"
    },
    dustbinImage: {
        height: hp(2),
        width: hp(2)
    }
})