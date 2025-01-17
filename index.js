/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import notifee from '@notifee/react-native';
import * as Storage from './src/helper/AsyncStorageConfig';
import { store } from './src/redux/store';

// to avoid system texts of the device
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false
}


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notification recieve in kill state', remoteMessage);

  let user_id = await Storage.getData("user_id");

  if (user_id) {
    store.dispatch(incidentListReload(user_id, 0));
    store.dispatch(incidentListReload(user_id, 0))
  }

  await notifee.displayNotification({
    title: remoteMessage?.data?.title || 'New Notification',
    body: remoteMessage?.data?.body || 'You have a new notification.',
    android: {
      channelId: 'default_channel',
      pressAction: {
        id: `kill`,
        launchActivity: 'default',
      }
    },
  });

});

AppRegistry.registerComponent(appName, () => App);