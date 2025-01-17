import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useMemo, useRef, useEffect } from 'react';
import BottomSheetComponent from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { BOTTOMATTENDEDSHEETCLOSE } from '../redux/types';
import { basket, close, siren } from '../utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { incidenActivityAction } from '../redux/actions/incidentActivityAction';
import { useToast } from 'react-native-toast-notifications';

const data = [
  {
    manual: `Let colleagues know you may need \n support.`
  },
  {
    manual: "Approach only if it's safe."
  },
  {
    manual: "Offer a basket if appropriate."
  }
]

interface BottomSheetProps {
  isVisible: boolean;
}

const AttendBottomSheet = ({ isVisible }: BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheetComponent>(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const dispatch = useDispatch<any>();
  const { userData } = useSelector((store: any) => store.loginReducer);
  const userId = userData?.data?.user_id;
  const { theftid } = useSelector((store: any) => store?.bottomeSheetReducer);
  const toast = useToast();

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      dispatch({
        type: BOTTOMATTENDEDSHEETCLOSE
      })
    }
  };

  return (
    <View style={[styles.overlay, { display: isVisible ? 'flex' : 'none' }]}>
      <BottomSheetComponent
        ref={bottomSheetRef}
        index={isVisible ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChange}
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          <View style={{ width: wp(85) }}>
            <View style={styles.closeBottomcontainer}>
              <Text style={styles.title}>Attend the incident</Text>

              <TouchableOpacity onPress={() => {
                dispatch({
                  type: BOTTOMATTENDEDSHEETCLOSE
                })
              }}>
                <Image source={close} style={styles.closeBottomImage} />
              </TouchableOpacity>

            </View>

            {
              data?.map((e, i) => (
                <View style={styles.manual} key={i}>
                  <Text style={styles.dotSign}>•</Text>
                  <Text style={styles.manualText}>{e?.manual}</Text>
                </View>
              ))
            }

            <View style={styles.potentailTheftView}>
              <Text style={styles.potentialTheftText}>Was a potential theft detected ?</Text>
            </View>

            <View style={styles.potentialTheftBelow}>
              <Text style={styles.potentialTheftBelowText}>A potential theft invovles delibrately concealing items inside a pram, a bag, a pocket or clothing.</Text>
            </View>

            <TouchableOpacity style={styles.attendBox} onPress={async () => {
              dispatch({
                type: BOTTOMATTENDEDSHEETCLOSE
              })
              await dispatch(incidenActivityAction(userId, theftid, "No, basket taken / payment made", 0))
              toast.show('Attended : Basket taken / payment made', {
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'slide-in',
              })
            }}>
              <Image source={basket} style={styles.attendBoxImge} />
              <Text style={styles.attendBoxText}>
                {`No, basket taken /\n payment made`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attendBox} onPress={async () => {
              dispatch({
                type: BOTTOMATTENDEDSHEETCLOSE
              })
              dispatch(incidenActivityAction(userId, theftid, "Yes , a potential theft was detected", 0))

              toast.show('Attended : Review outcome in the \n dashboard after 9 am tommorow.', {
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'slide-in',
              })
            }}>
              <Image source={siren} style={styles.attendBoxImge} />
              <Text style={styles.attendBoxText}>
                {`Yes , a potential theft \n was detected`}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </BottomSheetComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#f4f5ef',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    elevation: 1,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },

  title: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: "#000"
  },

  closeText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },

  closeBottomcontainer: {
    marginTop: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  closeBottomImage: {
    height: hp(2.2),
    width: hp(2.2)
  },

  manual: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: hp(1)
  },

  dotSign: {
    fontSize: hp(2.1),
    color: "#000"
  },

  manualText: {
    color: "#000",
    marginLeft: wp(2),
    fontSize: hp(2),
  },

  potentailTheftView: {
    marginTop: hp(2.5)
  },

  potentialTheftText: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: "#000"
  },

  potentialTheftBelow: {
    marginTop: hp(1)
  },

  potentialTheftBelowText: {
    fontSize: hp(2.3),
    color: "#000",
    letterSpacing: 0.5,
  },

  attendBox: {
    flexDirection: "row",
    marginTop: hp(2.5),
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
    paddingVertical: hp(1.5),
    borderRadius : wp(2)
  },

  attendBoxImge: {
    height: hp(4),
    width: hp(4),
    marginRight: wp(2.5),
    marginLeft : wp(5)
  },

  attendBoxText: {
    fontSize: hp(2.5),
    color: "#000",
    marginLeft : wp(3)
  }

});

export default AttendBottomSheet;
