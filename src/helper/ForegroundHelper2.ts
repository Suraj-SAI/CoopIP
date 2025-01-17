import notifee, { AndroidImportance } from '@notifee/react-native';
import * as Storage from '../helper/AsyncStorageConfig';
import { store } from '../redux/store';
import { incidentListReload } from '../redux/actions/incidentsAction';

export async function ForegroundHandler2(data: any, state: string) {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
        id: 'update_channel',
        name: 'CCTV Alerts',
        importance: AndroidImportance.NONE,
    });

    let user_id = await Storage.getData("user_id");
    
    
      if (user_id) {
        store.dispatch(incidentListReload(user_id , 0));
        store.dispatch(incidentListReload(user_id , 0))
      }

    await notifee.displayNotification({
        title: data?.notification?.title,
        body: data?.notification?.body,
        android: {
            channelId,
            pressAction: {
                id: `${state}`,
            },
            importance: AndroidImportance.NONE
        },
    });
}