import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCCESS,
  AUTH_LOGIN_FAILURE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  REDIRECT_AFTER_LOGIN,
} from './actionTypes';

const defaultRouteAfterLoginSuccess = '/manage-locations';
const initialState = {
  user: {
    email: null,
    role: null
  },
  loginErr: null,
  registerErr: null,
  loginLoading: false,
  loggedIn: false,
  routeAfterLogin: defaultRouteAfterLoginSuccess,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.loginErr = null;
  newState.registerErr = null;

  switch (action.type) {

    case AUTH_LOGIN:
      return {
        ...newState,
        loginLoading: true,
      };

    case AUTH_LOGIN_SUCCCESS:
    case AUTHENTICATE_SUCCESS:
      return {
        ...newState,
        loginLoading: false,
        loggedIn: true,
        user: action.payload.user
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...newState,
        loginLoading: false,
        loginErr: action.payload.loginErr
      };

    case AUTHENTICATE_FAILURE:
      return {
        ...newState,
        user: null,
        loggedIn: false,
      };

    case REDIRECT_AFTER_LOGIN:
      return {
        ...newState,
        routeAfterLogin: defaultRouteAfterLoginSuccess,
        loggedIn: false,
      }

    default:
      return state;
  }
}

export default reducer;