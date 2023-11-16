import React from 'react';
import './Diagram.module.scss';
import { PieChart } from 'react-minimal-pie-chart';
import { useContext } from 'react';
import { AdminContext } from '../../../pages/Admin';
export default function Diagram() {
  const { orders, ordersStatus } = useContext(AdminContext);
  let buyed = 0;
  let waited = 0;
  orders.forEach((order) => {
    order.status === 'success' ? (buyed += 1) : (waited += 1);
  });
  return (
    <div className="main diagram-main">
      <h3 className="header diagram-header">Процент оплаченных заказов</h3>
      <div className="diagram-main-item">
        <PieChart
          data={[
            { title: `Оплачено: ${buyed}`, value: buyed, color: '#E38627' },
            { title: `Не оплачено: ${waited}`, value: waited, color: '#C13C37' },
          ]}
          animation
          animationDuration={500}
          animationEasing="ease-out"
          center={[50, 50]}
          viewBoxSize={[100, 100]}
          label={(data) => {return data.dataEntry.title}}
          labelPosition={50}
          lengthAngle={360}
          lineWidth={15}
          paddingAngle={0}
          radius={50}
          rounded
          startAngle={0}
          labelStyle={{
            fontSize: '8px',
            fontWeight: '400',
          }}
        />
      </div>
    </div>
  );
}
