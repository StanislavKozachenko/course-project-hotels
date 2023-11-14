import React, {useEffect, useRef} from 'react';
import './ShowOrdersItem.module.scss';
import {UserContext} from '../../pages/User';
import {AdminContext} from '../../pages/Admin';
import {useState} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import PDFHandler from '../../Service/PDF/PDFHandler';
import QRCode from 'react-qr-code';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeOrderItem} from "../../Redux/slices/ordersSlice";
import axios from "axios";

export default function ShowOrdersItem({
                                           setOrderId,
                                           context,
                                           key,
                                           id,
                                           total_cost,
                                           status,
                                           check_in_date,
                                           check_out_date,
                                           client,
                                           room,
                                       }) {
    const reportOrder = [
        {
            id: id,
            total_cost: total_cost,
            status: status,
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            client: client,
            room: room,
        },
    ];
    const dispatch = useDispatch();
    const [isSaveable, setIsSaveable] = useState(false);
    const modal = useRef()
    const [showModal, setShowModal] = useState(true);
    useOnClickOutside(modal, () => setShowModal(false));
    function useOnClickOutside(ref, handler) {
        useEffect(
            () => {
                const listener = (event) => {
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            [ref, handler]
        );
    }
    function onBuyHandler(id) {
        setOrderId(id);
    }

    function onSaveHandler() {
        setIsSaveable(true);
        setShowModal(true);
    }

    function onModalClose() {
        modal.current.op
    }

    function onRemoveHandler(id) {
        axios
            .delete(`//localhost:8000/api/reservation/${id}/remove`)
            .then((data) => {
                console.log(data);
                dispatch(removeOrderItem(id));
                alert('Успешно!');
                setOrderId(0)
            }).catch(reason => {
            console.log(reason);
        })
    }

    return (
        <>
            <tr className="order">
                <td>
                    <input className="input input-menu" name="value" value={id}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={parseFloat(total_cost).toFixed(2)}></input>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="value"
                        value={status === 'pending' ? 'Не оплачено' : status === 'success' ? 'Оплачено' : 'Ошибка'}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={new Date(check_in_date).toLocaleDateString()}></input>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={new Date(check_out_date).toLocaleDateString()}></input>
                </td>
                <td>
                    <Link to={`/hotel/${room.hotel.id}/rooms`}>
                        <input className="input input-menu input-hotel-check" name="value" value={room.hotel.name}/>
                    </Link>
                </td>
                <td>
                    <input className="input input-menu" name="value" value={room.roomNumber}></input>
                </td>
                <td>
                    {context === UserContext && status === 'pending' ? (

                        <button
                            type="submit"
                            className="saveBtn"
                            id={'buy-' + id}
                            onClick={() => onBuyHandler(id)}>
                            Оплатить
                        </button>
                    ) : context === AdminContext ? (
                        <input className="input" name="value" value={client.id}></input>
                    ) : (
                        <button
                            type="submit"
                            className="saveBtn"
                            id={'save-' + id}
                            onClick={() => onSaveHandler(id)}>
                            Сохранить
                        </button>
                    )}
                </td>
                <td>
                    <button
                        type="submit"
                        className="saveBtn"
                        id={'remove-' + id}
                        onClick={() => onRemoveHandler(id)}>
                        Отменить
                    </button>
                </td>
            </tr>
            {isSaveable ? (
                <dialog id="modal" className="modal" ref={modal} open={showModal}>
                    <p>PDF | QR</p>
                    <div className="info">
                        <PDFViewer className="report">
                            <PDFHandler
                                orders={reportOrder}
                                isSave={true}
                                dateFrom={new Date(check_in_date).toLocaleDateString()}
                                dateTo={new Date(check_out_date).toLocaleDateString()}
                            />
                        </PDFViewer>
                        <QRCode
                            className="QR"
                            size={256}
                            style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                            value={`
            Order ID:
            ${reportOrder[0].id}\n
            Client Name:
            ${reportOrder[0].client.name}\n
            Date from: 
            ${new Date(reportOrder[0].check_in_date).toLocaleDateString()}\n 
            Date to: 
            ${new Date(reportOrder[0].check_out_date).toLocaleDateString()}\n
            Total cost:
            ${reportOrder[0].total_cost}\n
            Status:
            ${reportOrder[0].status === 'success' ? 'Paid' : 'Awaiting payment'}`}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </dialog>
            ) : (
                ''
            )}
        </>
    );
}
