import IProfile from "../../../data/types";
import { AppTheme } from "../../../themes/themes";
import ProfileActionTypes from "../constants";

export interface IFetchProfilesRequest {
    type: ProfileActionTypes.FETCH_PROFILES_REQUEST;
    payload: any;
}

export interface IFetchProfilesSuccess {
    type: ProfileActionTypes.FETCH_PROFILES_SUCCESS;
    payload: IProfile[];
}

export interface IFetchProfilesFailure {
    type: ProfileActionTypes.FETCH_PROFILES_FAILURE;
    payload: string;
}

export interface ISetSelectedProfile {
    type: ProfileActionTypes.SET_SELECTED_PROFILE;
    payload: IProfile;
}

export interface ISetTheme {
    type: ProfileActionTypes.SET_THEME;
    payload: AppTheme;
}
