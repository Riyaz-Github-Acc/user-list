import axios from 'axios';

const getErrorMessage = (error: unknown): string => {
    let errorMsg = 'Unexpected error occurred. Please try again later.';
    if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.error || error.message || errorMsg;
    } else if (error instanceof Error) {
        errorMsg = error.message;
    }
    return errorMsg;
};

export default getErrorMessage;
