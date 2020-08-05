import { 
    GET_FOLDER_CONTENT,
    CLEAR_ITEM
} from "../../actions/types";


const initialState = {
    current_folder: null,
    folders: null,
    files: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FOLDER_CONTENT:
            return {
                ...state,
                current_folder: action.payload.current_folder,
                folders: action.payload.folders,
                files: action.payload.files
            }
        case CLEAR_ITEM:
            return {
                ...state,
                current_folder: null,
                folders: null,
                files: null
            }
        default:
            return state;
    }
}