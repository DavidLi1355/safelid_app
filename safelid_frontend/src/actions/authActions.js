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
    
    axios.post('http://localhost:5000/register', userData, config)
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
    
    axios.post('http://localhost:5000/login', userData, config)
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

    axios.get('http://localhost:5000/userauth', config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(setCurrentUser(res.data));
            console.log('login success')
        })
        .catch(err => {
            dispatch(getErrors(err.response.data));
            dispatch({
                type: AUTH_ERROR
            });
        })
        .finally(() => {
            console.log('finished authenticating')
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