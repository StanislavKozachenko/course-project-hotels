import React from 'react';
import './Report.module.scss';
import ReactPDF, {PDFViewer} from '@react-pdf/renderer';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';
import {fetchDateOrders} from '../../../Redux/slices/ordersSlice';
import PDFHandler from '../../../Service/PDF/PDFHandler';

export default function Report() {
    let curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substring(0, 10);
    const [enableReport, setEnableReport] = useState(false);
    const [dateFrom, setDateFrom] = useState(date);
    const [dateTo, setDateTo] = useState(date);
    const [pages, setPages] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getOrders();
        setEnableReport(false);
    }, [dateFrom, dateTo]);
    useEffect(() => {
    }, [enableReport]);
    const onSubmitHandler = () => {
        setEnableReport(true);
        getOrders();
    };
    const getOrders = async () => {
        dispatch(fetchDateOrders({dateFrom, dateTo}));
    };

    const {reportOrders, reportOrdersStatus} = useSelector((state) => state.orders);
    useEffect(() => {
        console.log(reportOrders)
    }, [reportOrders])
    return (
        <div>
            <div className="main report-main">
                <span>Введите период:</span>
                <input
                    type="date"
                    id="dateFrom"
                    defaultValue={date}
                    onChange={(event) => setDateFrom(event.target.value)}
                />
                <input
                    type="date"
                    id="dateTo"
                    defaultValue={date}
                    onChange={(event) => setDateTo(event.target.value)}
                />
            </div>
            <div className="reportHandler">
                {enableReport ? (
                    reportOrdersStatus === 'success' ? (
                        <PDFViewer>
                            <PDFHandler
                                orders={reportOrders}
                                isSave={false}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                            />
                        </PDFViewer>
                    ) : reportOrdersStatus === 'loading' ? (<span>
              Загрузка...
            </span>) : (
                        <span>
              Нет заказов! <icon>😕</icon>
            </span>
                    )
                ) : (
                    <button className="auth__exit" onClick={onSubmitHandler}>
                        Сформировать
                    </button>
                )}
            </div>
        </div>
    );
}
