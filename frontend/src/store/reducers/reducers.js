import {FETCH_MESSAGE_SUCCESS, POST_MESSAGE_SUCCESS} from "../actions/actions";

const initialState = {
  messages: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGE_SUCCESS:
            return {...state, messages: action.message};
        case POST_MESSAGE_SUCCESS:
            return {...state, messages: action.message};
        default:
            return state;
    }
};

export default reducer;