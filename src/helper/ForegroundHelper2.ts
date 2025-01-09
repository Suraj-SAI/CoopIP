import notifee, { EventType, AndroidImportance } from '@notifee/react-native';

export async function ForegroundHandler2(data: any, state: string) {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
        id: 'update_channel',
        name: 'coop',
        importance: AndroidImportance.NONE,
    });

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