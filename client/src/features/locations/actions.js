import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE,
  CREATE_LOCATION_RESET
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

export const createLocation = (formData) => async (dispatch) => { // 11:00
  try {
    await axios.post('http://localhost:5000/api/locations', formData);
    dispatch({ type: CREATE_LOCATION_SUCCESS });
    dispatch(fetchLocations());
  } catch (err) {
    dispatch({ type: CREATE_LOCATION_FAILURE, payload: { createErrorMsg: err.response.data.message } });
  }
}

export const createLocationReset = { type: CREATE_LOCATION_RESET };