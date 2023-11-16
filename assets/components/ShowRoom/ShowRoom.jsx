import React from 'react';
import './ShowRoom.module.scss';
import ShowRoomItem from "../ShowRoomItem/ShowRoomItem";
import {Link} from "react-router-dom";
const ShowRoom = ({rooms}) => {
    return (
        <div className="roomsMain">
            {rooms.map((obj) => <ShowRoomItem key={obj.id} {...obj} />)}
        </div>
    );
};

export default ShowRoom;