import axios from 'axios';

import { 
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    GET_ERRORS,
    AUTH_ERROR,
    SET_CURRENT_USER
} from './types';

export const registerUser = (userData, history) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    
    axios.post('/api/register', userData, config)
        .then(res => {
            history.push('/login');
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
    
    axios.post('/api/login', userData, config)
        .then(res => {
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
    dispatch({
        type: LOGOUT_SUCCESS
    });
}

export const loadUser = () => (dispatch, getState) => new Promise((resolve, rejct) => {
    dispatch(userLoading());

    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    axios.get('/api/userauth', config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(setCurrentUser(res.data));
        })
        .catch(err => {
            dispatch(getErrors(err.response.data));
            dispatch({
                type: AUTH_ERROR
            });
        })
        .finally(() => {
            resolve();
        });  
})

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