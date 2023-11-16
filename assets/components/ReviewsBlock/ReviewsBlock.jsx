import React, {useEffect} from 'react';
import './ReviewsBlock.module.scss'
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchReviews} from "../../Redux/slices/reviewsSlice";
import ReviewsBlockItem from "../ReviewsBlockItem/ReviewsBlockItem";

const ReviewsBlock = ({id}) => {
    const dispatch = useDispatch();
    const {reviews, reviewsStatus} = useSelector((state) => state.reviews);
    const getReviews = async () => {
        console.log(id);
        if(id) {
            dispatch(fetchReviews({id}));
        }
    }
    useEffect(() => {
        getReviews();
    }, [])
    return (
        <div className="reviews-block">
            <span>Отзывы:</span><br/>
            {reviewsStatus === 'loading' ? (
                <div>
                    Загрузка...
                </div>
            ) : reviewsStatus === 'error' ? (
                <div>
                    Нет отзывов.
                </div>
            ) : (
                <div className="roomsMain">
                    {reviews.map((obj) => <ReviewsBlockItem key={obj.id} {...obj} />)}
                </div>
            )}
        </div>

    );
};

export default ReviewsBlock;