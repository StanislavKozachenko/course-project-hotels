import React, {useContext} from 'react';
import './DeleteRoom.module.scss'
import {AdminContext} from "../../../pages/Admin";
import DeleteRoomItem from "../DeleteRoomItem/DeleteRoomItem";
const DeleteRoom = () => {
    const { rooms, roomsStatus } = useContext(AdminContext);
    return (
        <div className="main">
            <table className="show" cellSpacing="12">
                <tbody>
                <tr className="list">
                    <th>#</th>
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
                    : rooms.map((obj) => <DeleteRoomItem key={obj.id} {...obj} />)}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteRoom;