import api from "../../utils/api.util";
import { LOGIN_USER_SUCCESS, LOG_OUT_USER } from '../constants';

export const login = async (content: any) => {
  const endpoint = "/api/user/login";
  const { data } = await api.post(endpoint, { ...content });
  return data;
};

export const loginSuccess = (payload: any) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload,
  }
}

export const logoutUser = () => {
  return {
    type: LOG_OUT_USER,
  }
}
