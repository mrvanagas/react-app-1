import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE,
  CREATE_LOCATION_RESET,
  DELETE_LOCATION_FAILURE,
  EDIT_LOCATION,
  EDIT_LOCATION_CANCEL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
} from './actionTypes';
import axios from 'axios';
import { formatResponseErrorMsg } from '../../utils/errorFormat';

export const fetchLocations = () => async (dispatch) => {
  dispatch({ type: FETCH_LOCATIONS });
  try {
    const { data } = await axios.get('http://localhost:5000/api/locations');
    dispatch({ type: FETCH_LOCATIONS_SUCCESS, payload: { data: data.locations } });
  } catch (err) {
    dispatch({ type: FETCH_LOCATIONS_FAILURE, payload: { errorMsg: formatResponseErrorMsg(err) } });
  }
}

export const createLocation = (formData) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/locations', formData);
    dispatch({ type: CREATE_LOCATION_SUCCESS });
    dispatch(fetchLocations());
  } catch (err) {
    dispatch({ type: CREATE_LOCATION_FAILURE, payload: { createErrorMsg: formatResponseErrorMsg(err) } });
  }
}

export const deleteLocation = (id) => async (dispatch) => {
  try {
    await axios.delete('http://localhost:5000/api/locations/' + id);
    dispatch(fetchLocations());
  } catch (err) {
    dispatch({ type: DELETE_LOCATION_FAILURE, payload: { errorMsg: formatResponseErrorMsg(err) } });
  }
}

export const editLocation = (editedLocation) => {
  return {
    type: EDIT_LOCATION,
    payload: { editedLocation }
  }
}

export const updateLocation = (id, title) => async (dispatch) => {
  try {
    await axios.put('http://localhost:5000/api/locations/' + id + 77, { title });
    dispatch({ type: UPDATE_LOCATION_SUCCESS });
    dispatch(fetchLocations());
  } catch (err) {
    dispatch({ type: UPDATE_LOCATION_FAILURE, payload: { createErrorMsg: formatResponseErrorMsg(err) } });
  }
}

export const cancelLocationEdit = { type: EDIT_LOCATION_CANCEL };

export const createLocationReset = { type: CREATE_LOCATION_RESET };
