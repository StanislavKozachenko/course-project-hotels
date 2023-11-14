import React, {useEffect, useRef, useState} from 'react';
import styles from './BuyBlock.module.scss';
import Cookies from 'universal-cookie';
import AuthPage from '../../pages/Auth';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {current} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {clearItems} from "../../Redux/slices/cartSlice";

export default function BuyBlock({items, totalPrice, setIsBuying, isBuying}) {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const in_time_ref = useRef([]);
    const out_time_ref = useRef([]);
    const [id, setId] = useState(false);
    console.log(items);
    useEffect(() => {
        let value = cookies.get('user');
        if (value) {
            setId(true);
        }
    }, []);

    function buy() {
        let bodyFormData = new FormData();
        bodyFormData.append('total_cost', totalPrice);
        bodyFormData.append('status', 'pending');
        bodyFormData.append('client_id', cookies.get('user').split(' ')[2]);
        bodyFormData.append('check_in_date', new Date(Date.now()).toISOString());
        bodyFormData.append('check_out_date', new Date(Date.now() + 12096e5).toISOString());
        items.forEach((item, index) => {
            if (in_time_ref.current[index].value === '' || in_time_ref.current[index].value === in_time_ref.current[index].value.defaultValue) {
                bodyFormData.set('check_in_date', new Date(Date.now()).toISOString());
            } else {
                bodyFormData.set('check_in_date', in_time_ref.current[index].value);
            }
            if (out_time_ref.current[index].value === '' || out_time_ref.current[index].value === out_time_ref.current[index].value.defaultValue) {
                bodyFormData.set('check_out_date', new Date(Date.now() + 12096e5).toISOString());
            } else {
                bodyFormData.set('check_out_date', out_time_ref.current[index].value);
            }
            bodyFormData.set('total_cost', Number.parseFloat((item.price * item.count)));
            bodyFormData.set('room_id', parseFloat(item.id));

            axios({
                method: "post",
                url: "//localhost:8000/api/reservation",
                data: bodyFormData,
                headers: {"Content-Type": "multipart/form-data"},
            }).then(function (response) {
                //handle success
                alert('Заказ оформлен успешно!');
                dispatch(clearItems());
                setIsBuying(false);
                console.log(response);
            }).catch((reason)=>{
                console.log(reason);
            })
        });
    }

    return (
        <div className="container">
            {
                items.map((item, index) => {
                    return (
                        <div className="check-date-inputs">
                            <div className="input-p">Отель: <strong>{item.hotel.name}</strong>, Номер
                                комнаты: <strong>{item.room_number}</strong></div>
                            <div className="check-date-input">
                                <label htmlFor="check-in-date-input">С:</label>
                                <input key={index} ref={el=>in_time_ref.current[index] = el} type="datetime-local" className="check-in-date-input"
                                       id={`check-in-date-input-${index}`}/>
                            </div>
                            <div className="check-date-input">
                                <label htmlFor="check-out-date-input">По:</label>
                                <input key={index} ref={el=>out_time_ref.current[index] = el} type="datetime-local" className="check-out-date-input"
                                       id={`check-out-date-input-${index}`}/>
                            </div>
                        </div>
                    )
                })
            }
            {id ? (
                <div>
                    <h3 className="submit-h3">Для подтверждения нажмите на кнопку</h3>
                    <div className="cart__bottom-buttons" onClick={() => buy()}>
                        <button className="button button--outline button--add">Подтвердить заказ</button>
                    </div>
                </div>
            ) : (
                <div>
                    Необходима авторизация!
                    <div className="cart__bottom-buttons">
                        <Link to="/auth" className="button button--outline button--add">
                            <span>Войти</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
