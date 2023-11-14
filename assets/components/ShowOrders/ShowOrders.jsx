import React, { useContext } from 'react';
import './ShowOrders.module.scss';
import ShowOrdersItem from '../ShowOrdersItem/ShowOrdersItem';
import { UserContext } from '../../pages/User';
import PurchaseBlock from '../PurchaseBlock/PurchaseBlock';
export default function ShowOrders({ context }) {
  const { orders, ordersStatus, orderId, setOrderId } = useContext(context);
  return (
    <>
      {orderId === 0 ? (
        <div className="main width-100">
          <table className="show" cellSpacing="12">
            <tbody>
              <tr className="list">
                <th>Id</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Дата заезда</th>
                <th>Дата выезда</th>
                <th>Отель</th>
                <th>Номер комнаты</th>
                {context === UserContext ? '' : <th>Id пользователя</th>}
              </tr>
              {ordersStatus === 'loading'
                ? 'Loading...'
                : orders.map((obj) => (
                    <ShowOrdersItem
                      setOrderId={setOrderId}
                      context={context}
                      key={obj.id}
                      {...obj}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      ) : (
        <PurchaseBlock
          setOrderId={setOrderId}
          order={orders.filter((order) => order.id === orderId)[0]}
        />
      )}
    </>
  );
}
