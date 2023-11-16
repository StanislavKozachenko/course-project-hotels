import React from 'react';
import './DeleteRoomItem.module.scss'
import {Link} from "react-router-dom";
import axios from "axios";

const DeleteRoomItem = ({
                            id,
                            hotel,
                            cost,
                            room_number,
                            type,
                            view_from_window,
                            balcony
                        }) => {
    function onDeleteHandler() {
            if (document.getElementById('checkbox-' + id).checked) {
                axios.delete(`http://localhost:8000/api/room/${id}`).then((data) => {console.log(data);alert("Успешно!")});
            } else {
                alert('Необходимо выбрать элемент!');
            }
    }

    return (
        <>
            <tr className="hotel">
                <td>
                    <input
                        className="input input-menu"
                        type="checkbox"
                        name="value"
                        id={'checkbox-' + id}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={id}></input>
                </td>
                <td>
                    <Link to={`/hotel/${hotel.id}/rooms`}>
                        <input className="input input-menu input-hotel-check" name="value" value={hotel.name}/>
                    </Link>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={cost}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={room_number}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value"
                           value={type === "1" ? "Одноместный" : type === "2" ? "Двухместный" : "Многоместный"}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value"
                           value={view_from_window !== '' ? view_from_window : 'Нет данных'}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={balcony ? 'Есть' : 'Нет'}></input>
                </td>
                <td>
                    <button
                        type="submit"
                        className="saveBtn"
                        id={'save-' + id}
                        onClick={onDeleteHandler}>
                        Удалить
                    </button>
                </td>
            </tr>
        </>
    );
};

export default DeleteRoomItem;