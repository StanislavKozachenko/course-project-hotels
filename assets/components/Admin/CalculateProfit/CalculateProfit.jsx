import React from 'react';
import styles from './CaluclateProfit.module.scss';
import { AdminContext } from '../../../pages/Admin';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
export default function CalculateProfit() {
  const { orders, ordersStatus } = useContext(AdminContext);
  const [profit, setProfit] = useState(0);
  const calculateProfit = () => {
    let profitLocal = 0;
    if (ordersStatus === 'success') {
      orders.forEach((order) => {
        if (new Date(order.check_in_date).getMonth() === new Date().getMonth()) {
          profitLocal += parseFloat(order.total_cost);
        }
      });
      setProfit(profitLocal);
    }
  };
  useEffect(() => {
    calculateProfit();
  }, [profit]);
  return (
    <>
      <h3 className="profit-text">Прибыль за текущий месяц: {profit} $.</h3>
    </>
  );
}
