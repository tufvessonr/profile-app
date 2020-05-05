import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer, { IProfileState } from './profiles/reducers';

export interface IRootState {
  profileState: IProfileState;
}

export default function configureStore(): Store<IRootState, any> {
  const store = createStore<IRootState, any, any, any>(
    combineReducers({
      profileState: reducer,
    }),
    applyMiddleware(thunkMiddleware)
  );

  return store;
}
