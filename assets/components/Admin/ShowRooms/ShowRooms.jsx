import React, {useContext} from 'react';
import './ShowRooms.module.scss';
import {AdminContext} from "../../../pages/Admin";
import ShowRoomsItem from "../ShowRoomsItem/ShowRoomsItem";
const ShowRooms = () => {
    const { rooms, roomsStatus } = useContext(AdminContext);
    return (
        <div className="hotel-items-main">
            <table className="show" cellSpacing="12">
                <tbody>
                <tr className="list">
                    <th>ID</th>
                    <th>Название отеля</th>
                    <th>Цена</th>
                    <th>Номер</th>
                    <th>Тип</th>
                    <th>Вид из окна</th>
                    <th>Балкон</th>
                </tr>
                {roomsStatus === 'loading'
                    ? 'Loading...'
                    : rooms.map((obj) => <ShowRoomsItem key={obj.id} {...obj} />)}
                </tbody>
            </table>
        </div>
    );
};

export default ShowRooms;