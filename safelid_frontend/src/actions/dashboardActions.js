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

    axios.get('/api/dashboard/homefolder', config)
        .then(res => {
            history.push('/dashboard/folder/' + res.data.id);
        })
        .catch(err => {
            console.log(err);
        });
}

export const getFolderContent = () => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    const url = window.location.pathname;
    axios.get('/api' + url, config)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_FOLDER_CONTENT,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });
} 

export const getFolderContentByID = (id) => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    const url = '/api/dashboard/folder/' + id;
    axios.get(url, config)
        .then(res => {
            return {
                files: res.data.files,
                folders: res.data.folders
            }
        })
        .catch();
} 

export const uploadFile = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/upload', data, config)
        .then(res => {
            dispatch(getFolderContent());
        })
        .catch(err => {
            console.log('error');
        });
}

export const renameFile = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/file/rename', data, config)
        .then(res => {
            console.log('renamed')
            dispatch(getFolderContent());
        })
        .catch(err => {
            console.log('error');
        });
}

export const deleteFile = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/file/delete', data, config)
        .then(res => {
            dispatch(getFolderContent());
        })
        .catch(err => {
            console.log('error');
        });
}

export const renameFolder = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/folder/rename', data, config)
        .then(res => {
            console.log('renamed')
            dispatch(getFolderContent());
        })
        .catch(err => {
            console.log('error');
        });
}

export const deleteFolder = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/folder/delete', data, config)
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

export const changeName = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/changeName', data, config)
        .then()
        .catch();
}

export const createFolder = data => (dispatch, getState) => {
    const config = { headers: {} };
    if (getState().auth.token) {
        config.headers['x-auth-token'] = getState().auth.token;
    }

    axios.post('/api/dashboard/createFolder', data, config)
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