import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE,
  CREATE_LOCATION_RESET
} from './actionTypes';
const initialState = {
  loading: false,
  data: [],
  errorMsg: null,
  locationCreated: false,
  createErrorMsg: null
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
        createErrorMsg: false
      }

    default: return state;
  }
}

export default reducer;