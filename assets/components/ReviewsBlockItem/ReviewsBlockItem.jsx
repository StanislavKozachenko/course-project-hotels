import React from 'react';
import './ReviewsBlockItem.module.scss'

const ReviewsBlockItem = ({id, review_date, client, hotel, review_text, rating}) => {
    return (
        <div className="report--item">
            <ul>
                <li className="report--item-content report--item-id"># {id}</li>
                <li className="report--item-content">{review_date}</li>
                <li className="report--item-content">{client.name}</li>
                <li className="report--item-content">{hotel.name}</li>
                <li className="report--item-content">{review_text}</li>
                <li className="report--item-content">{rating}</li>
            </ul>
        </div>
    );
};

export default ReviewsBlockItem;