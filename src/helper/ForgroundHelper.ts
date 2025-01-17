import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { store } from '../redux/store';
import { incidentListReload } from '../redux/actions/incidentsAction';
import * as Storage from '../helper/AsyncStorageConfig';

export async function ForegroundHandler(data: any, state: string) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default channel',
    name: 'CCTV Alerts',
    importance: AndroidImportance.HIGH,
    sound: "default"
  });

  let user_id = await Storage.getData("user_id");

  if (user_id) {
    store.dispatch(incidentListReload(user_id , 0));
  }

  await notifee.displayNotification({
    title: data?.data?.title,
    body: data?.data?.body,
    android: {
      channelId,
      sound: "default",
      pressAction: {
        id: `${state}`,
      },
    },
  });
}

const handleNotificationPress = async (event: any) => {
  if (event.type === EventType.PRESS) {
    console.log('Notification Pressed in Foreground...', event);
  }
};

notifee.onForegroundEvent(handleNotificationPress);

export default ForegroundHandler;

const handleBackgroundEvent = async (event: any) => {
  if (event.type === EventType.PRESS) {
    console.log('Notification Pressed', event);
  }
};

notifee.onBackgroundEvent(handleBackgroundEvent);