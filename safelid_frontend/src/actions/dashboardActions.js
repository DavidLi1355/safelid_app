import axios from 'axios';


export const uploadFile = data => (dispatch, getState) => {
    // const token = getState().auth.token;
    // const config = {
    //     headers: {
    //         "Content-type": "application/json"
    //     }
    // }
    // if (token) {
    //     config.headers['x-auth-token'] = token;
    // }

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
        .catch();

    // console.log(imageData);

    // const file = {
    //     name: 'test',
    //     user_id: '5f18fb2f1fd86a58d0405736',
    //     parent_folder_id: '5f1f20ab7c884941e46b6836',
    //     data: imageData
    // }
    
    // axios.post('http://localhost:5000/dashboard/upload', file)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log('error');
    //     });
}
