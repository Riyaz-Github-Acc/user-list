import { message } from 'antd';
import type { Dispatch } from 'redux';

import type { UserListDataProps, UserListResProps } from '../../types/user';
import {
    USER_CREATE_FAILURE,
    USER_CREATE_START,
    USER_CREATE_SUCCESS,
    USER_DELETE_FAILURE,
    USER_DELETE_START,
    USER_DELETE_SUCCESS,
    USER_EDIT_FAILURE,
    USER_EDIT_START,
    USER_EDIT_SUCCESS,
    USER_FETCH_FAILURE,
    USER_FETCH_START,
    USER_FETCH_SUCCESS,
    type UserActionProps,
} from '../../types/userStore';
import { api } from '../../utils/api';
import getErrorMessage from '../../utils/getErrorMessage';

export const fetchUserList = () => async (dispatch: Dispatch<UserActionProps>) => {
    dispatch({ type: USER_FETCH_START });
    try {
        const res = await api.get<UserListResProps>(`/users?per_page=12`);
        dispatch({ type: USER_FETCH_SUCCESS, payload: res?.data?.data });
    } catch (error: unknown) {
        const errorMsg = getErrorMessage(error);
        dispatch({ type: USER_FETCH_FAILURE, payload: errorMsg });
        message.error(errorMsg);
    }
};

export const createUser =
    ({ email, first_name, last_name, avatar }: UserListDataProps) =>
    async (dispatch: Dispatch<UserActionProps>) => {
        dispatch({ type: USER_CREATE_START });
        try {
            const res = await api.post<UserListDataProps>('/users', {
                email,
                first_name,
                last_name,
                avatar,
            });

            dispatch({ type: USER_CREATE_SUCCESS, payload: res?.data });
            message.success('User created successfully!');
        } catch (error: unknown) {
            const errorMsg = getErrorMessage(error);
            dispatch({ type: USER_CREATE_FAILURE, payload: errorMsg });
            message.error(errorMsg);
        }
    };

export const updateUser =
    ({ id, email, first_name, last_name, avatar }: UserListDataProps) =>
    async (dispatch: Dispatch<UserActionProps>) => {
        dispatch({ type: USER_EDIT_START });
        try {
            const res = await api.put<UserListDataProps>(`/users/${id}`, {
                email,
                first_name,
                last_name,
                avatar,
            });

            dispatch({
                type: USER_EDIT_SUCCESS,
                payload: { ...res?.data, id },
            });
            message.success('User updated successfully!');
        } catch (error: unknown) {
            const errorMsg = getErrorMessage(error);
            dispatch({ type: USER_EDIT_FAILURE, payload: errorMsg });
            message.error(errorMsg);
        }
    };

export const deleteUser = (id: number) => async (dispatch: Dispatch<UserActionProps>) => {
    dispatch({ type: USER_DELETE_START });
    try {
        await api.delete(`/users/${id}`);
        dispatch({ type: USER_DELETE_SUCCESS, payload: id });
        message.success('User deleted successfully!');
    } catch (error: unknown) {
        const errorMsg = getErrorMessage(error);
        dispatch({ type: USER_DELETE_FAILURE, payload: errorMsg });
        message.error(errorMsg);
    }
};
