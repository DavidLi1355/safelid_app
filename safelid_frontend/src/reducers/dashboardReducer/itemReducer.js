


const initialState = {
    current_folder: {
        id: 'abc',
        name: 'home'
    },
    prev_folder: {
        id: 'abc',
        name: 'home'
    },
    folders: [
        {id: '1', name: 'private'},
        {id: '2', name: 'public'},
        {id: '3', name: 'school'}
    ],
    files: [
        {id: '1', name: 'private'},
        {id: '2', name: 'public'},
        {id: '3', name: 'school'}
    ]
    // files: 
};

export default function(state = initialState, action) {
    switch (action.type) {
        
        default:
            return state;
    }
}