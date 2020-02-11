import {FETCH_MASSAGE_DATE_SUCCESS, FETCH_MESSAGE_SUCCESS, POST_MESSAGE_SUCCESS} from "../actions/actions";

const initialState = {
  messages: [],
  dateMessages: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGE_SUCCESS:
            return {...state, messages: action.message};
        case POST_MESSAGE_SUCCESS:
            return {...state, messages: action.message};
        case FETCH_MASSAGE_DATE_SUCCESS:
            return {...state, dateMessages: action.date};
        default:
            return state;
    }
};

export default reducer;