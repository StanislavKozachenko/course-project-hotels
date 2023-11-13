import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import ShowRoom from "../components/ShowRoom/ShowRoom";

const Rooms = () => {
    const params = useParams();
    const [rooms, setRooms] = useState([]);
    const [status, setStatus] = useState('loading');
    const getRooms = async () => {

        const { data } = await axios.get(`//localhost:8000/api/hotel/${params.id}/rooms`
            //`https://63d554b90e7ae91a00ac4e8e.mockapi.io/items?page=${currentPage}&limit=4&${
            //   categoryId > 0 ? `category=${categoryId}` : ''
            //}&sortBy=${sortType.sort}&order=desc${search}`,
            // `http://localhost:8080/books/?category=${categoryId}&page=${currentPage}${search}&sortBy=${sortType.sort}`,
        );
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
    return (
        <div className="container">
            <div>
                {
                    status === 'loading'
                    ? "Загрузка..." : status === 'error'
                        ? <div>
                            Ошибка! Комнат нет! 😕
                            <br/>
                            <div className="back-to-main-button">
                                <Link to="/" className="back-to-main">На главную</Link>
                            </div>
                          </div>
                    : <ShowRoom rooms={rooms}/>
                }
            </div>

        </div>
    );
};

export default Rooms;