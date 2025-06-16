import { message } from 'antd';
// Import api after mocking axios
import axios from 'axios';
import { legacy_configureStore as configureMockStore } from 'redux-mock-store';
import { thunk } from 'redux-thunk';

import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '../../types/authStore';
import { api } from '../../utils/api';
import { loginUser, logoutUser } from './auth.action';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        create: jest.fn(() => ({
            post: jest.fn(),
            get: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        })),
        isAxiosError: jest.fn(),
    },
}));

// Mock antd message
jest.mock('antd', () => ({
    message: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const middlewares: any[] = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth actions', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
    });

    describe('loginUser', () => {
        const userCredentials = { email: 'test@example.com', password: 'password123' };

        it('dispatches LOGIN_SUCCESS and shows success message on successful login', async () => {
            // Mock API response
            (api.post as jest.Mock).mockResolvedValue({
                data: { token: 'fake-token' },
            });

            await store.dispatch<any>(loginUser(userCredentials));

            const actions = store.getActions();

            expect(actions[0]).toEqual({ type: LOGIN_START });
            expect(actions[1]).toEqual({ type: LOGIN_SUCCESS, payload: 'fake-token' });
            expect(message.success).toHaveBeenCalledWith('User logged in successful!');
            expect(message.error).not.toHaveBeenCalled();
        });

        it('dispatches LOGIN_FAILURE and shows error message on failed login', async () => {
            const errorMessage = 'Invalid credentials';

            // Create a mock axios error
            const mockAxiosError = {
                response: {
                    data: { error: errorMessage },
                },
                message: errorMessage,
            };

            // Mock axios.isAxiosError to return true for our mock error
            (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);
            (api.post as jest.Mock).mockRejectedValue(mockAxiosError);

            await store.dispatch<any>(loginUser(userCredentials));

            const actions = store.getActions();

            expect(actions[0]).toEqual({ type: LOGIN_START });
            expect(actions[1]).toEqual({ type: LOGIN_FAILURE, payload: errorMessage });
            expect(message.error).toHaveBeenCalledWith(errorMessage);
            expect(message.success).not.toHaveBeenCalled();
        });
    });

    describe('logoutUser', () => {
        it('dispatches LOGOUT and shows success message', async () => {
            await store.dispatch<any>(logoutUser());

            const actions = store.getActions();

            expect(actions[0]).toEqual({ type: LOGOUT });
            expect(message.success).toHaveBeenCalledWith('User logged out successfully!');
        });
    });
});
