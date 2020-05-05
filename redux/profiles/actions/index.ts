import { fetchProfiles } from "../../../data/api";
import IProfile from "../../../data/types";
import { AppTheme } from "../../../themes/themes";
import ProfileActionTypes from "../constants";
import { IFetchProfilesFailure, IFetchProfilesRequest, IFetchProfilesSuccess, ISetSelectedProfile, ISetTheme } from "./interfaces";

export const fetchProfilesRequest = (dispatch: any): IFetchProfilesRequest => {
  fetchProfiles(dispatch);
  return {
    type: ProfileActionTypes.FETCH_PROFILES_REQUEST,
    payload: null
  }
}

export const fetchProfilesSuccess = (profiles: IProfile[]): IFetchProfilesSuccess => {
  return {
    type: ProfileActionTypes.FETCH_PROFILES_SUCCESS,
    payload: profiles
  }
}

export const fetchProfilesFailure = (error: string): IFetchProfilesFailure => {
  return {
    type: ProfileActionTypes.FETCH_PROFILES_FAILURE,
    payload: error
  }
}

export const setSelectedProfile = (profile: IProfile): ISetSelectedProfile => {
  return {
    type: ProfileActionTypes.SET_SELECTED_PROFILE,
    payload: profile
  }
}

export const setTheme = (theme: AppTheme): ISetTheme => {
  return {
    type: ProfileActionTypes.SET_THEME,
    payload: theme
  }
}