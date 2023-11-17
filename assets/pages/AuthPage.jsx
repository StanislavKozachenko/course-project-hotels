import React, {useContext, useEffect, useRef, useState} from 'react';
import Cookies from 'universal-cookie';
import {SessionContext} from "../Main";
import axios from "axios";
import Admin from "./Admin";
import User from "./User";
import CryptoJS from "crypto-js";

export default function AuthPage() {
  const CryptoJS = require("crypto-js");
  const cookies = new Cookies();
  const passRef = useRef();
  const emailRef = useRef();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [role, setRole] = useState('');
  const { sessionValue, setSessionValue } = useContext(SessionContext);

  useEffect(()=>{
    if(cookies.get('user')) {
      if (cookies.get('user').split(' ')[3] !== null) {
        setRole(cookies.get('user').split(' ')[3]);
      }
    }
  }, [])

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
    let role = CryptoJS.AES.encrypt(JSON.stringify(result.data.role), 'Generic').toString();
    setRole(role);
    if (result.status === 200) {
      cookies.set('user', result.data.email + ' ' + result.data.name + ' ' + result.data.id + ' ' + role, { path: '/' });
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
    let role = CryptoJS.AES.encrypt(result.data.role, 'Generic').toString();
    setRole(role);
    if (result.status === 200) {
      cookies.set('user', result.data.email + ' ' + result.data.name + ' ' + result.data.id + ' ' + role , { path: '/' });
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
  useEffect(() => {}, [isAuthorized, role]);
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
          <div className="leftButton">
            <button className="auth__exit" onClick={onExitHandler}>
              Выйти
            </button>
          </div>
          {"admin".toString() === CryptoJS.AES.decrypt(role, 'Generic').toString(CryptoJS.enc.Utf8).replace(/"/g, '') ? <Admin /> : <User />}
        </div>
      )}
    </div>
  );
}
