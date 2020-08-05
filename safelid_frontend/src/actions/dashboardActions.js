import axios from 'axios';

import { 
    GET_FOLDER_CONTENT,
    CLEAR_ITEM
} from './types';

export const toHomeFolder = history => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.get('http://localhost:5000/dashboard/homefolder', config)
        .then(res => {
            history.push('/dashboard/folder/' + res.data.id);
        })
        .catch();
}

export const getFolderContent = () => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    const url = window.location.href
    console.log(url);
    axios.get(url, config)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_FOLDER_CONTENT,
                payload: res.data
            })
        })
        .catch();
} 

export const uploadFile = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('http://localhost:5000/dashboard/upload', data, config)
        .then(res => {
            dispatch(getFolderContent());
        })
        .catch(err => {
            console.log('error');
        });
}

// export const getFile = id => (dispatch, getState) => {
//     const config = { headers: {} };
//     if (getState().auth.token) {
//         config.headers['x-auth-token'] = getState().auth.token;
//     }

//     axios.get('http://localhost:5000/dashboard/file/' + id, config)
//         .then(res => {

//         })
// }

export const createFolder = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('http://localhost:5000/dashboard/createFolder', data, config)
        .then(res => {
            dispatch(getFolderContent());
        })
        .catch(err => {
            console.log('error');
        });
}

export const clearItem = () => dispatch => {
    dispatch({
        type: CLEAR_ITEM
    });
}