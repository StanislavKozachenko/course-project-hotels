import React from 'react';
import styles from './PurchaseBlock.module.scss';
import axios from 'axios';
import validator from 'validator';
import {useRef} from 'react';

export default function PurchaseBlock({order, setOrderId}) {
    const cartNumberRef = useRef();
    const cartCVVRef = useRef();

    function purchaseHandler(order) {
        if (validator.isCreditCard(cartNumberRef.current.value) && cartCVVRef.current.value !== '') {
            axios
                .put(`//localhost:8000/api/reservation/${order.id}`)
                .then((data) => {
                    console.log(data);
                    alert('Успешно!');
                    setOrderId(0)
                }).catch(reason => {
                  console.log(reason);
            })
        } else {
            alert('Ошибочные данные!');
        }
    }

    return (
        <>
            <div className="auth">
                <h2 className="auth__text purchase-text">Заказ №{order.id}</h2>
                <input
                    ref={cartNumberRef}
                    type="number"
                    placeholder="Номер карты"
                    className="auth__input"
                    name="number"
                />
                <input
                    type="password"
                    placeholder="CVV"
                    className="auth__input"
                    name="cvv"
                    maxLength={3}
                    ref={cartCVVRef}
                    minLength={3}
                />
                <button className="auth__buttons--btn" onClick={() => purchaseHandler(order)}>
                    Оплатить
                </button>
            </div>
        </>
    );
}
