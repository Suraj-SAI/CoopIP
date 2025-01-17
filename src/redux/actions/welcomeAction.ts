import { Alert } from "react-native";
import { AxiosInstance } from "../../services/apiService";
import * as Storage from '../../helper/AsyncStorageConfig';

export const welcomeAction = () => {
    return async (dispatch: any) => {
        try {
            // Check if the action has already been executed
            const isWelcomeShown = await Storage.getData("isWelcomeShown");

            // Only execute if it's not executed before
            if (!isWelcomeShown) {
                const token = await Storage.getData("token");
                if (token) {
                    const response = await AxiosInstance.post(`/welcome_notification?device_id=${token}`);
                    if (response?.status === 200) {
                        Alert.alert("Welcome to SAI Alerts", "Success!!!");
                        // Mark the action as executed
                        await Storage.saveData("isWelcomeShown", "true");
                    }
                }
            }
        } catch (error) {
            Alert.alert("We have a problem in sending a notification to your device");
        }
    };
};
