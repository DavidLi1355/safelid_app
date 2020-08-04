import axios from 'axios';

import { 
    GET_FOLDER_CONTENT
} from './types';

export const toHomeFolder = history => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {}
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    axios.get('http://localhost:5000/dashboard/homefolder', config)
        .then(res => {
            history.push('/dashboard/folder/' + res.data.id);
        })
        .catch();
}

export const getFolderContent = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {}
    };
    if (token) {
        config.headers['x-auth-token'] = token;
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
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    console.log(data);

    axios.post('http://localhost:5000/dashboard/upload', data, config)
        .then(res => {
            console.log('success');
        })
        .catch(err => {
            console.log('error');
        });

}
