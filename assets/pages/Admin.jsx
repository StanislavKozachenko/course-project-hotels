import React, { createContext, useEffect, useState } from 'react';
import ShowBlock from '../components/Admin/ShowBlock/ShowBlock';
import AddBlock from '../components/Admin/AddBlock/AddBlock';
import EditBlock from '../components/Admin/EditBlock/EditBlock';
import DeleteBlock from '../components/Admin/DeleteBlock/DeleteBlock';
import { fetchPublishers } from '../Redux/slices/publishersSlice';
import { fetchAuthors } from '../Redux/slices/authorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from '../Redux/slices/booksSlice';
import { fetchTransactions } from '../Redux/slices/transactionsSlice';
import { fetchOrders } from '../Redux/slices/ordersSlice';
import ShowOrders from '../components/ShowOrders/ShowOrders';
import ShowTransactions from '../components/Admin/ShowTransactions/ShowTransactions';
import Report from '../components/Admin/Report/Report';
import Diagram from '../components/Admin/Diagram/Diagram';
import CalculateProfit from '../components/Admin/CalculateProfit/CalculateProfit';
import {fetchAllHotels} from "../Redux/slices/hotelsSlice";
import {fetchRooms} from "../Redux/slices/roomsSlice";
import ShowRooms from "../components/Admin/ShowRooms/ShowRooms";
import AddRoom from "../components/Admin/AddRoom/AddRoom";
import EditRoom from "../components/Admin/EditRoom/EditRoom";
import DeleteRoom from "../components/Admin/DeleteRoom/DeleteRoom";
export const AdminContext = createContext();

export default function Admin() {
  const [selectedAction, setSelectedAction] = useState('show');
  const [orderId, setOrderId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getBooks();
    getAuthors();
    getPublishers();
    getOrders();
    getTransactions();

    getHotels();
    getRooms();
  }, [selectedAction]);

  const getBooks = async () => {
    dispatch(fetchAllBooks());
  };
  const getRooms = async () => {
    dispatch(fetchRooms());
  };
  const getAuthors = async () => {
    dispatch(fetchAuthors());
  };
  const getPublishers = async () => {
    dispatch(fetchPublishers());
  };
  const getTransactions = async () => {
    dispatch(fetchTransactions());
  };
  const getOrders = async () => {
    dispatch(fetchOrders());
  };
  const getHotels = async () => {
    dispatch(fetchAllHotels());
  };
    const { authors, authorsStatus } = useSelector((state) => state.authors);
  const { publishers, publishersStatus } = useSelector((state) => state.publishers);
  const { orders, ordersStatus } = useSelector((state) => state.orders);
  const { transactions, transactionsStatus } = useSelector((state) => state.transactions);

  const { hotels, hotelsStatus } = useSelector((state) => state.hotels);
  const { rooms, roomsStatus } = useSelector((state) => state.rooms);

  useEffect(() => {}, [selectedAction, hotels]);
  function selectActionHandler(event) {
    setSelectedAction(event.target.value);
  }

  return (
    <AdminContext.Provider
      value={{
        selectedAction,
        setSelectedAction,
        orders,
        rooms,
        roomsStatus,
        ordersStatus,
        orderId,
        setOrderId,
        hotels,
        hotelsStatus
      }}>
      {/*{authorsStatus === 'success' && publishersStatus === 'success' ? (*/}
        <div className="admin-container">
          <div>
            <select
              className="selectAdminAction"
              name="selectAction"
              id="selectAction"
              onChange={selectActionHandler}
              value={selectedAction}>
              <option value="show">Просмотреть отели</option>
              <option value="add">Добавить отель</option>
              <option value="edit">Править отель</option>
              <option value="delete">Удалить отель</option>
              <option value="showRoom">Просмотреть комнаты</option>
              <option value="addRoom">Добавить комнату</option>
              <option value="editRoom">Править комнату</option>
              <option value="deleteRoom">Удалить комнату</option>
              <option value="orders">Просмотреть заказы</option>
              <option value="calc">Рассчитать прибыль</option>
              <option value="report">Отчёт продаж</option>
              <option value="diagram">Диаграмма заказов</option>
            </select>
          </div>
          <div>
            {selectedAction === 'add' ? (
              <AddBlock />
            ) : selectedAction === 'edit' ? (
              <EditBlock />
            ) : selectedAction === 'delete' ? (
              <DeleteBlock />
            ) : selectedAction === 'orders' ? (
              <ShowOrders context={AdminContext} />
            ) : selectedAction === 'showRoom' ? (
              <ShowRooms context={AdminContext} />
            ) : selectedAction === 'addRoom' ? (
              <AddRoom context={AdminContext} />
            ): selectedAction === 'editRoom' ? (
              <EditRoom context={AdminContext} />
            ) : selectedAction === 'deleteRoom' ? (
              <DeleteRoom context={AdminContext} />
            ) : selectedAction === 'diagram' ? (
              <Diagram />
            ) : selectedAction === 'calc' ? (
              <CalculateProfit />
            ) : selectedAction === 'report' ? (
              <Report />
            ) : (
              <ShowBlock />
            )}
          </div>
        </div>
      {/*) : (*/}
      {/*  <div>Loading...</div>*/}
      {/*)}*/}
    </AdminContext.Provider>
  );
}
