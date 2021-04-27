import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE
} from './actionTypes';
import axios from 'axios';

export const fetchLocations = () => async (dispatch) => {
  dispatch({ type: FETCH_LOCATIONS });
  try {
    const { data } = await axios.get('http://localhost:5000/api/locations');
    dispatch({ type: FETCH_LOCATIONS_SUCCESS, payload: { data: data.locations } });
  } catch ({ message }) {
    dispatch({ type: FETCH_LOCATIONS_FAILURE, payload: { errorMsg: message } });
  }
}