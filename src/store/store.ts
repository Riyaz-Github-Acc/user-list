import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { thunk, type ThunkDispatch } from 'redux-thunk';

import type { AuthActionProps } from '../types/authStore';
import type { UserActionProps } from '../types/userStore';
import authReducer from './reducers/auth.reducer';
import userListReducer from './reducers/userList.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    userList: userListReducer,
});

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AuthActionProps | UserActionProps>;

export default store;
