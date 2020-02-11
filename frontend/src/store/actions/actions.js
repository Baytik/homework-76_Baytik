import axiosAPI from "../../axiosAPI";

export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MASSAGE_DATE_SUCCESS = 'FETCH_MASSAGE_DATE_SUCCESS';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';

export const fetchMessageSuccess = (message) => ({type: FETCH_MESSAGE_SUCCESS, message});
export const fetchMessageDateSuccess = (message) => ({type: FETCH_MASSAGE_DATE_SUCCESS, message});
export const postMessageSuccess = (message) => ({type: POST_MESSAGE_SUCCESS, message});
export const postMessageError = (error) => ({type: POST_MESSAGE_ERROR, error});

export const fetchMessage = (message) => {
  return async (dispatch) => {
      const response = await axiosAPI.get('/messages', message);
      dispatch(fetchMessageSuccess(response.data))
  }
};

export const fetchMessageDate = (date) => {
  return async (dispatch) => {
      const response = await axiosAPI.get(`/messages?datetime=${date}`);
      dispatch(fetchMessageDateSuccess(response.data))
  }
};

export const postMessage = (message) => {
    return async dispatch => {
        try {
            const response = await axiosAPI.post('/messages', message);
            dispatch(postMessageSuccess(response.data))
        }catch (error) {
            dispatch(postMessageError(error))
        }
    }
};

