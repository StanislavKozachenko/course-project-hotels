import React, {useContext} from 'react';
import './EditRoom.module.scss'
import {AdminContext} from "../../../pages/Admin";
import EditRoomItem from "../EditRoomItem/EditRoomItem";
const EditRoom = () => {
    const { rooms, roomsStatus } = useContext(AdminContext);
    return (
        <>
            <div className="main">
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
                        : rooms.map((obj) => <EditRoomItem key={obj.id} {...obj} />)}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EditRoom;