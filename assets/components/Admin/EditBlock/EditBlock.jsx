import React, { useContext } from 'react';
import './EditBlock.module.scss';
import { AdminContext } from '../../../pages/Admin';
import EditBlockItem from '../EditBlockItem/EditBlockItem';
export default function EditBlock() {
  const { hotels, hotelsStatus } = useContext(AdminContext);
  return (
    <>
      <div className="main">
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
            </tr>
            {hotelsStatus === 'loading'
              ? 'Loading...'
              : hotels.map((obj) => <EditBlockItem key={obj.id} {...obj} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
