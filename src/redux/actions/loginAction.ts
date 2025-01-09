import { NetworkInfo } from "react-native-network-info";
import { AxiosInstance } from "../../services/apiService";
import { LOGIN_SUCCESS, USER_DATA } from "../types";
import axios from "axios";

export const ipLoginAction = (uniqueId: any, token: any) => {
    return async (dispatch: any) => {
        try {
            const ipAddress = await NetworkInfo.getIPV4Address();

            if (ipAddress && uniqueId && token) {

                const response = await AxiosInstance.post(`/login_with_ip?user_id=${uniqueId}&firebase_token=${token}&ip_address=${ipAddress}&company_name=Coop`);
                dispatch({
                    type: LOGIN_SUCCESS,
                });
                dispatch({
                    type: USER_DATA,
                    payload: response?.data,
                });
            }
        } catch (error) {
            console.error("Error in ipLoginAction:", JSON.stringify(error));
        }
    };
};



export const sendNotification = async () => {
    const url = "https://fcm.googleapis.com/v1/projects/saialerts-6e7da/messages:send";

    const headers = {
        Authorization: "Bearer ya29.c.c0ASRK0GZTlSb7kwZmpb7Zzlz31SMgsS3mzOxe7txYm1sQoey1aryHHgKtC2VeExx4KGhdn3LR_hlSI6NuIQXeFHyO793-rOti9Ng1hZvtzWqdOJZthhF8oA8T3tcVxTr30VG3asgPTYIwxWlVajVjzcVosJslIYJZONvX4AtPvsUddehjimPdT4Wlcq_N3zkmvgk2LCUR-vxjbk7baE3dk_wxP0V8gUgPac2s0Rx9ijmV652A0mt7CJzuP41G14fCycxDcz7NGgn1GsdsBn9-PyA2JCfCj3eLhCFhvcXQCBTia4ZS2sfwsenkAjmLs0GzSMzjpjDJH_y4zG-j2Y6Y9a2fSqD2sTsMc69AsjkgbKgZ86EhslrwtBET384KVy42SQhdJkZF-405-_l2aniYfJ4gyBw6yY_dxIRgbkdjJ6jtfOOlbSMw9hqZngRIOZFayQUpIrcnInyF6BrnrXyjS8U95bnItku01WfXRgOVQIQis_VZvvkgihzaVhXuXIiZ-zht0jmbMorYbRRZf0k4nIzWcXslmtzdo86oqd0XFrrWaOnI8ng9gzl-O6We7fe5QJs7dBixfb2buSoeart8Ro60h3Jl5YolSRU18aktrQSknFVJIS-tlh2Fopj0nRu_n_XdU8XzY66fg0tyd-dwdt8Yb3l0-0txfj75hO4Y8lOM9pYRjUYwj9dMB8Sg9Ruvhvcco-Vffmy87U6Rdw_UpI5JceBMqFliQp0X0oMZOgYX81Fl_Zinzwv5FYm6-8lUpcdBMwYUUFmxXf5lYVW_YxtsWxp5-uhyMb3ryR9w06JZerIjI_6YWO7z36bM_xt4Va97bxMrtt72U2_UthuRfkUOesjBW5jS10Y55fg0Yi_8MspeM7fQWxfb128B8FFJVgFs49SyYwje_W6Y64I--3tgRb2tVSgFOW9gwiIUWuF06WoyXaSItujQMJnaMW5nwef5yk1-qxXU6x8mU1OBepgZ7wiWrM6wy3QW59alVuSZosx446FWais", // Replace with your actual token
        "Content-Type": "application/json",
    };

    const data = {
        message: {
            token: "dp5fraY2H2qtd5i5eKJ2nL:APA91bF1YwxcbEV16QTpouaMHwNs3D9y1gzm2FfOIOtDHpJDhfU8acjCE2k29BfJ0M_jn0rII5CtcsTaFGKFtDG1B-bmuXqLDjIGX6Nc92hcHamgPxn9FLk", // Replace with the target device's FCM token
            notification: {
                body: "This is an FCM notification message!",
                title: "FCM Message",
            },
            android: {
                notification: {
                    sound: "buzzer",
                    channel_id: "default_channel",
                },
            },
        },
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log("Notification sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending notification:");
    }
};
