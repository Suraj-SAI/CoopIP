import { PermissionsAndroid } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import ForegroundHandler from './src/helper/ForgroundHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import DeviceInfo from 'react-native-device-info';
import Navigator from './src/navigation/navigator';
import * as Storage from './src/helper/AsyncStorageConfig';
import { Provider } from "react-redux"
import { store } from './src/redux/store';
import { ForegroundHandler2 } from './src/helper/ForegroundHelper2';

const App = () => {

  const getId = useCallback(async () => {
    try {
      let id = await DeviceInfo.getUniqueId();
      await Storage.saveData("uniqueId", id);
    } catch (error) {
      console.error("Error getting unique ID:", error);
    }
  }, []);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

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

  const pushNotification = useCallback(async () => {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        await Storage.saveData("token", fcmToken);
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;