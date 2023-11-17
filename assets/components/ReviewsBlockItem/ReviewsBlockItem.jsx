import React from 'react';
import './ReviewsBlockItem.module.scss'
import {Link} from "react-router-dom";

const ReviewsBlockItem = ({id, review_date, client, hotel, review_text, rating}) => {
    return (
        <div className="report--item">
            <ul>
                <li className="report--item-content">{new Date(review_date).toLocaleString()}</li>
                <li className="report--item-content report--item-font"><b>Пользователь: </b>{client.name}</li>
                <li className="report--item-content report--item-font report--item-hotel">
                    <Link to={`/hotel/${hotel.id}/rooms`}>
                        <b>Отель: </b>{hotel.name}
                    </Link>
                </li>
                <li className="report--item-content"><b>Описание: </b>{review_text}</li>
                <li className="report--item-content"><b>Оценка:</b> {rating} <icon>⭐</icon></li>
            </ul>
        </div>
    );
};

export default ReviewsBlockItem;