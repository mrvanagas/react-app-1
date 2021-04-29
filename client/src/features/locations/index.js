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
const initialState = {
  loading: false,
  data: [],
  errorMsg: null,
  locationCreated: false,
  createErrorMsg: null,
  editedLocation: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return {
        ...state,
        loading: true
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        errorMsg: null
      };
    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg
      }
    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        createErrorMsg: null,
        locationCreated: true
      }
    case CREATE_LOCATION_FAILURE:
      return {
        ...state,
        locationCreated: false,
        createErrorMsg: action.payload.createErrorMsg
      }
    case CREATE_LOCATION_RESET:
      return {
        ...state,
        locationCreated: false,
        createErrorMsg: null
      }
    case DELETE_LOCATION_FAILURE:
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    case EDIT_LOCATION:
      return {
        ...state,
        editedLocation: action.payload.editedLocation
      }
    case EDIT_LOCATION_CANCEL:
      return {
        ...state,
        editedLocation: null
      }
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        createErrorMsg: null,
        editedLocation: null
      }
    case UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        createErrorMsg: action.payload.createErrorMsg
      }
    default: return state;
  }
}

export default reducer;