import React from 'react';
import './ShowRoom.module.scss';
import ShowRoomItem from "../ShowRoomItem/ShowRoomItem";
import {Link} from "react-router-dom";
const ShowRoom = ({rooms}) => {
    return (
        <div className="roomsMain">
            {rooms.map((obj) => <ShowRoomItem key={obj.id} {...obj} />)}
            <div className="back-to-main-button">
                <Link to="/" className="back-to-main">На главную</Link>
            </div>
        </div>
    );
};

export default ShowRoom;