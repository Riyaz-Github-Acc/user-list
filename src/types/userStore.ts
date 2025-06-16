import type { UserListDataProps } from './user';

export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

export const USER_CREATE_START = 'USER_CREATE_START';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';

export const USER_EDIT_START = 'USER_EDIT_START';
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS';
export const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE';

export const USER_DELETE_START = 'USER_DELETE_START';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';

export interface RequestState<T = unknown> {
    loading: boolean;
    error: string | null;
    data: T | null;
}

export interface UserListStateProps {
    list: RequestState<UserListDataProps[]>;
    create: RequestState<Omit<UserListDataProps, 'id'>>;
    edit: RequestState<UserListDataProps>;
    delete: RequestState<string>;
}

export interface UserFetchStartAction {
    type: typeof USER_FETCH_START;
}

export interface UserFetchSuccessAction {
    type: typeof USER_FETCH_SUCCESS;
    payload: UserListDataProps[];
}

export interface UserFetchFailureAction {
    type: typeof USER_FETCH_FAILURE;
    payload: string;
}

export interface UserCreateStartAction {
    type: typeof USER_CREATE_START;
}

export interface UserCreateSuccessAction {
    type: typeof USER_CREATE_SUCCESS;
    payload: UserListDataProps;
}

export interface UserCreateFailureAction {
    type: typeof USER_CREATE_FAILURE;
    payload: string;
}

export interface UserEditStartAction {
    type: typeof USER_EDIT_START;
}

export interface UserEditSuccessAction {
    type: typeof USER_EDIT_SUCCESS;
    payload: UserListDataProps;
}

export interface UserEditFailureAction {
    type: typeof USER_EDIT_FAILURE;
    payload: string;
}

export interface UserDeleteStartAction {
    type: typeof USER_DELETE_START;
}

export interface UserDeleteSuccessAction {
    type: typeof USER_DELETE_SUCCESS;
    payload: number;
}

export interface UserDeleteFailureAction {
    type: typeof USER_DELETE_FAILURE;
    payload: string;
}

export type UserActionProps =
    | UserFetchStartAction
    | UserFetchSuccessAction
    | UserFetchFailureAction
    | UserCreateStartAction
    | UserCreateSuccessAction
    | UserCreateFailureAction
    | UserEditStartAction
    | UserEditSuccessAction
    | UserEditFailureAction
    | UserDeleteStartAction
    | UserDeleteSuccessAction
    | UserDeleteFailureAction;
