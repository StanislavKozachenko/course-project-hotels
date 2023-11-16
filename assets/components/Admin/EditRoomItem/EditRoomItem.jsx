import React from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

const EditRoomItem = ({
                          id,
                          hotel,
                          cost,
                          room_number,
                          type,
                          view_from_window,
                          balcony
                      }) => {
    const categoryTypes = {
        1: 'Одноместный',
        2: 'Двухместный',
        3: 'Многоместный'
    };
    const {hotels, hotelsStatus} = useSelector((state) => state.hotels);
    // function getValue(name) {
    //     let result;
    //     if (document.getElementById(name + '-' + id).value) {
    //         result = document.getElementById(name + '-' + id).value;
    //     } else {
    //         result = false;
    //     }
    //     return result;
    // }
    function getValue(name) {
        let result = false;
        if (name === 'balcony') {
            result = document.getElementById(name + '-' + id).checked;
        } else {
            if (document.getElementById(name + '-' + id).value) {
                result = document.getElementById(name + '-' + id).value;
            } else {
                name + '-' + id === 'view_from_window' ? result = '' : '';
            }
        }
        return result;
    }

    function onSaveHandler(event) {
        event.preventDefault();
        const id = event.target.id.split('-')[1];

        const formDataReq = {};
        const fields = ['hotel_id', 'cost', 'room_number', 'type', 'view_from_window', 'balcony'];

        fields.forEach(field => {
            const value = getValue(field);
            if(field === 'balcony') {
                formDataReq[field] = value
            } else {
                if (value) {
                    formDataReq[field] = value;
                }
            }
        });
        axios
            .put(`http://localhost:8000/api/room/${id}`, formDataReq)
            .then((data) => {
                console.log(data);
                alert("Успешно!")
        });
    }

    return (
        <>
            <tr className="book book-edit">
                <td>
                    <input className="input input-menu" name="id" value={id}></input>
                </td>
                <td>
                    <select className="input input-menu" name="hotel_id" id={'hotel_id-' + id}>
                        {Object.entries(hotels).map(([key, value]) => (
                            <option key={key} value={value.id} selected={value.id === hotel.id}>
                                {value.name}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="cost"
                        placeholder={cost}
                        id={'cost-' + id}></input>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="room_number"
                        placeholder={room_number}
                        id={'room_number-' + id}></input>
                </td>
                <td>
                    <select className="input input-menu" name="type" id={'type-' + id}>
                        {Object.entries(categoryTypes).map(([key, value]) => (
                            <option key={key} value={key} selected={key === type}>
                                {value}
                            </option>
                        ))}
                    </select>
                </td>

                <td>
                    <input
                        className="input input-menu"
                        name="view_from_window"
                        placeholder={view_from_window}
                        id={'view_from_window-' + id}></input>
                </td>
                <td>
                    <td>
                        <label htmlFor="balcony"></label>
                        <input
                            type={"checkbox"}
                            className="input input-menu"
                            name="balcony"
                            defaultChecked={balcony}
                            id={'balcony-' + id}></input>
                    </td>
                </td>
                <td>
                    <button
                        type="submit"
                        className="saveBtn"
                        id={'save-' + id}
                        onClick={onSaveHandler}>
                        Сохранить
                    </button>
                </td>
            </tr>
        </>
    );
};

export default EditRoomItem;