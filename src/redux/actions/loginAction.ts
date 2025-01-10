import { NetworkInfo } from "react-native-network-info";
import { AxiosInstance } from "../../services/apiService";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../types";
import * as Storage from '../../helper/AsyncStorageConfig';
import Toast from "react-native-simple-toast"

export const ipLoginAction = (retryCount = 3, retryDelay = 5000) => {
    return async (dispatch: any) => {
        dispatch({ type: LOGIN_LOADING });
        let attempt = 0;
        const fetchAndLogin = async () => {
            try {
                const ipAddress = await NetworkInfo.getIPV4Address();
                const token = await Storage.getData("token");
                const uniqueId = await Storage.getData("uniqueId");
                if (ipAddress && uniqueId && token) {
                    const response = await AxiosInstance.post(
                        `/login_with_ip?user_id=${uniqueId}&firebase_token=${token}&ip_address=${ipAddress}&company_name=Coop`
                    );
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: response?.data,
                    });
                    Toast.show("Login Success", 2000, {
                        backgroundColor: "green"
                    });
                } else {
                    throw new Error("Missing required data (IP, Token, or UniqueId)");
                }
            } catch (error) {
                attempt++;
                if (attempt < retryCount) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    return fetchAndLogin();
                } else {
                    Toast.show("Invalid Ip Adress", 2000, {
                        backgroundColor: "red"
                    });
                    dispatch({ type: LOGIN_ERROR });
                }
            }
        };
        await fetchAndLogin();
    };
};

export const logoutAction = (id: any) => {
    return async (dispatch: any) => {
        try {
            const response = await AxiosInstance.post(`/logout_new?user_id=${id}`)
            Toast.show("Logout Successfull !!!", 2000, {
                backgroundColor: "red"
            });
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } catch (error) {
            Toast.show("Logout Failed !!! Please try Again...", 2000, {
                backgroundColor: "red"
            });
        }
    }
}