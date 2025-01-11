import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   noDataFoundContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   noDataFoundfontColor: {
      color: "#000",
      textAlign: "center",
      fontSize: hp(3.1),
      fontWeight: "400"
   },
   renderComponentContainer: {
      paddingHorizontal: wp(1),
      paddingBottom: hp(3),
   },
   renderComponentImage: {
      height: hp(25),
      width: "auto",
   },
   renderComponentImageBox: {
      borderColor: "red",
      borderWidth: hp(0.5),
      marginVertical: hp(1)
   },
   zoomImageContainer: {
      position: "absolute",
      top: hp(2.5),
      right: wp(5),
      zIndex: 1

   },
   zoomImage: {
      height: hp(4),
      width: wp(9)
   },
   separator: {
      height: hp(0.2),
      backgroundColor: "#000", // Light gray for the separator line
   },

   listContainer: { marginBottom: 20, padding: 10 },
   sectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
})