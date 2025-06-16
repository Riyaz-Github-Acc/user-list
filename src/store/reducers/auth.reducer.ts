import {
    type AuthActionProps,
    type AuthStateProps,
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../../types/authStore';

const initialState: AuthStateProps = {
    token: sessionStorage.getItem('token') || null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action: AuthActionProps): AuthStateProps => {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, loading: true, error: null };

        case LOGIN_SUCCESS:
            sessionStorage.setItem('token', action.payload);
            return { ...state, loading: false, token: action.payload, error: null };

        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT:
            sessionStorage.removeItem('token');
            return { ...state, token: null };

        default:
            return state;
    }
};

export default authReducer;

export const isAuthenticated = (state: { auth: AuthStateProps }) => !!state.auth.token;
