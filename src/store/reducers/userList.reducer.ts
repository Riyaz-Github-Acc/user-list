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
    type UserListStateProps,
} from '../../types/userStore';

const initialState: UserListStateProps = {
    list: { loading: false, error: null, data: null },
    create: { loading: false, error: null, data: null },
    edit: { loading: false, error: null, data: null },
    delete: { loading: false, error: null, data: null },
};

const userListReducer = (state = initialState, action: UserActionProps): UserListStateProps => {
    switch (action.type) {
        case USER_FETCH_START:
            return {
                ...state,
                list: { ...state.list, loading: true, error: null },
            };
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                list: { loading: false, error: null, data: action.payload },
            };
        case USER_FETCH_FAILURE:
            return {
                ...state,
                list: { loading: false, error: action.payload, data: null },
            };

        case USER_CREATE_START:
            return {
                ...state,
                create: { ...state.create, loading: true, error: null },
            };
        case USER_CREATE_SUCCESS:
            return {
                ...state,
                create: { loading: false, error: null, data: action.payload },
                list: {
                    ...state.list,
                    data: state.list.data ? [...state.list.data, action.payload] : [action.payload],
                },
            };
        case USER_CREATE_FAILURE:
            return {
                ...state,
                create: { loading: false, error: action.payload, data: null },
            };

        case USER_EDIT_START:
            return {
                ...state,
                edit: { ...state.edit, loading: true, error: null },
            };
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                edit: { loading: false, error: null, data: action.payload },
                list: {
                    ...state.list,
                    data: state.list.data
                        ? state.list.data.map((user) =>
                              user.id === action.payload.id ? action.payload : user,
                          )
                        : null,
                },
            };
        case USER_EDIT_FAILURE:
            return {
                ...state,
                edit: { loading: false, error: action.payload, data: null },
            };

        case USER_DELETE_START:
            return {
                ...state,
                delete: { ...state.delete, loading: true, error: null },
            };
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                delete: { loading: false, error: null, data: null },
                list: {
                    ...state.list,
                    data: state.list.data
                        ? state.list.data.filter((user) => user.id !== action.payload)
                        : null,
                },
            };
        case USER_DELETE_FAILURE:
            return {
                ...state,
                delete: { loading: false, error: action.payload, data: null },
            };

        default:
            return state;
    }
};

export default userListReducer;
