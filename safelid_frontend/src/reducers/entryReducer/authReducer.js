import { 
    USER_LOADING, 
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SET_CURRENT_USER,
    AUTH_ERROR
} from "../../actions/types";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            };
        default:
            return state;
    }
}