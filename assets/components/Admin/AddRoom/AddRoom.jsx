import React, {useState} from 'react';
import './AddRoom.module.scss'
import axios from "axios";
import {useSelector} from "react-redux";

const AddRoom = () => {
    const [isCorrect, setIsCorrect] = useState(true);
    const {hotels, hotelsStatus} = useSelector((state) => state.hotels);
    const categoryTypes = {
        1: 'Одноместный',
        2: 'Двухместный',
        3: 'Многоместный'
    };

    function getValue(name) {
        let result = false;
        if (name === 'balcony') {
            result = document.getElementById(name).checked;
        } else {
            if (document.getElementById(name).value) {
                result = document.getElementById(name).value;
            } else {
                name === 'view_from_window' ? result = '' : alert('Данные неверны.');
                setIsCorrect(false);
            }
        }
        return result;
    }

    function onAddHandler(event) {
        if (isCorrect) {
            event.preventDefault();
            const formDataReq = new FormData();
            const fields = ['hotel', 'cost', 'room_number', 'type', 'view_from_window', 'balcony'];

            fields.forEach(field => {
                const value = getValue(field);
                if (field === 'hotel') {
                    formDataReq.append('hotel_id', value)
                } else if (field === 'balcony') {
                    value ? formDataReq.append(field, true) : formDataReq.append(field, false);
                } else {
                    if (value) {
                        formDataReq.append(field, value);
                    }
                }
            });
            console.log(formDataReq.get('balcony'));
            axios
                .post(`http://localhost:8000/api/room`, formDataReq)
                .then((data) => {
                    console.log(data);
                    alert("Успешно!")
                });
        }
    }

    return (
        <>
            {hotelsStatus === 'loading' ? 'Загрузка...' : <div className="main">
                <table className="show" cellSpacing="12">
                    <tbody>
                    <tr className="list">
                        <th>Отель</th>
                        <th>Цена</th>
                        <th>Номер</th>
                        <th>Тип</th>
                        <th>Вид из окна</th>
                        <th>Балкон</th>
                    </tr>
                    <tr className="book">
                        <td>
                            <select className="input input-menu" name="hotel" id="hotel">
                                {Object.entries(hotels).map(([key, value]) => (
                                    <option key={key} value={value.id}>
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                type={"number"}
                                className="input input-menu"
                                name="cost"
                                placeholder="Цена..."
                                id={'cost'}></input>
                        </td>
                        <td>
                            <input
                                className="input input-menu"
                                name="room_number"
                                placeholder="Порядковый номер..."
                                id={'room_number'}></input>
                        </td>
                        <td>
                            <select className="input input-menu" name="type" id="type">
                                {Object.entries(categoryTypes).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                className="input input-menu"
                                name="view_from_window"
                                placeholder="Вид из окна..."
                                id={'view_from_window'}></input>
                        </td>
                        <td>
                            <label htmlFor="balcony"></label>
                            <input
                                type={"checkbox"}
                                className="input input-menu"
                                name="balcony"
                                id={'balcony'}></input>
                        </td>
                        <td>
                            <button type="submit" className="saveBtn" id={'save'} onClick={onAddHandler}>
                                Добавить
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>}

        </>
    );
};

export default AddRoom;