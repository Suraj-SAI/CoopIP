import { PermissionsAndroid, Platform } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import ForegroundHandler from './src/helper/ForgroundHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigator from './src/navigation/navigator';
import * as Storage from './src/helper/AsyncStorageConfig';
import { Provider } from "react-redux"
import { store } from './src/redux/store';
import { ForegroundHandler2 } from './src/helper/ForegroundHelper2';
import { getId, pushNotification } from './src/utils/public';
import ConnectivityWrapper from './src/components/ConnetctionWrapper';

const App = () => {

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    pushNotification();
    getId();

    // for foreground State
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification recieve in foreground state', remoteMessage);
      remoteMessage?.notification?.android?.channelId === "update_channel" ? ForegroundHandler2(remoteMessage, "Foreground") :
        ForegroundHandler(remoteMessage, 'Foreground');
    });

    // for background and kill state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Notification recieve in background state!', remoteMessage);
    });

    // for clicking msg and opening app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notifcation pressed in background',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification pressed in kill state',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  }, []);

  return (
    <ConnectivityWrapper>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigator />
        </GestureHandlerRootView>
      </Provider>
    </ConnectivityWrapper>
  );
};

export default App;