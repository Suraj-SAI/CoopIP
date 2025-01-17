import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { logo } from '../../../utils/images';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { ipLoginAction } from '../../../redux/actions/loginAction';

const IpLogin = () => {
  const dispatch = useDispatch<any>()
  const appState = useRef(AppState.currentState);

  const iplogin = async () => {
    await dispatch(ipLoginAction())
  }

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {

      if (
        appState.current === 'background' &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground, hitting login API.');
        iplogin();
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgView}>
        <View style={styles.imgView2}>
          <Image source={logo} style={styles.logoImg} />
        </View>
      </View>
      <Text style={styles.welcomeTxt}>Welcome to the SAI</Text>
      <Text style={styles.txt}>You are unauthorized</Text>
    </SafeAreaView>
  );

}

export default IpLogin