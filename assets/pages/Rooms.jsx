import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import ShowRoom from "../components/ShowRoom/ShowRoom";
import ReviewsBlock from "../components/ReviewsBlock/ReviewsBlock";
import Cookies from "universal-cookie";
import AddRoom from "../components/Admin/AddRoom/AddRoom";
import AddReview from "../components/AddReview/AddReview";

const Rooms = () => {
    const [isCorrect, setIsCorrect] = useState(true);
    const params = useParams();
    const [addReview, setAddReview] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [status, setStatus] = useState('loading');
    const cookies = new Cookies();
    const getRooms = async () => {

        const { data } = await axios.get(`//localhost:8000/api/hotel/${params.id}/rooms`);
        if (data.length === 0) {
            setStatus('error');
        } else {
            setRooms(data);
            setStatus('success');
        }
    }
    useEffect(() => {
        getRooms();
    }, []);
    function getValue(name) {
        let result = false;
        if (document.getElementById(name).value) {
            result = document.getElementById(name).value;
        } else {
            alert('Данные неверны.');
            setIsCorrect(false);
        }
        return result;
    }
    function onAddHandler(event) {
        if (isCorrect) {
            event.preventDefault();
            const formDataReq = new FormData();
            const fields = ['review_text', 'rating', 'client_id', 'hotel_id'];
            const client_id =  cookies.get('user').split(' ')[2];
            fields.forEach(field => {
                if(field === 'client_id') {
                    formDataReq.append(field, client_id);
                } else if (field === 'hotel_id') {
                    formDataReq.append(field, params.id);
                } else  {
                    const value = getValue(field);
                    if (value) {
                        formDataReq.append(field, value);
                    }
                }
            });
            axios
                .post(`http://localhost:8000/api/review`, formDataReq)
                .then((data) => {console.log(data);alert("Успешно!")});
        }
    }

    return (
        <div className="container">
            <div>
                {
                    status === 'loading'
                    ? "Загрузка..." : status === 'error'
                        ? <div>
                            Ошибка! Комнат нет! 😕
                            <br/>
                          </div>
                    : <ShowRoom rooms={rooms}/>
                }
            </div>
            <ReviewsBlock id={params.id}/>
            {addReview ? <AddReview onAddHandler={onAddHandler}/> : <button className="button button--add" onClick={()=>setAddReview(true)}>Добавить отзыв</button>}
            <div className="back-to-main-button">
                <Link to="/" className="back-to-main">На главную</Link>
            </div>
        </div>
    );
};

export default Rooms;