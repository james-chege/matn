import { LOGIN_USER_SUCCESS, LOG_OUT_USER } from '../constants';

const initialState = {
    user: {},
    errors: {},
    loading: false,
    success: false,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        }
        case LOG_OUT_USER: {
            return {
                ...state,
                user: {},
                loading: false,
            }
        }
        default:
            return state
    }
}

export default reducer;
