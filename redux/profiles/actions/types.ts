import { IFetchProfilesFailure, IFetchProfilesRequest, IFetchProfilesSuccess, ISetSelectedProfile, ISetTheme } from "./interfaces";

type ProfileActions = IFetchProfilesFailure | IFetchProfilesRequest | IFetchProfilesSuccess | ISetSelectedProfile| ISetTheme;

export default ProfileActions;