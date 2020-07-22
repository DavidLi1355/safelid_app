import axios from 'axios';
import history from '../history';
// import jwt_decode from "jwt-decode";
import { 
    USER_LOADING, 
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    GET_ERRORS,
    AUTH_ERROR,
    SET_CURRENT_USER
} from './types';


export const registerUser = userData => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    
    axios.post('http://localhost:5000/register', userData, config)
        .then(res => {
            history.push('/login');
            dispatch(setCurrentUser(res.data));
        })
        .catch(err => {
            dispatch(getErrors(err.response.data));
        });
}

export const loginUser = userData => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    
    axios.post('http://localhost:5000/login', userData, config)
        .then(res => {
            history.push('/dashboard');
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(setCurrentUser(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(getErrors(err.response.data));
        });
}

export const logoutUser = () => dispatch => {
    history.push('/login');
    dispatch({
        type: LOGOUT_SUCCESS
    });
}

export const loadUser = () => (dispatch, getState) => {
    // dispatch(userLoading());

    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    axios.get('http://localhost:5000/userauth', config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(setCurrentUser(res.data))
        })
        .catch(err => {
            dispatch(getErrors(err.response.data));
            dispatch({
                type: AUTH_ERROR
            });
        }
    );
}

export const userLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

export const getErrors = errors => {
    return {
        type: GET_ERRORS,
        payload: errors
    };
}

