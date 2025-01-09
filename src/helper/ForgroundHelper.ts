import notifee, { EventType, AndroidImportance } from '@notifee/react-native';

export async function ForegroundHandler(data: any, state: string) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default channel',
    name: 'coop',
    importance: AndroidImportance.HIGH,
    sound : "default"
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
      sound : "default",
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