import { AxiosInstance } from "../../services/apiService"
import { INCIDENT_ATTEND_LIST, INCIDENT_ATTEND_LIST_ERROR, INCIDENTS_ERROR, INCIDENTS_LOADING, INCIDENTS_SUCCESS } from "../types";

export const incidentList = (id: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: INCIDENTS_LOADING,
            })
            const response = await AxiosInstance.post(`/get_active_theft_detail_new?user_id=${id}&background_status=0`);            
            if (response?.status == 200) {
                dispatch({
                    type: INCIDENTS_SUCCESS,
                    payload: response?.data?.data
                })
            }
        } catch (error) {
            dispatch({
                type: INCIDENTS_ERROR,
            })
        }
    }
}

export const incidentListReload = (id: any) => {
    return async (dispatch: any) => {
        try {
            const response = await AxiosInstance.post(`/get_active_theft_detail_new?user_id=${id}&background_status=0`);            
            if (response?.status == 200) {
                dispatch({
                    type: INCIDENTS_SUCCESS,
                    payload: response?.data?.data
                })
            }
        } catch (error) {
            dispatch({
                type: INCIDENTS_ERROR,
            })
        }
    }
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