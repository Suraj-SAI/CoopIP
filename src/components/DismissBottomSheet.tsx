import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useMemo, useRef } from 'react';
import BottomSheetComponent from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { BOTTOMDISMISSSHEETCLOSED } from '../redux/types';
import { close, faultVideo, unClearVideo, videoFailed } from '../utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { incidenActivityAction } from '../redux/actions/incidentActivityAction';
import { useToast } from 'react-native-toast-notifications';

interface BottomSheetProps {
  isVisible: boolean;
}

const DismissBottomSheet = ({ isVisible }: BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheetComponent>(null);
  const dispatch = useDispatch<any>();
  const { userData } = useSelector((store: any) => store.loginReducer);
  const userId = userData?.data?.user_id;
  const { theftid } = useSelector((store: any) => store?.bottomeSheetReducer);
  const toast = useToast();

  const snapPoints = useMemo(() => ['70%'], []);

  if (isVisible) {
    bottomSheetRef.current?.expand();
  } else {
    bottomSheetRef.current?.close();
  }

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      dispatch({
        type: BOTTOMDISMISSSHEETCLOSED
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
              <Text style={styles.title}>Dismiss incident</Text>

              <TouchableOpacity onPress={() => {
                dispatch({
                  type: BOTTOMDISMISSSHEETCLOSED
                })
              }}>
                <Image source={close} style={styles.closeBottomImage} />
              </TouchableOpacity>

            </View>

            <View style={styles.potentailTheftView}>
              <Text style={styles.potentialTheftText}>If <Text style={{ fontWeight: "bold" }}>no action is needed</Text>, dismiss the incident. Select a reason for this. </Text>
            </View>

            <TouchableOpacity style={styles.attendBox} onPress={async () => {
              dispatch({
                type: BOTTOMDISMISSSHEETCLOSED
              })
              await dispatch(incidenActivityAction(userId, theftid, "Video fails to load", 1))
              toast.show('Incident dismissed : Video fails to load', {
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'slide-in',
              })
            }}>
              <Image source={videoFailed} style={styles.attendBoxImge} />
              <Text style={styles.attendBoxText}>
                {`Video fails to load`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attendBox} onPress={async () => {
              dispatch({
                type: BOTTOMDISMISSSHEETCLOSED
              })
              await dispatch(incidenActivityAction(userId, theftid, "Faulty video", 1))
              toast.show('Incident dismissed : Faulty video', {
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'slide-in',
              })
            }}>
              <Image source={faultVideo} style={styles.attendBoxImge} />
              <Text style={styles.attendBoxText}>
                Faulty video
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attendBox} onPress={async () => {
              dispatch({
                type: BOTTOMDISMISSSHEETCLOSED
              })
              await dispatch(incidenActivityAction(userId, theftid, "Unclear activity", 1))
              toast.show('Incident dismissed : Unclear activity', {
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'slide-in',
              })
            }}>
              <Image source={unClearVideo} style={styles.attendBoxImge} />
              <Text style={styles.attendBoxText}>
                Unclear activity
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attendBox} onPress={async () => {
              dispatch({
                type: BOTTOMDISMISSSHEETCLOSED
              })
              await dispatch(incidenActivityAction(userId, theftid, "Colleague activity picking order", 1))
              toast.show('Incident dismissed : Colleague activity / \n picking order', {
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'slide-in',
              })
            }}>
              <Image source={faultVideo} style={styles.attendBoxImge} />
              <Text style={styles.attendBoxText}>
                {`Colleague activity / \n picking order`}
              </Text>
            </TouchableOpacity>

            <View style={styles.potentailLastTheft}>
              <Text style={styles.potentialTheftText}>For anything else, close and select Attend </Text>
            </View>

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

  potentailLastTheft: {
    marginTop: hp(3.5)
  },

  potentialTheftText: {
    fontSize: hp(2),
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
    paddingHorizontal: wp(10)
  },

  attendBoxImge: {
    height: hp(4),
    width: hp(4),
    marginRight: wp(2.5)
  },

  attendBoxText: {
    fontSize: hp(2.1),
    color: "#000"
  }
});

export default DismissBottomSheet;
