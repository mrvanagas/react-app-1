import axios from 'axios';
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
import API from '../../API';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN });
  try {
    const data = await API.login({ email, password });
    dispatch({ type: AUTH_LOGIN_SUCCCESS, payload: { user: data } })
  } catch (err) {
    dispatch({ type: AUTH_LOGIN_FAILURE, payload: { loginErr: err } })
  }
}

export const authenticate = () => async (dispatch) => {
  try {
    const data = await API.authenticate();
    dispatch({ type: AUTHENTICATE_SUCCESS, payload: { user: data }})
  } catch (err) {
    dispatch({ type: AUTHENTICATE_FAILURE })
  }
}

export const redirectAfterLogin = { type: REDIRECT_AFTER_LOGIN };
