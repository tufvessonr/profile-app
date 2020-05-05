import { Reducer } from 'redux';
import IProfile from '../../../data/types';
import { AppTheme, Themes } from '../../../themes/themes';
import ProfileActions from '../actions/types';
import ProfileActionTypes from '../constants';

export interface IProfileState {
  loading: boolean;
  error: string;
  
  profiles: IProfile[];
  selectedProfile: IProfile;

  theme: AppTheme;
}

const InitialProfileState: IProfileState = {
  loading: false,
  error: '',
  
  profiles: [],
  selectedProfile: undefined,
  
  theme: Themes.primary
};

const ProfileReducer: Reducer<IProfileState, ProfileActions> = (
  state: IProfileState = InitialProfileState,
  action: any
): IProfileState => {

  switch (action.type) {
    case ProfileActionTypes.FETCH_PROFILES_REQUEST:
      return Object.assign({}, state, { loading: true });
    case ProfileActionTypes.FETCH_PROFILES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        profiles: action.payload,
      });
    case ProfileActionTypes.FETCH_PROFILES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
      });
    case ProfileActionTypes.SET_SELECTED_PROFILE:
      return Object.assign({}, state, {
        selectedProfile: action.payload
      });
    case ProfileActionTypes.SET_THEME:
      return Object.assign({}, state, {
        theme: action.payload
      });
    default:
      return state;
  }
};

export default ProfileReducer;
