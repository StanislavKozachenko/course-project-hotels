import React, {useEffect, useState} from 'react';
import './ShowRoomItem.module.scss'
import {Link} from "react-router-dom";
import {addItem} from "../../Redux/slices/cartSlice";
import {useDispatch} from "react-redux";
const ShowRoomItem = (
    {
        id,
        cost,
        hotel,
        room_number,
        type,
        view_from_window,
        status
    }
    ) => {
    const dispatch = useDispatch();
    const [openedStatus, setOpenedStatus] = useState(true);
    const onClickAdd = () => {
        const item = {
            id,
            price: cost,
            hotel,
            room_number,
            type,
            status
        };
        dispatch(addItem(item));
    };
    useEffect(()=>{
        if(status) {
            setOpenedStatus(true);
        } else {
            setOpenedStatus(false);
        }
    }, [openedStatus])
    return (
        <div className="roomItem">
            <div className="roomItemContent">
                <div className="roomItemContent__info">
                    <div>Отель: <strong>{hotel.name}</strong></div>
                    <div>Номер комнаты: <strong>{room_number}</strong></div>
                    <div>Тип: <strong>{type === "1" ? "Одноместный" : type === "2" ? "Двухместный" : "Многоместный"}</strong></div>
                    <div>Стоимость за день: <strong>{cost}</strong>$</div>
                    {view_from_window !== "" ? <li>Вид: <strong>{view_from_window}</strong></li> : ''}
                </div>
                <div className="roomItemContent__book">
                    <button disabled={openedStatus} onClick={onClickAdd} className={openedStatus ?"bookRoom--btn button booked" : "bookRoom--btn button"}>{openedStatus ? "Забронировано" : "Забронировать"}</button>
                </div>
            </div>
        </div>
    );
};

export default ShowRoomItem;