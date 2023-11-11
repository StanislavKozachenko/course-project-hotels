import React, { useContext } from 'react';
import './ShowBlock.module.scss';
import ShowHotelItem from '../ShowHotelItem/ShowHotelItem';
import { AdminContext } from '../../../pages/Admin';
export default function ShowBlock() {
  const { hotels, hotelsStatus } = useContext(AdminContext);
  return (
    <div className="hotel-items-main">
      <table className="show" cellSpacing="12">
        <tbody>
          <tr className="list">
            <th>ID</th>
            <th>Название</th>
            <th>Адрес</th>
            <th>Категория</th>
            <th>URL картинки</th>
            <th>Рейтинг</th>
            <th>Количество комнат</th>
            <th>Описание</th>
            {/*<th>Автор</th>*/}
            {/*<th>Издательство</th>*/}
          </tr>
          {hotelsStatus === 'loading'
            ? 'Loading...'
            : hotels.map((obj) => <ShowHotelItem key={obj.id} {...obj} />)}
        </tbody>
      </table>
    </div>
  );
}
