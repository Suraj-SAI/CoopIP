import { PermissionsAndroid, Platform } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import ForegroundHandler from './src/helper/ForgroundHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigator from './src/navigation/navigator';
import { Provider } from "react-redux"
import { store } from './src/redux/store';
import { ForegroundHandler2 } from './src/helper/ForegroundHelper2';
import { getId, pushNotification } from './src/utils/public';
import ConnectivityWrapper from './src/components/ConnetctionWrapper';
import SoundPlayer from './src/components/SoundPlayer';
import { ToastProvider } from 'react-native-toast-notifications';
import notifee from '@notifee/react-native';
import * as Storage from './src/helper/AsyncStorageConfig';
import { incidentList } from './src/redux/actions/incidentsAction';


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
      remoteMessage?.data?.title === "Attended" ? ForegroundHandler2(remoteMessage, "Foreground") :
        ForegroundHandler(remoteMessage, 'Foreground');
    });

    // for background and kill state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Notification recieve in background state!', remoteMessage);
      let user_id = await Storage.getData("user_id");

      if (user_id) {
        store.dispatch(incidentList(user_id , 0));
      }

      await notifee.displayNotification({
        title: remoteMessage?.data?.title || 'New Notification',
        body: remoteMessage?.data?.body || 'You have a new notification.',
        android: {
          channelId: 'default_channel',
          pressAction: {
            id: `background`,
            launchActivity: 'default',
          }
        },
      });
    });

    // for clicking msg and opening app
    messaging().onNotificationOpenedApp(async remoteMessage => {      
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
        <SoundPlayer>
          <ToastProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Navigator />
            </GestureHandlerRootView>
          </ToastProvider>
        </SoundPlayer>
      </Provider>
    </ConnectivityWrapper>
  );
};

export default App;