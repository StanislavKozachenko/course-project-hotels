import React, { useContext } from 'react';
import './DeleteBlock.module.scss';
import { AdminContext } from '../../../pages/Admin';
import DeleteBlockItem from '../DeleteBlockItem/DeleteBlockItem';
export default function DeleteBlock() {
  const { hotels, hotelsStatus } = useContext(AdminContext);
  return (
    <div className="main">
      <table className="show" cellSpacing="12">
        <tbody>
          <tr className="list">
            <th>#</th>
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
            : hotels.map((obj) => <DeleteBlockItem key={obj.id} {...obj} />)}
        </tbody>
      </table>
    </div>
  );
}
