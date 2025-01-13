import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { profile } from '../../../utils/images'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../../redux/actions/loginAction';
import Incidents from '../Incidents'
import LiveStatus from '../LiveStatus';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import AttendBottomSheet from '../../../components/AttendBottomSheet'
import DismissBottomSheet from '../../../components/DismissBottomSheet'

const initialLayout = { width: Dimensions.get('window').width };

const HomePage = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch<any>()
  const { userData } = useSelector((store: any) => store.loginReducer);
  const [index, setIndex] = useState(0);
  const [deviceVersion, setDeviceVersion] = useState("");
  let userId = userData?.data?.user_id;
  const { incidentsData } = useSelector((store: any) => store.incidentReducer);
  let incidentsCounts = incidentsData?.length;
  const { attendedOpen, unAttendedOpen } = useSelector((store: any) => store?.bottomeSheetReducer);

  const getAppVersion = async () => {
    const version = await DeviceInfo.getVersion();
    setDeviceVersion(version)
  };

  getAppVersion();
  const [routes] = useState([
    { key: "Incidents", title: 'Incidents' },
    { key: 'Live', title: 'Live Status' },
  ]);

  const renderScene = SceneMap({
    Incidents: Incidents,
    Live: LiveStatus,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View>
          <Text>{`v${deviceVersion}`}</Text>
          <Text style={styles.cctvFont}>CCTV Alerts</Text>
        </View>
        <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
          <Image source={profile} style={styles.userImage} />
        </TouchableOpacity>

        {showPopup && (
          <View style={styles.popup}>
            <TouchableOpacity onPress={() => dispatch(logoutAction(userId))}>
              <Text style={styles.popupText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <View style={{ flexDirection: 'row', height: hp(5.5) }}>
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                key={i}
                style={{ flex: 1, padding: 10, alignItems: 'center', backgroundColor: i === props.navigationState.index ? '#f3f3f3' : '#fff', borderTopLeftRadius: wp(3), borderTopRightRadius: wp(3) }}
                onPress={() => props.jumpTo(route.key)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: '#000', fontSize: hp(2.3) }}>
                    {route.title}
                  </Text >

                  {route?.title === "Incidents" && incidentsCounts > 0 && (
                    <View
                      style={{
                        backgroundColor: "red",
                        marginLeft: wp(2),
                        width: wp(6),
                        height: wp(6),
                        borderRadius: wp(3),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: hp(1.5), fontWeight: "bold" }}>
                        {incidentsCounts}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: `${(props.navigationState.index / props.navigationState.routes.length) * 100}%`,
                width: `${100 / props.navigationState.routes.length}%`,
                height: 2,
                backgroundColor: 'blue',
              }}
            />
          </View>
        )}
      />
      <AttendBottomSheet isVisible={attendedOpen} />
      <DismissBottomSheet isVisible={unAttendedOpen} />
    </SafeAreaView>
  )
}

export default HomePage

