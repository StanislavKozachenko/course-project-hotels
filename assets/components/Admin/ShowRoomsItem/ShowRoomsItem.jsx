import React from 'react';
import './ShowRoomsItem.module.scss'
import {Link} from "react-router-dom";
const ShowRoomsItem = ( {id,
                        hotel,
                        cost,
                        room_number,
                        type,
                        view_from_window,
                        balcony}) => {
    return (
        <>
            <tr className="hotel">
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
                    <input className="input input-menu" name="value" value={type === "1" ? "Одноместный" : type === "2" ? "Двухместный" : "Многоместный"}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={view_from_window !== '' ? view_from_window : 'Нет данных'}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={balcony ? 'Есть' : 'Нет'}></input>
                </td>
            </tr>
        </>
    );
};

export default ShowRoomsItem;