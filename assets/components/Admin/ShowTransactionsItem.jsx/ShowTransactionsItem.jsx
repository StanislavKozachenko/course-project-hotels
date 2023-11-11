import React from 'react';
import './ShowTransactionsItem.module.scss';
export default function ShowTransactionsItem({ id, orderId, createdAt, userId }) {
  createdAt = createdAt.split('T')[0];
  return (
    <>
      <tr className="transaction">
        <td>
          <input className="input" name="value" value={id}></input>
        </td>
        <td>
          <input className="input" name="value" value={orderId}></input>
        </td>
        <td>
          <input className="input" name="value" value={createdAt}></input>
        </td>
        <td>
          <input className="input" name="value" value={userId}></input>
        </td>
      </tr>
    </>
  );
}
