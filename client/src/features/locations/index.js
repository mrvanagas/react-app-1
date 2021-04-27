import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE
} from './actionTypes';
const initialState = {
  loading: false,
  data: [],
  errorMsg: null
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
    default: return state;
  }
}

export default reducer;