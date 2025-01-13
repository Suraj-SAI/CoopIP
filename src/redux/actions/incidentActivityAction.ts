import { AxiosInstance } from "../../services/apiService";
import { INCIDENT_ACTION_ERROR, INCIDENT_ACTION_LOADING, INCIDENT_ACTION_SUCCESS } from "../types";
import { attendedIncidentsList, incidentListReload } from "./incidentsAction";

export const incidenActivityAction = (id: any, theftid: any, remarks: any, status: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: INCIDENT_ACTION_LOADING,
            })
            const response = await AxiosInstance.post(`/update_active_theft_detail_new?theft_id=${theftid}&remarks=${remarks}&dismiss_status=${status}&user_id=${id}`);
            if (response?.status == 200) {
                dispatch({
                    type: INCIDENT_ACTION_SUCCESS,
                })
                dispatch(attendedIncidentsList(id));
                dispatch(incidentListReload(id))
            }
        } catch (error) {
            dispatch({
                type: INCIDENT_ACTION_ERROR,
            })
        }
    }
}