import React, {useContext, useEffect, useRef, useState} from 'react';
import Cookies from 'universal-cookie';
import {SessionContext} from "../Main";
import axios from "axios";
import Admin from "./Admin";

export default function AuthPage() {
  const cookies = new Cookies();
  const passRef = useRef();
  const emailRef = useRef();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { sessionValue, setSessionValue } = useContext(SessionContext);

  const authUser = () => {
    let formData = new FormData();
    formData.append('email', emailRef.current.value);
    formData.append('password', passRef.current.value);
    return axios({
      method: "post",
      url: "//localhost:8000/api/user/auth",
      data: formData,
      headers: {"Content-Type": "multipart/form-data"},
    });
  };
  const regUser = () => {
    let formData = new FormData();
    formData.append('email', emailRef.current.value);
    formData.append('password', passRef.current.value);
    return axios({
      method: "post",
      url: "//localhost:8000/api/user",
      data: formData,
      headers: {"Content-Type": "multipart/form-data"},
    });
  };
  const checkIfUserExist = async () => {
    let result = await authUser();
    if (result.status === 200) {
      cookies.set('user', result.data.email + ' ' + result.data.name + ' ' + result.data.email, { path: '/' });
      setSessionValue(result.data);
      setIsAuthorized(true);
    } else if (result.status === 204) {
      alert("No user found!");
    } else if (result.status === 403) {
      alert("Wrong credentials!");
    }
  };
  const regNewUser = async () => {
    let result = await regUser();
    if (result.status === 200) {
      cookies.set('user', result.data.email + ' ' + result.data.name + ' ' + result.data.email, { path: '/' });
      setSessionValue(result.data);
      setIsAuthorized(true);
    } else {
      alert("Error");
    }
  }
  const onExitHandler = () => {
    cookies.remove('user');
    setSessionValue('No user');
    setIsAuthorized(false);
  };
  useEffect(() => {}, [isAuthorized]);
  return (
    <div className="container">
      {!cookies.get('user') ? (
        <div className="auth__content auth">
          <span className="auth__title">Авторизация</span>
          <input
            type="email"
            placeholder="Почта"
            className="auth__input"
            name="email"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Пароль"
            ref={passRef}
            className="auth__input"
            name="password"
          />
          <div className="auth__buttons">
            <button className="auth__buttons--btn" onClick={checkIfUserExist}>
              Войти
            </button>
            <button className="auth__buttons--btn" onClick={regNewUser}>Зарегистрироваться</button>
          </div>
        </div>
      ) : (
        <div className="auth__success">
          <span>
            Добро пожаловать, {cookies.get('user').split(' ')[1]}!
          </span>
          <div>
            <button className="auth__exit" onClick={onExitHandler}>
              Выйти
            </button>
          </div>
          <Admin />
        </div>
      )}
    </div>
  );
}
