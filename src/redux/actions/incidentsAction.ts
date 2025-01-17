import { AxiosInstance } from "../../services/apiService"
import { INCIDENT_ATTEND_LIST, INCIDENT_ATTEND_LIST_ERROR, INCIDENTS_ERROR, INCIDENTS_LOADING, INCIDENTS_SUCCESS } from "../types";

export const incidentList = (id: any, status: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: INCIDENTS_LOADING,
            });

            const response = await AxiosInstance.post(
                `/get_active_theft_detail_new?user_id=${id}&background_status=${status}`
            );

            if (response?.status === 200) {
                const today = new Date().toISOString().split("T")[0];
                const filteredData = response?.data?.data?.filter((incident: any) => {
                    const incidentDate = new Date(incident.date).toISOString().split("T")[0];
                    return incidentDate === today;
                });                

                dispatch({
                    type: INCIDENTS_SUCCESS,
                    payload: filteredData,
                });
            }
        } catch (error) {
            dispatch({
                type: INCIDENTS_ERROR,
            });
        }
    };
};

export const incidentListReload = (id: any , status : any) => {
    return async (dispatch: any) => {
        try {
            const response = await AxiosInstance.post(
                `/get_active_theft_detail_new?user_id=${id}&background_status=${status}`
            );

            if (response?.status === 200) {
                const today = new Date().toISOString().split("T")[0];
                const filteredData = response?.data?.data?.filter((incident: any) => {
                    const incidentDate = new Date(incident.date).toISOString().split("T")[0];
                    return incidentDate === today;
                });                

                dispatch({
                    type: INCIDENTS_SUCCESS,
                    payload: filteredData,
                });
            }
        } catch (error) {
            dispatch({
                type: INCIDENTS_ERROR,
            });
        }
    };
}

export const attendedIncidentsList = (id: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: INCIDENTS_LOADING,
            })
            const response = await AxiosInstance.post(`get_filled_active_theft_detail_new?user_id=${id}&limit=40`);
            dispatch({
                type: INCIDENT_ATTEND_LIST,
                payload: response?.data?.data
            })
        } catch (error) {
            dispatch({
                type: INCIDENT_ATTEND_LIST_ERROR,
            })
        }
    }
}