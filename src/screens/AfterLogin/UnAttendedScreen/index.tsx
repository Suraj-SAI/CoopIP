import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { profile } from '../../../utils/images'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../../redux/actions/loginAction';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch<any>()
  const { userData } = useSelector((store: any) => store.loginReducer);
  let userId = userData?.data?.user_id;

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

      <View style={styles.container2}>
      </View>
    </SafeAreaView>
  )
}

export default HomePage

