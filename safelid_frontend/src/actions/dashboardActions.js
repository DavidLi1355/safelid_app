import axios from 'axios';


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
    
    axios.post('http://localhost:5000/dashboard/upload', data, config)
        .then(res => {
            console.log('res');
        })
        .catch(err => {
            console.log('error');
        });
}
