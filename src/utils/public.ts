import DeviceInfo from "react-native-device-info";
import * as Storage from '../helper/AsyncStorageConfig';
import messaging from '@react-native-firebase/messaging';

export const getId = async () => {
    try {
        let id = await DeviceInfo.getUniqueId();
        await Storage.saveData("uniqueId", id);
    } catch (error) {
        console.error("Error getting unique ID:", error);
    }
};


export const pushNotification = async () => {
    try {
        let fcmToken = await messaging().getToken();
        console.log(fcmToken , "FCM TOKEN");
        
        if (fcmToken) {
            await Storage.saveData("token", fcmToken);
        }
    } catch (error) {
        console.error("Error getting FCM token:", error);
    }
};