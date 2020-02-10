import axiosAPI from "../../axiosAPI";

export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';

export const fetchMessageSuccess = (message) => ({type: FETCH_MESSAGE_SUCCESS, message});

export const fetchMessage = (message) => {
  return async (dispatch) => {
      const response = await axiosAPI.get('/messages', message);
      dispatch(fetchMessageSuccess(response.data))
  }
};