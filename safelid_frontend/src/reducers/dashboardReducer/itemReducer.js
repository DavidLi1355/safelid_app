import { 
    GET_FOLDER_CONTENT
} from "../../actions/types";


const initialState = {
    current_folder: {
        id: 'abc',
        name: 'home'
    },
    prev_folder: {
        id: 'abc',
        name: 'home'
    },
    folders: null,
    files: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FOLDER_CONTENT:
            return {
                ...state,
                folders: action.payload.folders,
                files: action.payload.files
            }
        default:
            return state;
    }
}