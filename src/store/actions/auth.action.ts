import { message } from 'antd';
import type { Dispatch } from 'redux';

import {
    type AuthActionProps,
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../../types/authStore';
import type { UserLoginProps } from '../../types/user';
import { api } from '../../utils/api';
import getErrorMessage from '../../utils/getErrorMessage';

export const loginUser =
    ({ email, password }: UserLoginProps) =>
    async (dispatch: Dispatch<AuthActionProps>) => {
        dispatch({ type: LOGIN_START });
        try {
            const res = await api.post('/login', {
                email,
                password,
            });

            const token = res.data?.token;
            dispatch({ type: LOGIN_SUCCESS, payload: token });
            message.success('User logged in successful!');
        } catch (error: unknown) {
            const errorMsg = getErrorMessage(error);
            dispatch({ type: LOGIN_FAILURE, payload: errorMsg });
            message.error(errorMsg);
        }
    };

export const logoutUser = () => async (dispatch: Dispatch<AuthActionProps>) => {
    dispatch({ type: LOGOUT });
    message.success('User logged out successfully!');
};
