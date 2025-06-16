export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface AuthStateProps {
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface LoginStartAction {
    type: typeof LOGIN_START;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: string;
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionProps =
    | LoginStartAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutAction;
