import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
import { login, loginSuccess } from "../../store/actions/users";
import { useMutation } from "react-query";
import { useDispatch } from 'react-redux';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { mutate, isLoading, data, error } = useCustomMutation();

  const submit = async (data: LoginPageProps["data"]) => {
    await mutate(data);
  };

  useEffect(() => {
    if (data && data.token) {
      dispatch(loginSuccess(data));
      localStorage.setItem('token', data.token);
      history.push("/students");
    }
  }, [data])
  return (
    <div>
      <LoginForm submit={submit} loading={isLoading} error={error} />
    </div>
  );
};

export const useCustomMutation = () => {
  const { mutate, isLoading, data, error, isSuccess } = useMutation(login);
  return { mutate, isLoading, data, error, isSuccess };
};

export default LoginPage;
