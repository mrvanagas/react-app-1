import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE,
  LOCATION_FORM_RESET,
  DELETE_LOCATION_FAILURE,
  EDIT_LOCATION,
  EDIT_LOCATION_CANCEL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
} from './actionTypes';
const initialState = {
  loading: false,
  data: [],
  errorMsg: null,
  formSubmitSuccess: false,
  locationSubmitErrorMsg: null,
  editedLocation: null,
};

const reducer = (state = initialState, action) => {
  // Klaidų pašalinimas prieš kitą veiksmą.
  const newState = { ...state };
  newState.errorMsg = null;
  newState.locationSubmitErrorMsg = null;

  switch (action.type) {
    case FETCH_LOCATIONS:
      return {
        ...newState,
        loading: true
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...newState,
        loading: false,
        data: action.payload.data,
        errorMsg: null
      };
    case FETCH_LOCATIONS_FAILURE:
      return {
        ...newState,
        loading: false,
        errorMsg: action.payload.errorMsg
      }
    case CREATE_LOCATION_SUCCESS:
      return {
        ...newState,
        formSubmitSuccess: true,
        locationSubmitErrorMsg: null,
      }
    case CREATE_LOCATION_FAILURE:
      return {
        ...newState,
        locationSubmitErrorMsg: action.payload.locationSubmitErrorMsg
      }
    case LOCATION_FORM_RESET:
      return {
        ...newState,
        formSubmitSuccess: false,
      }
    case DELETE_LOCATION_FAILURE:
      return {
        ...newState,
        errorMsg: action.payload.errorMsg
      }
    case EDIT_LOCATION:
      return {
        ...newState,
        editedLocation: action.payload.editedLocation
      }
    case EDIT_LOCATION_CANCEL:
      return {
        ...newState,
        editedLocation: null
      }
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...newState,
        formSubmitSuccess: true,
        locationSubmitErrorMsg: null,
        editedLocation: null
      }
    case UPDATE_LOCATION_FAILURE:
      return {
        ...newState,
        locationSubmitErrorMsg: action.payload.locationSubmitErrorMsg
      }
    default: return newState;
  }
}

export default reducer;