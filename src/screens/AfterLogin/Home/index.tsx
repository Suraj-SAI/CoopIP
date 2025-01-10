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
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen'

const initialLayout = { width: Dimensions.get('window').width };

const HomePage = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch<any>()
  const { userData } = useSelector((store: any) => store.loginReducer);
  let userId = userData?.data?.user_id;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Incidents", title: 'INCIDENTS' },
    { key: 'Live', title: 'LIVE STATUS' },
  ]);

  const renderScene = SceneMap({
    Incidents: Incidents,
    Live: LiveStatus,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.cctvFont}>CCTV Alerts</Text>
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
                style={{ flex: 1, padding: 10, alignItems: 'center', backgroundColor: i === props.navigationState.index ? '#bfbfbf' : '#fff'}}
                onPress={() => props.jumpTo(route.key)}
              >
                <Text style={{ color: '#000', fontSize: heightPercentageToDP(2.3) }}>
                  {route.title}
                </Text>
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
    </SafeAreaView>
  )
}

export default HomePage

